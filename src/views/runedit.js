import {
  updateRun, postRun, fetchRun, deleteRun,
} from '../scripts/api';
import { calcRewards } from '../scripts/tower';

export default {
  name: 'RunEdit',
  data: () => ({
    isUpdating: false,
    hasLoaded: false,
    deleteConfirm: false,
    towerId: null,
    player: {},
    score: 0,
    resourcesUsed: {
      atk: 0,
      def: 0,
      hp: 0,
      sunstones: 0,
      bronze: 0,
      silver: 0,
      gold: 0,
      platinum: 0,
      diamond: 0,
      moon: 0,
    },
    mysticGate: false,
    hp: 0,
    atk: 0,
    def: 0,
    lvl: 1,
    hpMulti: 100,
    expMulti: 100,
    comment: '',
    screenshot: '',
  }),
  props: ['id'],
  methods: {
    async submit() {
      this.isUpdating = true;
      const updates = this.buildSubmitObject();
      let response;
      if (this.isEdit) {
        response = await updateRun(this.id, updates);
      } else {
        response = await postRun(updates);
      }
      const newRunId = response?.id;
      if (response?.player) this.$store.commit('setPlayerInfo', response.player);
      this.isUpdating = false;
      if (newRunId != null) this.$router.push({ path: `/run/${newRunId}` });
    },
    async deleteCurrentRun() {
      if (!this.deleteConfirm) return;
      this.isUpdating = true;
      const response = await deleteRun(this.id);
      if (response?.player) this.$store.commit('setPlayerInfo', response.player);
      this.$router.push({ path: '/' });
    },
    calcSunstonesUsed() {
      const totalStones = this.resourcesUsed.atk + this.resourcesUsed.def + this.resourcesUsed.hp;
      if (totalStones > this.resourcesUsed.sunstones) this.resourcesUsed.sunstones = totalStones;
    },
    buildSubmitObject() {
      const rewards = calcRewards(this.score, this.tower, this.isPure);
      return {
        playerId: this.player.id,
        towerId: this.towerId,
        comment: this.comment,
        screenshot: this.screenshot || null,
        score: this.score,
        pure: this.isPure,
        impure: this.isImpure,
        mysticGate: this.mysticGate,
        lastInflator: false,
        hp: this.hp,
        atk: this.atk,
        def: this.def,
        level: this.lvl,
        hpMulti: this.hpMulti,
        expMulti: this.expMulti,
        sunstones: rewards.sunstones,
        medal: rewards.medal.toUpperCase(),
        resourceUse: this.resourcesUsed,
      };
    },
  },
  async created() {
    if (!this.isEdit) {
      this.hasLoaded = true;
      this.player = this.$store.state.userProfile?.player;
      this.player.id = this.$store.state.userProfile?.id;
      return;
    }
    const runData = await fetchRun(this.id);
    if (!runData) { this.$router.push({ path: '/' }); return; }
    /* Also probably better solution available */
    this.towerId = runData.towerId;
    this.player = runData.player;
    this.score = runData.score;
    this.mysticGate = runData.mysticGate;
    this.hp = runData.hp;
    this.atk = runData.atk;
    this.def = runData.def;
    this.hpMulti = runData.hpMulti;
    this.expMulti = runData.expMulti;
    this.lvl = runData.level;
    this.comment = runData.comment;
    this.screenshot = runData.screenshot;

    this.resourcesUsed.atk = runData.resourceUse.atk;
    this.resourcesUsed.def = runData.resourceUse.def;
    this.resourcesUsed.hp = runData.resourceUse.hp;
    this.resourcesUsed.sunstones = runData.resourceUse.sunstones;
    this.resourcesUsed.bronze = runData.resourceUse.bronze;
    this.resourcesUsed.silver = runData.resourceUse.silver;
    this.resourcesUsed.gold = runData.resourceUse.gold;
    this.resourcesUsed.platinum = runData.resourceUse.platinum;
    this.resourcesUsed.diamond = runData.resourceUse.diamond;
    this.resourcesUsed.moon = runData.resourceUse.moon;

    // populated initial data
    this.hasLoaded = true;
  },
  computed: {
    tower() {
      return this.$store.state.towers?.[this.towerId];
    },
    buttonText() {
      return this.isEdit ? 'Update Run' : 'Submit new Run';
    },
    isPure() {
      // There's probably a neater way
      return this.mysticGate || (this.resourcesUsed.bronze + this.resourcesUsed.silver + this.resourcesUsed.gold + this.resourcesUsed.platinum + this.resourcesUsed.diamond + this.resourcesUsed.moon === 0);
    },
    isImpure() {
      return !this.mysticGate;
    },
    towerOrder() {
      return this.$store.state.towerOrder;
    },
    isEdit() {
      return this.id != null;
    },
    towerHasMysticGate() {
      return this.tower?.hasMysticGate;
    },
    canSubmit() {
      return this.towerId && this.player && this.score > 0 && !this.isUpdating;
    },
  },
  watch: {
    towerHasMysticGate(newValue) {
      if (!newValue) this.mysticGate = false;
    },
  },
};
