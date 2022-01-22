<template>
  <div class="player">
    <div class="name">{{name}}</div>
    <table>
    <tr>
      <th>Tower</th>
      <th>Impure</th>
      <th>Pure</th>
    </tr>
    <tr v-for="tower in towers" :key="tower.id">
      <td>{{tower.fullName}}</td>
      <td>
        <tower-score :score="records[tower.id]?.impure ?? 0" :pure="false" :towerData="tower"/>
      </td>
      <td>
        <tower-score :score="records[tower.id]?.pure ?? 0" :pure="true" :towerData="tower"/>
      </td>
    </tr>
    </table>
  </div>
</template>

<script src="./player.js">
</script>

<style lang="scss">
</style>
