<template>
  <div class="records" v-if="hasLoaded">
    <table>
    <tr>
      <th>Tower</th>
      <th>Impure</th>
      <th>Pure</th>
    </tr>
    <tr v-for="tower in towers" :key="tower.id">
      <td><router-link :to="'/tower/' + tower.id">{{tower.fullName}}</router-link></td>
      <td>
        <router-link :to="'/run/' + impureRecords[tower.id].id" v-if="tower.id in impureRecords">
          <player-score :score="impureRecords[tower.id].score" :player="impureRecords[tower.id].player" :pure="false" :towerData="tower"/>
        </router-link>
      </td>
      <td>
        <router-link :to="'/run/' + pureRecords[tower.id].id" v-if="tower.id in pureRecords">
          <player-score :score="pureRecords[tower.id].score" :player="pureRecords[tower.id].player" :pure="true" :towerData="tower"/>
        </router-link>
      </td>
    </tr>
    </table>
  </div>
</template>

<script src="./records.js">
</script>

<style lang="scss">
</style>
