<template>
  <div class="center">
    <tn-icon icon="mysticgate" size="small" v-if="runData?.mysticGate"/>
    <template v-if="showScore">{{`${this.runData?.score || 0}`.toLocaleString()}}</template>
    <tn-icon :icon="medal.toLowerCase()" size="small"/>
    <tn-icon icon="sunstone" size="small"/>{{sunstones}}
    <template v-if="showStonesUsed"><tn-icon icon="sunwisher" size="small"/>{{stonesused}}</template>
  </div>
</template>

<script>
import { calcRewards } from '../scripts/tower';

export default {
  name: 'Score',
  props: ['runData', 'towerData', 'hideScore', 'pure', 'hideStonesUsed'],
  computed: {
    rewards() {
      return calcRewards(this.runData?.score || 0, this.towerData, this.calcPure);
    },
    medal() {
      return this.rewards.medal || 'NONE';
    },
    sunstones() {
      return this.rewards.sunstones;
    },
    stonesused() {
      return this.runData?.resourceUse?.sunstones;
    },
    showScore() {
      return this.runData?.score && !this.hideScore;
    },
    calcPure() {
      return this.pure != null ? this.pure : this.runData?.pure || false;
    },
    showStonesUsed() {
      return this.stonesused != null && !this.hideStonesUsed;
    },
  },
};
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
