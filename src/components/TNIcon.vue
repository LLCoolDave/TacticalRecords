<template>
  <img v-if="iconRef" :src="iconRef" :width="pixels" :height="pixels" :title="titleText">
</template>

<script>
import { getIconURL, getLegacyIconURL } from '../scripts/resources';

export default {
  name: 'TNIcon',
  props: ['icon', 'size', 'titleText'],
  computed: {
    iconRef() {
      if (this.icon && this.icon.startsWith('legacy/')) return getLegacyIconURL(this.icon.split('/', 2)[1]);
      return getIconURL(this.icon);
    },
    pixels() {
      switch (this.size) {
        case 'tiny': return 8;
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
