<template>
  <div class="player" v-if="hasLoaded">
    <div class="name">
      <player-display :player="player" showStones="true"/> <div class="margin">vs</div>
      <template v-if="mode == 'player'"><player-display :player="otherPlayer" showStones="true"/></template>
      <template v-if="mode == 'records'">Current Records</template>
      <template v-if="mode == 'meta'">Best Records at current Progress</template>
      <template v-if="mode == 'sunstones'">Best Records at <tn-icon icon="sunstone"/>{{ this.compareId }}</template>
    </div>
    <div class="tables">
      <table class="table">
      <tr>
        <th class="element">Tower</th>
        <th class="element">Impure</th>
        <th class="element">Pure</th>
      </tr>
      <tr v-for="tower in towers" :key="tower.id">
        <td class="element"><router-link :to="'/tower/' + tower.id">{{tower.fullName}}</router-link></td>
        <td class="element shadow" :style="gradient(diffs[tower.id].impure)">
          {{diffs[tower.id].impure}}
        </td>
        <td class="element shadow" :style="gradient(diffs[tower.id].pure)">
          {{diffs[tower.id].pure}}
        </td>
      </tr>
      </table>
    </div>
  </div>
</template>

<script src="./compare.js">
</script>

<style scoped>
.tables {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.table {
  height: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  margin: 10px;
}
.element {
  border: 1px solid black;
  padding: 8px;
}
.shadow {
  text-shadow: -1px 0 rgb(224, 224, 224), 0 1px rgb(224, 224, 224), 1px 0 rgb(224, 224, 224), 0 -1px rgb(224, 224, 224);
}
.name {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.margin {
  margin: 6px;
}
</style>
