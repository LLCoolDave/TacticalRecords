<template>
  <div class="legacyRow">
    <legacy-button v-for="legacy in legacies" :id="legacy.id" :key="legacy.id" :usedCount="legacy.count" :modifiable="modifiable" @setCount="updateCount"/>
  </div>
</template>

<script>
export default {
  name: 'LegacyRow',
  props: ['legacies', 'modifiable'],
  methods: {
    async updateCount(newCount) {
      this.$emit('updateCount', newCount);
    },
  },
};
</script>

<style scoped>
.legacyRow {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(16, max-content);
}
</style>
