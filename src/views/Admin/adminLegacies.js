import _ from 'lodash';
import {
  updateLegacies,
} from '../../scripts/api';

export default {
  name: 'AdminLegaciesView',
  data: () => ({
    legacies: {},
    newCount: 0,
    modifications: {},
    isUpdating: false,
  }),
  async created() {
    this.legacies = _.cloneDeep(this.$store.state?.legacies);
  },
  computed: {
    validChanges() {
      return !this.isUpdating && Object.keys(this.modifications).length > 0;
    },
  },
  methods: {
    async addLegacy() {
      const newId = `newLegacyItem${this.newCount}`;
      this.newCount += 1;
      this.legacies[newId] = {
        id: newId,
        fullName: '',
        slot: 0,
        costFlat: 0,
        costPercent: 0,
        max: 1,
        new: true,
      };
    },
    async processModifications(modifications) {
      if (modifications.modified) {
        this.modifications[modifications.origId] = modifications;
      } else {
        delete this.modifications[modifications.origId];
      }
    },
    async submit() {
      this.isUpdating = true;
      try {
        const updates = this.modifications;
        await updateLegacies(this.id, updates);
        this.$store.dispatch('fetchLegacies', true);
        this.$router.go(this.$router.currentRoute);
      } finally {
        this.isUpdating = false;
      }
    },
  },
};
