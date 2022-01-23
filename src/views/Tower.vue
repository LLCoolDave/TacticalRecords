<template>
  <div class="tower">
    <div class="name">{{towerData?.fullName}}</div>
    <div class="tables">
      <table class="table">
      <tr>
        <th class="element">Impure</th>
      </tr>
      <tr v-for="run in impureRuns" :key="run.id">
        <td class="element">
          <router-link :to="'/run/' + run.id">
            <player-score :score="run.score" :player="run.player" :pure="false" :towerData="towerData"/>
          </router-link>
        </td>
      </tr>
      </table>
      <table class="table">
      <tr>
        <th class="element">Pure</th>
      </tr>
      <tr v-for="run in pureRuns" :key="run.id">
        <td class="element">
          <router-link :to="'/run/' + run.id">
            <player-score :score="run.score" :player="run.player" :pure="true" :towerData="towerData"/>
          </router-link>
        </td>
      </tr>
      </table>
    </div>
  </div>
</template>

<script src="./tower.js">
</script>

<style>
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
</style>
