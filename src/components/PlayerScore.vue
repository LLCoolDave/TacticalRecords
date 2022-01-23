<template>
  <div class="score">
    <player-display :player="player"/>
    <tower-score :score="score" :towerData="towerData" :pure="pure"/>
  </div>
</template>

<script>
import PlayerDisplay from './PlayerDisplay.vue';

export default
{
  components: { PlayerDisplay },
  name: 'PlayerScore',
  props: ['score', 'towerData', 'pure', 'player'],
};
</script>

<style lang="scss">
</style>
