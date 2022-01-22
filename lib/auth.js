import _ from 'lodash';

const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const domain = process.env.VUE_APP_AUTH0_DOMAIN;
const audience = process.env.VUE_APP_AUTH0_AUDIENCE;

const jwksClient = new jwksRsa.JwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${domain}/.well-known/jwks.json`,
});

const options = {
  audience,
  issuer: `https://${domain}/`,
  algorithms: ['RS256'],
};

async function tokenChecker(req) {
  let token;

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      } else {
        throw new Error('credentials_bad_scheme', { message: 'Format is Authorization: Bearer [token]' });
      }
    } else {
      throw new Error('credentials_bad_format', { message: 'Format is Authorization: Bearer [token]' });
    }
  }

  if (!token) {
    throw new Error('credentials_required', { message: 'No authorization token was found' });
  }

  let dtoken;

  try {
    dtoken = jwt.decode(token, { complete: true }) || {};
  } catch (err) {
    throw new Error('invalid_token', err);
  }

  const rawKey = await jwksClient.getSigningKey(dtoken.header.kid);
  const key = rawKey.publicKey || rawKey.rsaPublicKey;
  const decoded = jwt.verify(token, key, options);
  _.set(req, 'user', decoded);
}

async function checkJwt(req) {
  try {
    await tokenChecker(req);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  checkJwt,
};
