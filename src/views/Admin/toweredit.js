import _ from 'lodash';
import {
  forceFetchTower, updateTower, newTower, deleteTower,
} from '../../scripts/api';

export default {
  name: 'TowerEdit',
  data: () => ({
    towerId: '',
    isUpdating: false,
    hasLoaded: false,
    deleteConfirm: false,
    fullName: '',
    slot: 0,
    chapter: 0,
    ingameId: null,
    hasMysticGate: false,
    hasLastInflator: false,
    hasNoImpure: false,
    thresholds: {
      bronze: null,
      silver: null,
      gold: null,
      platinum: null,
      diamond: null,
      moon: null,
      sun: null,
      overscore: 0,
    },
    clears: {
      1: {
        difficulty: 0,
        volume: 0,
      },
      2: {
        difficulty: 0,
        volume: 0,
      },
      3: {
        difficulty: 0,
        volume: 0,
      },
    },
  }),
  props: ['id'],
  methods: {
    async submit() {
      this.isUpdating = true;
      try {
        const updates = this.buildSubmitObject();
        console.log(updates);
        let response;
        if (this.isEdit) {
          response = await updateTower(this.id, updates);
        } else {
          response = await newTower(this.id, updates);
        }
        const newTowerId = response?.id;

        this.$store.dispatch('fetchTowers', true);
        if (newTowerId != null) this.$router.push({ path: `/tower/${newTowerId}` });
      } finally {
        this.isUpdating = false;
      }
    },
    async deleteTower() {
      if (!this.deleteConfirm) return;
      this.isUpdating = true;
      await deleteTower(this.id);
      this.$store.dispatch('fetchTowers', true);
      this.$router.push({ path: '/admin/towers' });
    },
    buildSubmitObject() {
      return {
        id: this.towerId,
        fullName: this.fullName,
        slot: this.slot,
        chapter: this.chapter,
        ingameId: this.ingameId,
        hasMysticGate: this.hasMysticGate,
        hasNoImpure: this.hasNoImpure,
        hasLastInflator: this.hasLastInflator,
        thresholds: _.pickBy(this.thresholds, (value) => value),
        clears: _.filter(_.map(this.clears, (value, key) => ({ level: parseInt(key, 10), volume: value.volume, difficulty: value.difficulty })), (value) => (value.volume && value.difficulty)),
      };
    },
  },
  async created() {
    if (!this.isEdit) {
      this.hasLoaded = true;
      return;
    }
    const towerData = await forceFetchTower(this.id);
    if (!towerData) { this.$router.push({ path: '/admin/towers' }); return; }
    /* Also probably better solution available */
    this.towerId = towerData.id;
    this.fullName = towerData.fullName;
    this.slot = towerData.slot;
    this.chapter = towerData.chapter;
    this.ingameId = towerData.ingameId;
    this.hasMysticGate = towerData.hasMysticGate;
    this.hasLastInflator = towerData.hasLastInflator;
    this.hasNoImpure = towerData.hasNoImpure;
    this.thresholds = towerData.thresholds;

    _.each(towerData.clears, (value) => {
      if (value.level) {
        this.clears[value.level].difficulty = value.difficulty;
        this.clears[value.level].volume = value.volume;
      }
    });

    // populated initial data
    this.hasLoaded = true;
  },
  computed: {
    tower() {
      return this.$store.state.towers?.[this.towerId];
    },
    buttonText() {
      return this.isEdit ? 'Update Tower' : 'Add new Tower';
    },
    isEdit() {
      return this.id != null;
    },
    canSubmit() {
      return this.slot && this.towerId && this.fullName && this.thresholds.overscore && !this.isUpdating;
    },
  },
};
