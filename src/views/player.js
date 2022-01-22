import _ from 'lodash';
import { fetchTowers, fetchRecord } from '../scripts/api';

export default {
  name: 'PlayerView',
  data: () => ({
    towers: {},
    name: '',
    records: {},
  }),
  props: ['id'],
  async created() {
    this.towers = fetchTowers();
    this.name = this.id; // TODO player metadata
    _.each(this.towers, (val, key) => {
      this.records[key] = fetchRecord(this.id, key);
    });
  },
};
