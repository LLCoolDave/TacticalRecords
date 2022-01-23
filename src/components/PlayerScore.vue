<template>
  <div class="score">
    <router-link :to="'/player/'+player.id"><img :src="player?.pfp" v-if="player?.pfp" width="24" height="24"/> {{ player?.name }}</router-link>
    <tower-score :score="score" :towerData="towerData" :pure="pure"/>
  </div>
</template>

<script>
export default
{
  name: 'PlayerScore',
  props: ['score', 'towerData', 'pure', 'player'],
};
</script>

<style lang="scss">
</style>
