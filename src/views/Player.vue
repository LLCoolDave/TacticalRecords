<template>
  <div class="player" v-if="hasLoaded">
    <div class="name"><img :src="player?.pfp" v-if="player?.pfp" width="32" height="32"/> {{ player?.name }}</div>
    <div class="meta">
      <tn-icon icon="sunstone"/><span class="rewardFont large">{{player.sunstones}}</span>
      <medal-row :medals="player"/>
    </div>
    <div class="compare">
      <div class="margin"><router-link :to="'/compare/' +player.id  + '/records'">Compare to Records</router-link></div>
      <div class="margin"><router-link :to="'/compare/' +player.id  + '/progress'">Compare to Meta Progress</router-link></div>
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
        <td class="element">
          <router-link :to="'/run/' + impureRecords[tower.id].id" v-if="tower.id in impureRecords">
            <tower-score :runData="impureRecords[tower.id]" :towerData="tower" :pure="false" />
          </router-link>
        </td>
        <td class="element">
          <router-link :to="'/run/' + pureRecords[tower.id].id" v-if="tower.id in pureRecords">
            <tower-score :runData="pureRecords[tower.id]" :towerData="tower"/>
          </router-link>
        </td>
      </tr>
      </table>
    </div>
  </div>
</template>

<script src="./player.js">
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
.compare {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.margin {
  margin: 10px;
}
.large {
  font-size: 30px;
}
</style>
