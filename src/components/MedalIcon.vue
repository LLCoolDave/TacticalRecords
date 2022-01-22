<template>
  <img v-if="iconRef" :src="iconRef">
</template>

<script>
import getMedalURI from '../scripts/resources';

export default {
  name: 'MedalIcon',
  props: ['medal'],
  computed: {
    iconRef() {
      return getMedalURI(this.medal);
    },
  },
};
</script>

<style lang="scss">
</style>
