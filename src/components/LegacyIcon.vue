<template>
  <tn-icon :icon="icon" :titleText="title" :size="size"/>
</template>

<script>
export default {
  name: 'LegacyIcon',
  props: ['legacyInfo', 'size'],
  computed: {
    icon() {
      return `legacy/${this.legacyInfo.id}`;
    },
    title() {
      return this.legacyInfo.fullName;
    },
  },
};
</script>

<style lang="scss">
</style>
