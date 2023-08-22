<template>
  <div @click="increment" class="legacyButton" :style="borderColor">
    <legacy-icon :legacyInfo="legacyInfo" size="medium" />
  </div>
</template>

<script>
export default {
  name: 'LegacyButton',
  props: ['id', 'modifiable', 'usedCount'],
  data: () => ({
    currentCount: 0,
  }),
  computed: {
    legacyInfo() {
      return this.$store.state?.legacies[this.id];
    },
    borderColor() {
      // ToDo support multiple counts, need to see how game does this when it is implemented
      return this.currentCount === 0 ? { borderColor: 'black' } : { borderColor: 'green' };
    },
  },
  methods: {
    async increment() {
      if (!this.modifiable) return;
      this.currentCount = (this.currentCount + 1) % (this.legacyInfo.max + 1);
      this.$emit('setCount', { id: this.id, count: this.currentCount });
    },
  },
  async created() {
    this.currentCount = this.usedCount;
  },
};
</script>

<style scoped>
.legacyButton {
  border: 2px solid #000;
  padding: 1px;
  margin: 1px;
}
</style>
