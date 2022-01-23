<template>
  <div class="player" v-if="player">
    <router-link :to="router_target">
      <img :src="player?.pfp" v-if="player?.pfp" width="24" height="24"/> {{ player?.name }}
    </router-link>
  </div>
</template>

<script>
export default
{
  name: 'PlayerDisplay',
  props: ['player', 'route'],
  computed: {
    router_target() {
      return this.route || `/player/${this.player?.id}`;
    },
  },
};
</script>

<style scoped>
.player {
  vertical-align: middle;
}
</style>
