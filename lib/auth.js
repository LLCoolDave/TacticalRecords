import _ from 'lodash';
import fetch from 'node-fetch';
import prisma from './prisma';

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

export async function checkJwt(req) {
  try {
    await tokenChecker(req);
    return true;
  } catch (err) {
    return false;
  }
}

export function getAuthMethod(user) {
  const prefix = _.split(user.sub, '|')[0];
  switch (prefix) {
    case 'auth0':
      return 'authPassword';
    case 'google-oauth2':
      return 'authGoogle';
    case 'oauth2':
      return 'authDiscord';
    default:
      return null;
  }
}

export async function getUser(user) {
  const authMethod = getAuthMethod(user);
  if (!authMethod) return null;
  try {
    const match = await prisma.user.findUnique({
      where: {
        [authMethod]: user.sub,
      },
    });
    if (match) return match;
  } catch (e) {
    console.error('Request error', e);
  }
  return null;
}

export async function getUserId(user) {
  const userData = await getUser(user);
  return userData?.id;
}

function objectToQueryString(url, obj) {
  const res = new URL(url);
  _.each(obj, (val, key) => {
    res.searchParams.append(key, val);
  });
  return res;
}

async function makeRequest(endpoint, accessToken, queryOptions = {}) {
  const optionsToUse = _.defaultsDeep({}, queryOptions, { headers: { accept: 'application/json', Authorization: `Bearer ${accessToken}` } });
  const response = await fetch(optionsToUse.query ? objectToQueryString(endpoint, optionsToUse.query) : endpoint, optionsToUse);
  if (response.status === 200) {
    return JSON.parse(await response.text());
  }
  throw new Error(`Call to ${endpoint} returned with status ${response.status}${response.body ? `: ${response.body}` : ''}`);
}

export async function getGuaranteedUserId(req) {
  const { user } = req;
  const authMethod = getAuthMethod(user);
  if (!authMethod) throw Error(`unsupported user token id ${user.sub}`);
  const userId = await getUserId(user);
  if (userId !== null) return userId;

  /* No existing user for this authorization method, create a new entry */
  /* First fetch some user info from the token to create the new entry */
  const accessToken = req.headers.authorization.split(' ')[1];
  const userInfo = await makeRequest(user.aud[1], accessToken);

  const newUser = await prisma.user.create({
    data: {
      [authMethod]: user.sub,
      player: {
        create: {
          name: userInfo.name || user.sub,
          pfp: userInfo?.picture,
        },
      },
    },
  });

  return newUser.id;
}

export async function mayEdit(user, userId) {
  const userData = await getUser(user);
  return (userData.id === userId || userData.role === 'ADMIN');
}
