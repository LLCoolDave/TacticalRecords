<template>
  <div class="align">
    <player-display :player="player"/>
    <tower-score v-bind="$props"/>
  </div>
</template>

<script>
import PlayerDisplay from './PlayerDisplay.vue';

export default
{
  components: { PlayerDisplay },
  name: 'PlayerScore',
  props: ['runData', 'towerData', 'player', 'pure'],
};
</script>

<style scoped>
.align {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
