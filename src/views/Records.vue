<template>
  <div class="records" v-if="hasLoaded">
    <div>Total: <tn-icon icon="sunstone"/><span class="rewardFont large">{{stoneTotals.pure + stoneTotals.impure}}</span></div>
    <table class="table">
    <tr>
      <th class="element">Tower</th>
      <th class="element">Impure</th>
      <th class="element">Pure</th>
    </tr>
    <tr>
      <td class="element">Totals:</td>
      <td class="element"><tn-icon icon="sunstone"/><span class="rewardFont large">{{stoneTotals.impure}}</span></td>
      <td class="element"><tn-icon icon="sunstone"/><span class="rewardFont large">{{stoneTotals.pure}}</span></td>
    </tr>
    <tr v-for="tower in towers" :key="tower.id">
      <td class="element"><router-link :to="'/tower/' + tower.id">{{tower.fullName}}</router-link></td>
      <td class="element">
        <router-link :to="'/run/' + impureRecords[tower.id].id" v-if="tower.id in impureRecords">
          <player-score :runData="impureRecords[tower.id]" :player="impureRecords[tower.id].player" :pure="false" :towerData="tower"/>
        </router-link>
      </td>
      <td class="element">
        <router-link :to="'/run/' + pureRecords[tower.id].id" v-if="tower.id in pureRecords">
          <player-score :runData="pureRecords[tower.id]" :player="pureRecords[tower.id].player" :towerData="tower"/>
        </router-link>
      </td>
    </tr>
    </table>
  </div>
</template>

<script src="./records.js">
</script>

<style scoped>
.records {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.table {
  height: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  margin: auto;
}
.element {
  border: 1px solid black;
  padding: 8px;
}
.large {
  font-size: 30px;
}
</style>
