import { URLSearchParams } from 'core-js/modules/web.url-search-params';
import _ from 'lodash';
import {
  makeRequest, makeSecuredRequest, makeSecuredPutRequest, makeSecuredPostRequest, makeSecuredDeleteRequest,
} from './connection';

export async function fetchTowers() {
  return makeRequest('/api/towers');
}

export async function fetchProfile() {
  return makeSecuredRequest('/api/profile');
}

export async function fetchTower(towerId) {
  const towers = await fetchTowers();
  return _.find(towers, ['id', towerId]);
}

export async function updateProfile(changes) {
  return makeSecuredPutRequest('/api/profile', changes);
}

export async function updateRun(id, data) {
  return makeSecuredPutRequest(`/api/runs/${id}`, data);
}

export async function deleteRun(id) {
  return makeSecuredDeleteRequest(`/api/runs/${id}`);
}

export async function postRun(data) {
  return makeSecuredPostRequest('/api/runs/', data);
}

export async function fetchRun(id) {
  return makeRequest(`/api/runs/${id}`);
}

export async function fetchGlobalRecords() {
  return makeRequest('/api/records');
}

export async function fetchPlayerRecords(id) {
  return makeRequest(`/api/records/player/${id}`);
}

export async function fetchMostRecentRuns(options = {}) {
  return makeRequest(`/api/runs/latest?${new URLSearchParams(options)}`);
}

export async function fetchMetaRecords(sunstones) {
  return makeRequest(`/api/records/sunstones/${sunstones}`);
}

export async function fetchPlayers() {
  return makeRequest('/api/players');
}

export async function fetchTowerRuns(id) {
  return makeRequest(`/api/runs/tower/${id}`);
}
