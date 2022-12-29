<template>
  <tr class="legacy">
    <td><legacy-icon :legacyInfo="calcLegacyInfo"/></td>
    <td><input type="text" v-model="id" size="20" maxlength="40" class="input" @change="propUpdate"></td>
    <td><input type="text" v-model="fullName" size="30" maxlength="80" class="input" @change="propUpdate"></td>
    <td><input type="text" v-model.number="slot" size="10" maxlength="20" class="input" @change="propUpdate"></td>
    <td><input type="text" v-model.number="costFlat" size="10" maxlength="20" class="input" @change="propUpdate"></td>
    <td><input type="text" v-model.number="costPercent" size="10" maxlength="20" class="input" @change="propUpdate"></td>
    <td><input type="text" v-model.number="max" size="10" maxlength="20" class="input" @change="propUpdate"></td>
  </tr>
</template>

<script>
export default {
  name: 'LegacyEdit',
  props: ['legacyInfo', 'new'],
  data: () => ({
    id: null,
    fullName: null,
    slot: 0,
    max: 1,
    flatCost: 0,
    percentCost: 0,
  }),
  computed: {
    icon() {
      return `legacy/${this.legacyInfo.id}`;
    },
    title() {
      return this.legacyInfo.fullName;
    },
    calcLegacyInfo() {
      return {
        id: this.id,
        fullName: this.fullName,
        max: this.max,
      };
    },
    modified() {
      return this.new || this.id !== this.legacyInfo.id || this.fullName !== this.legacyInfo.fullName || this.slot !== this.legacyInfo.slot || this.max !== this.legacyInfo.max || this.costFlat !== this.legacyInfo.costFlat || this.costPercent !== this.legacyInfo.costPercent;
    },
  },
  async created() {
    this.id = this.legacyInfo.id;
    this.fullName = this.legacyInfo.fullName;
    this.slot = this.legacyInfo.slot;
    this.max = this.legacyInfo.max;
    this.costFlat = this.legacyInfo.costFlat;
    this.costPercent = this.legacyInfo.costPercent;
  },
  methods: {
    async propUpdate() {
      const modifications = {
        origId: this.legacyInfo.id,
        new: this.new,
        modified: this.modified,
        id: this.id,
        fullName: this.fullName,
        slot: this.slot,
        max: this.max,
        costFlat: this.costFlat,
        costPercent: this.costPercent,
      };
      this.$emit('modified', modifications);
    },
  },
};
</script>

<style lang="scss">
</style>
