import _ from 'lodash';
import { fetchMostRecentRuns } from '../scripts/api';

export default {
  name: 'MostRecentView',
  data: () => ({
    hasLoaded: false,
    latest: [],
  }),
  async created() {
    this.latest = await fetchMostRecentRuns({ count: 25 });
    this.hasLoaded = true;
  },
  methods: {
    towerById(id) {
      return this.$store.state.towers?.[id];
    },
    formatDate(time) {
      const date = new Date(time);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });
    },
  },
  computed: {
    towers() {
      return _.map(this.$store.state.towerOrder, (id) => this.$store.state.towers?.[id]);
    },
  },
};
