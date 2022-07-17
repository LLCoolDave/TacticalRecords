import { createStore } from 'vuex';
import { fetchProfile, fetchTowers, forceFetchTowers } from '../scripts/api';
import { getInstance } from '../scripts/auth0';

export default createStore({
  state: {
    userProfile: null,
    towers: {},
    towerOrder: [],
  },
  mutations: {
    setProfile(state, newProfile) {
      state.userProfile = newProfile;
    },
    setPlayerInfo(state, newPlayerInfo) {
      if (state.userProfile) state.userProfile.player = newPlayerInfo;
    },
    setTowers(state, towers) {
      state.towers = towers;
    },
    setTowerOrder(state, order) {
      state.towerOrder = order;
    },
  },
  actions: {
    async loadProfile(context) {
      const authInst = getInstance();
      if (!authInst.state.isAuthenticated) return;
      const userProfile = await fetchProfile();
      context.commit('setProfile', userProfile);
    },
    async fetchTowers(context, force = false) {
      let towers;
      if (force) {
        towers = await forceFetchTowers();
      } else {
        towers = await fetchTowers();
      }
      const towerLookup = towers.reduce((obj, item) => {
        // eslint-disable-next-line no-param-reassign
        obj[item.id] = item;
        return obj;
      }, {});
      context.commit('setTowers', towerLookup);
      const towerOrder = towers.map((obj) => obj.id);
      context.commit('setTowerOrder', towerOrder);
    },
  },
  getters: {
    isAdmin(state) {
      return state.userProfile && state.userProfile.role === 'ADMIN';
    },
  },
  modules: {
  },
});
