import _ from 'lodash';
import {
  updateRun, postRun, fetchRun, deleteRun,
} from '../scripts/api';
import { calcRewards, calcClear } from '../scripts/tower';
import { uploadScreenshot, parseScreenshot } from '../scripts/processScreenshot';

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
      maxHp: 0,
      legacyStones: 0,
      sunstones: 0,
      bronze: 0,
      silver: 0,
      gold: 0,
      platinum: 0,
      diamond: 0,
      moon: 0,
      sun: 0,
      legacies: {},
    },
    mysticGate: false,
    lastInflator: false,
    hp: 0,
    atk: 0,
    def: 0,
    lvl: 1,
    hpMulti: 100,
    expMulti: 100,
    comment: '',
    screenshot: '',
    processingImage: false,
    legacyRun: false,
  }),
  props: ['id'],
  methods: {
    async submit() {
      this.isUpdating = true;
      try {
        const updates = this.buildSubmitObject();
        let response;
        if (this.isEdit) {
          response = await updateRun(this.id, updates);
        } else {
          response = await postRun(updates);
        }
        const newRunId = response?.id;
        if (response?.player) this.$store.commit('setPlayerInfo', response.player);

        if (newRunId != null) this.$router.push({ path: `/run/${newRunId}` });
      } finally {
        this.isUpdating = false;
      }
    },
    async deleteCurrentRun() {
      if (!this.deleteConfirm) return;
      this.isUpdating = true;
      const response = await deleteRun(this.id);
      if (response?.player) this.$store.commit('setPlayerInfo', response.player);
      this.$router.push({ path: '/' });
    },
    calcSunstonesUsed() {
      const totalStones = Number(this.resourcesUsed.atk) + Number(this.resourcesUsed.def) + Number(this.resourcesUsed.hp) + Number(this.resourcesUsed.maxHp) + Number(this.resourcesUsed.legacyStones);
      if (totalStones > this.resourcesUsed.sunstones) this.resourcesUsed.sunstones = totalStones;
    },
    buildSubmitObject() {
      const rewards = calcRewards(this.score, this.tower, this.isPure);
      const resourceUse = _.cloneDeep(this.resourcesUsed);
      resourceUse.legacies = JSON.stringify(resourceUse.legacies);
      return {
        playerId: this.player.id,
        towerId: this.towerId,
        comment: this.comment,
        screenshot: this.screenshot || null,
        score: this.score,
        pure: this.isPure,
        impure: this.isImpure,
        mysticGate: this.mysticGate || this.towerHasNoImpure,
        lastInflator: this.lastInflator,
        hp: this.hp,
        atk: this.atk,
        def: this.def,
        level: this.lvl,
        hpMulti: this.hpMulti,
        expMulti: this.expMulti,
        sunstones: rewards.sunstones,
        medal: rewards.medal ? rewards.medal.toUpperCase() : 'NONE',
        resourceUse,
        isLegacy: this.legacyRun,
      };
    },
    async uploadScreenshot(e) {
      this.processingImage = true;
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      await this.processFile(file);
      this.processingImage = false;
    },
    async pasteScreenshot(e) {
      this.processingImage = true;
      e.preventDefault();
      if (e.clipboardData.types.includes('text/plain')) {
        this.screenshot = e.clipboardData.getData('text/plain');
      } else {
        let screenshot;
        _.each(e.clipboardData.items, (item) => {
          if (item.type.indexOf('image') !== -1) {
            screenshot = item.getAsFile();
          }
        });
        if (screenshot) await this.processFile(screenshot);
      }
      this.processingImage = false;
    },
    async processFile(file) {
      let imgurl = uploadScreenshot(file);
      let parsedData = await parseScreenshot(file);
      [imgurl, parsedData] = await Promise.all([imgurl, parsedData]);
      if (imgurl) this.screenshot = imgurl;
      this.hp = parsedData.hp;
      this.score = parsedData.score;
      this.mysticGate = parsedData.mysticgate;
      this.atk = parsedData.atk;
      this.def = parsedData.def;
      this.lvl = parsedData.lvl;
      this.hpMulti = parsedData.hpMulti;
      this.expMulti = parsedData.expMulti;
      this.resourcesUsed.legacyStones = parsedData?.legacies || 0;
      this.resourcesUsed.sunstones = parsedData.stonesused + this.resourcesUsed.legacyStones;
      this.resourcesUsed.bronze = parsedData.medals?.bronze || 0;
      this.resourcesUsed.silver = parsedData.medals?.silver || 0;
      this.resourcesUsed.gold = parsedData.medals?.gold || 0;
      this.resourcesUsed.platinum = parsedData.medals?.platinum || 0;
      this.resourcesUsed.diamond = parsedData.medals?.diamond || 0;
      this.resourcesUsed.moon = parsedData.medals?.moon || 0;
      this.resourcesUsed.sun = parsedData.medals?.sun || 0;
    },
    async updateLegacyUseCount(newCount) {
      this.resourcesUsed.legacies[newCount.id] = newCount.count;
    },
  },
  async created() {
    if (!this.isEdit) {
      this.hasLoaded = true;
      this.player = this.$store.state.userProfile?.player;
      if (this.player) this.player.id = this.$store.state.userProfile?.id;
      return;
    }
    const runData = await fetchRun(this.id);
    if (!runData) { this.$router.push({ path: '/' }); return; }
    /* Also probably better solution available */
    runData.resourceUse.legacies = JSON.parse(runData.resourceUse.legacies);
    this.towerId = runData.towerId;
    this.player = runData.player;
    this.score = runData.score;
    this.mysticGate = runData.mysticGate;
    this.lastInflator = runData.lastInflator;
    this.hp = runData.hp;
    this.atk = runData.atk;
    this.def = runData.def;
    this.hpMulti = runData.hpMulti;
    this.expMulti = runData.expMulti;
    this.lvl = runData.level;
    this.comment = runData.comment;
    this.screenshot = runData.screenshot;
    this.legacyRun = runData.isLegacy;

    this.resourcesUsed.atk = runData.resourceUse.atk || 0;
    this.resourcesUsed.def = runData.resourceUse.def || 0;
    this.resourcesUsed.hp = runData.resourceUse.hp || 0;
    this.resourcesUsed.sunstones = runData.resourceUse.sunstones || 0;
    this.resourcesUsed.legacyStones = runData.resourceUse.legacyStones || 0;
    this.resourcesUsed.bronze = runData.resourceUse.bronze || 0;
    this.resourcesUsed.silver = runData.resourceUse.silver || 0;
    this.resourcesUsed.gold = runData.resourceUse.gold || 0;
    this.resourcesUsed.platinum = runData.resourceUse.platinum || 0;
    this.resourcesUsed.diamond = runData.resourceUse.diamond || 0;
    this.resourcesUsed.moon = runData.resourceUse.moon || 0;
    this.resourcesUsed.sun = runData.resourceUse.sun || 0;
    this.resourcesUsed.legacies = runData.resourceUse.legacies || {};

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
      return this.mysticGate || this.towerHasNoImpure || ((this.resourcesUsed.bronze + this.resourcesUsed.silver + this.resourcesUsed.gold + this.resourcesUsed.platinum + this.resourcesUsed.diamond + this.resourcesUsed.moon + this.resourcesUsed.sun === 0) && !this.lastInflator);
    },
    isImpure() {
      return this.lastInflator || (!this.mysticGate && !this.towerHasNoImpure);
    },
    towerOrder() {
      return this.$store.state.towerOrder;
    },
    isEdit() {
      return this.id != null;
    },
    loggedInPlayer() {
      return this.$store.state.userProfile;
    },
    towerHasMysticGate() {
      return this.tower?.hasMysticGate;
    },
    towerHasLastInflator() {
      return this.tower?.hasLastInflator;
    },
    towerHasNoImpure() {
      return this.tower?.hasNoImpure;
    },
    canSubmit() {
      return this.towerId && this.player && this.score > 0 && !this.isUpdating;
    },
    rewards() {
      return this.tower ? calcRewards(this.score || 0, this.tower, this.isPure) : null;
    },
    showUpload() {
      return !this.screenshot && !this.processingImage;
    },
    clear() {
      return calcClear({
        score: this.score,
        hp: this.hp,
        atk: this.atk,
        def: this.def,
        level: this.lvl,
      });
    },
    scoreHighlight() {
      return this.clear ? {} : { background: 'orange' };
    },
    usedLegacies() {
      return _.map(this.$store.state?.legacies, (el) => ({ id: el.id, count: this.resourcesUsed.legacies?.[el.id] || 0 }));
    },
  },
  watch: {
    towerHasMysticGate(newValue) {
      if (!newValue) this.mysticGate = false;
    },
    towerHasLastInflator(newValue) {
      if (!newValue) this.lastInflator = false;
    },
    loggedInPlayer(newValue) {
      if (!this.isEdit) {
        this.player = newValue?.player;
        if (this.player) this.player.id = newValue?.id;
      }
    },
  },
};
