<template>
  <img v-if="iconRef" :src="iconRef">
</template>

<script>
import { getStatURI } from '../scripts/resources';

export default {
  name: 'StatIcon',
  props: ['stat'],
  computed: {
    iconRef() {
      return getStatURI(this.stat);
    },
  },
};
</script>

<style lang="scss">
</style>
