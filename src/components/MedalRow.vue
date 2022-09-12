<template>
  <div class="medalrow" :style="columnCss">
    <tn-icon icon="bronze" :size="size" v-for="index in medals?.bronze || 0" :key="index"/>
    <tn-icon icon="silver" :size="size" v-for="index in medals?.silver || 0" :key="index"/>
    <tn-icon icon="gold" :size="size" v-for="index in medals?.gold || 0" :key="index"/>
    <tn-icon icon="platinum" :size="size" v-for="index in medals?.platinum || 0" :key="index"/>
    <tn-icon icon="diamond" :size="size" v-for="index in medals?.diamond || 0" :key="index"/>
    <tn-icon icon="moon" :size="size" v-for="index in medals?.moon || 0" :key="index"/>
    <tn-icon icon="sun" :size="size" v-for="index in medals?.sun || 0" :key="index"/>
  </div>
</template>

<script>
export default {
  name: 'MedalRow',
  props: ['medals', 'size', 'rowLength'],
  computed: {
    breakPoint() {
      return this.rowLength || 20;
    },
    columnCss() {
      return `grid-template-columns: repeat(${this.breakPoint}, max-content);`;
    },
  },
};
</script>

<style scoped>
.medalrow {
  display: grid;
  justify-content: center;
}
</style>
