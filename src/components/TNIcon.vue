<template>
  <img v-if="iconRef" :src="iconRef" :width="pixels" :height="pixels">
</template>

<script>
import { getIconURL } from '../scripts/resources';

export default {
  name: 'TNIcon',
  props: ['icon', 'size'],
  computed: {
    iconRef() {
      return getIconURL(this.icon);
    },
    pixels() {
      switch (this.size) {
        case 'small': return 16;
        case 'large': return 32;
        default: return 24;
      }
    },
  },
};
</script>

<style lang="scss">
</style>
