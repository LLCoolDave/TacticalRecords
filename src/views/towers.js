import _ from 'lodash';
import { fetchTowers } from '../scripts/api';

export default {
  name: 'TowersView',
  data: () => ({
    // this should probably be vuex
    towers: {},
  }),
  async created() {
    const allTowers = await fetchTowers();
    _.each(allTowers, (val) => {
      this.towers[val.id] = val;
    });
  },
};
