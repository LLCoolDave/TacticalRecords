import _ from 'lodash';
import { getInstance } from './auth0';

export function objectToQueryString(url, obj) {
  const res = new URL(url);
  _.each(obj, (val, key) => {
    res.searchParams.append(key, val);
  });
  return res;
}

export async function makeRequest(endpoint, options) {
  const optionsToUse = _.defaultsDeep({}, options, { headers: { accept: 'application/json' } });
  const response = await fetch(optionsToUse.query ? objectToQueryString(endpoint, optionsToUse.query) : endpoint, optionsToUse);
  if (response.status === 200) {
    return JSON.parse(await response.text());
  }
  throw new Error(`Call to ${endpoint} returned with status ${response.status}${response.body ? `: ${response.body}` : ''}`);
}

export async function makeSecuredRequest(endpoint, options) {
  const accessToken = await getInstance().getTokenSilently();

  const opts = _.merge({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }, options);
  return makeRequest(endpoint, opts);
}

export async function makeSecuredPostRequest(endpoint, payload, options) {
  const opts = _.merge({
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }, options);
  return makeSecuredRequest(endpoint, opts);
}

export async function makeSecuredDeleteRequest(endpoint, payload, options) {
  const opts = _.merge({
    method: 'DELETE',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }, options);
  return makeSecuredRequest(endpoint, opts);
}

export async function makeSecuredPutRequest(endpoint, payload, options) {
  const opts = _.merge({
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }, options);
  return makeSecuredRequest(endpoint, opts);
}
