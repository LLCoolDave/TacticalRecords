import _ from 'lodash';
import { fetchGlobalRecords } from '../scripts/api';
import { calcRewards } from '../scripts/tower';

export default {
  name: 'RecordsView',
  data: () => ({
    hasLoaded: false,
    pureRecords: null,
    impureRecords: null,
  }),
  async created() {
    const globalRecords = await fetchGlobalRecords();
    this.pureRecords = globalRecords.pure.reduce((obj, item) => {
      // eslint-disable-next-line no-param-reassign
      obj[item.towerId] = item;
      return obj;
    }, {});
    this.impureRecords = globalRecords.impure.reduce((obj, item) => {
      // eslint-disable-next-line no-param-reassign
      obj[item.towerId] = item;
      return obj;
    }, {});
    this.hasLoaded = true;
  },
  computed: {
    towers() {
      return _.map(this.$store.state.towerOrder, (id) => this.$store.state.towers?.[id]);
    },
    stoneTotals() {
      return {
        pure: _.reduce(this.pureRecords, (a, b) => a + b.sunstones, 0),
        impure: _.reduce(this.impureRecords, (a, b) => {
          const rewards = calcRewards(b.score || 0, this.$store.state.towers[b.towerId], false);
          return a + rewards.sunstones;
        }, 0),
      };
    },
  },
};
