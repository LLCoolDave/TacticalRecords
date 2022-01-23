import _ from 'lodash';
import { fetchPlayerRecords } from '../scripts/api';

export default {
  name: 'PlayerView',
  data: () => ({
    hasLoaded: false,
    player: null,
    pureRecords: null,
    impureRecords: null,
  }),
  props: ['id'],
  async created() {
    const playerRecords = await fetchPlayerRecords(this.id);
    this.player = playerRecords.player;
    this.pureRecords = playerRecords.pure.reduce((obj, item) => {
      // eslint-disable-next-line no-param-reassign
      obj[item.towerId] = item;
      return obj;
    }, {});
    this.impureRecords = playerRecords.impure.reduce((obj, item) => {
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
  },
};
