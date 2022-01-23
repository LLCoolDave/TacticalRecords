<template>
  <div class="tower">
    <div class="name">{{towerData?.fullName}}</div>
    <table>
    <tr>
      <th>Impure</th>
    </tr>
    <tr v-for="run in impureRuns" :key="run.id">
      <td>
        <router-link :to="'/run/' + run.id">
          <player-score :score="run.score" :player="run.player" :pure="false" :towerData="towerData"/>
        </router-link>
      </td>
    </tr>
    </table>
    <table>
    <tr>
      <th>Pure</th>
    </tr>
    <tr v-for="run in pureRuns" :key="run.id">
      <td>
        <router-link :to="'/run/' + run.id">
          <player-score :score="run.score" :player="run.player" :pure="true" :towerData="towerData"/>
        </router-link>
      </td>
    </tr>
    </table>
  </div>
</template>

<script src="./tower.js">
</script>

<style lang="scss">
</style>
