<template>
  <div class="legacies">
    <table class="legacyTable">
      <tr>
        <th />
        <th class="element">id</th>
        <th class="element">Full Name</th>
        <th class="element">Slot</th>
        <th class="element">Flat Cost</th>
        <th class="element">Percent Cost</th>
        <th class="element">Max Use</th>
      </tr>
      <legacy-edit v-for="legacy in legacies" :key="legacy.id" :legacyInfo="legacy" :new="legacy?.new" @modified="processModifications" />
    </table>
    -----
    <div><input type="button" @click="addLegacy" value="Add new Legacy" /><input type="button" @click="submit" value="Save Changes" :disabled="!validChanges" /></div>
  </div>
</template>

<script src="./adminLegacies.js">
</script>

<style lang="scss">
</style>
