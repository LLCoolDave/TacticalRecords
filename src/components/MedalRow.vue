<template>
  <div class="medalrow rewardFont" :style="medalCss">
    <div v-if="medals?.bronze" >
      <tn-icon icon="bronze" :size="size"/> {{medals?.bronze}}&nbsp;
    </div>
    <div v-if="medals?.silver">
      <tn-icon icon="silver" :size="size"/> {{medals?.silver}}&nbsp;
    </div>
    <div v-if="medals?.gold">
      <tn-icon icon="gold" :size="size"/> {{medals?.gold}}&nbsp;
    </div>
    <div v-if="medals?.platinum">
      <tn-icon icon="platinum" :size="size"/> {{medals?.platinum}}&nbsp;
    </div>
    <div v-if="medals?.diamond">
      <tn-icon icon="diamond" :size="size"/> {{medals?.diamond}}&nbsp;
    </div>
    <div v-if="medals?.moon">
      <tn-icon icon="moon" :size="size"/> {{medals?.moon}}&nbsp;
    </div>
    <div v-if="medals?.sun">
      <tn-icon icon="sun" :size="size"/> {{medals?.sun}}&nbsp;
    </div>
  </div>
</template>

<script>
export default {
  name: 'MedalRow',
  props: ['medals', 'size', 'rowLength'],
  computed: {
    medalCss() {
      return { fontSize: `${this.fontSize}px` };
    },
    fontSize() {
      switch (this.size) {
        case 'tiny': return 12;
        case 'small': return 21;
        case 'large': return 44;
        default: return 31;
      }
    },
  },
};
</script>

<style scoped>
.medalrow {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
