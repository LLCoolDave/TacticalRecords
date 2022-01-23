import _ from 'lodash';

export default {
  name: 'TowersView',
  computed: {
    towers() {
      return _.map(this.$store.state.towerOrder, (id) => this.$store.state.towers?.[id]);
    },
  },
};
