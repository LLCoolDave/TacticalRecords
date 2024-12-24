<template>
  <div @click.ctrl="increment" @click.exact="toggle" class="legacyButton" :style="borderColor">
    <legacy-icon :legacyInfo="legacyInfo" size="medium" />
    <div v-if="currentCount > 1" class="countOverlay">{{ currentCount }}</div>
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
      this.currentCount += 1;
      this.$emit('setCount', { id: this.id, count: this.currentCount });
    },
    async toggle() {
      if (!this.modifiable) return;
      this.currentCount = this.currentCount ? 0 : 1;
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
  position: relative;
}

.countOverlay {
  position: absolute;
  bottom: 0;
  right: 0;
  font-family: "IBM-Plex";
  font-size: 24px;
  color: white;
  display: inline-block;
  -webkit-text-stroke: 1.2px black;
  user-select: none;
}
</style>
