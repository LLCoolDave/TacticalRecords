<template>
  <div class="score">
    <i v-if="!hideScore">{{score.toLocaleString()}}</i><medal-icon :medal="medal"/> <img src="../assets/sunstone.png">{{sunstones}}
  </div>
</template>

<script>
import { calcRewards } from '../scripts/tower';

export default {
  name: 'Score',
  props: ['score', 'towerData', 'pure', 'hideScore'],
  computed: {
    rewards() {
      return calcRewards(this.score, this.towerData, this.pure);
    },
    medal() {
      return this.rewards.medal;
    },
    sunstones() {
      return this.rewards.sunstones;
    },
  },
};
</script>

<style lang="scss">
</style>
