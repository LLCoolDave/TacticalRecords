<template>
  <div class="player" v-if="player">
    <router-link :to="router_target" class="player">
      <img :src="player?.pfp" v-if="player?.pfp" width="24" height="24"/> {{ player?.name }}
    </router-link>
    <template v-if="showStones && player?.sunstones != null"><tn-icon icon="sunstone"/>{{ player.sunstones}}</template>
  </div>
</template>

<script>
export default
{
  name: 'PlayerDisplay',
  props: ['player', 'route', 'showStones'],
  computed: {
    router_target() {
      return this.route || `/player/${this.player?.id}`;
    },
  },
};
</script>

<style scoped>
.player {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
