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
    processingImage: false,
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
        medal: rewards.medal ? rewards.medal.toUpperCase() : 'NONE',
        resourceUse: this.resourcesUsed,
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
      this.resourcesUsed.sunstones = parsedData.stonesused;
      this.resourcesUsed.bronze = parsedData.medals?.bronze || 0;
      this.resourcesUsed.silver = parsedData.medals?.silver || 0;
      this.resourcesUsed.gold = parsedData.medals?.gold || 0;
      this.resourcesUsed.platinum = parsedData.medals?.platinum || 0;
      this.resourcesUsed.diamond = parsedData.medals?.diamond || 0;
      this.resourcesUsed.moon = parsedData.medals?.moon || 0;
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
    loggedInPlayer() {
      return this.$store.state.userProfile;
    },
    towerHasMysticGate() {
      return this.tower?.hasMysticGate;
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
  },
  watch: {
    towerHasMysticGate(newValue) {
      if (!newValue) this.mysticGate = false;
    },
    loggedInPlayer(newValue) {
      if (!this.isEdit) {
        this.player = newValue?.player;
        if (this.player) this.player.id = newValue?.id;
      }
    },
  },
};
