import _ from 'lodash';
import { fetchTowers } from '../scripts/api';

export default {
  name: 'TowersView',
  data: () => ({
    // this should probably be vuex
    towers: {},
  }),
  created() {
    const allTowers = fetchTowers();
    _.each(allTowers, (val) => {
      this.towers[val.id] = val;
    });
  },
};
