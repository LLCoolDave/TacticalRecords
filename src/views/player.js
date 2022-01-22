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
    this.towers = await fetchTowers();
    this.name = this.id; // TODO player metadata
    _.each(this.towers, (val) => {
      this.records[val.id] = fetchRecord(this.id, val.id);
    });
  },
};
