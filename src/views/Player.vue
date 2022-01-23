<template>
  <div class="player" v-if="hasLoaded">
    <div class="name"><img :src="player?.pfp" v-if="player?.pfp" width="32" height="32"/> {{ player?.name }}</div>
    <div class="meta">
      <img src="../assets/sunstone.png"/>{{player.sunstones}}
      <medal-icon medal="bronze" v-for="index in player.bronze" :key="index"/>
      <medal-icon medal="silver" v-for="index in player.silver" :key="index"/>
      <medal-icon medal="gold" v-for="index in player.gold" :key="index"/>
      <medal-icon medal="platinum" v-for="index in player.platinum" :key="index"/>
      <medal-icon medal="diamond" v-for="index in player.diamond" :key="index"/>
      <medal-icon medal="moon" v-for="index in player.moon" :key="index"/>
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
            <tower-score :score="impureRecords[tower.id].score" :pure="false" :towerData="tower"/>
          </router-link>
        </td>
        <td class="element">
          <router-link :to="'/run/' + pureRecords[tower.id].id" v-if="tower.id in pureRecords">
            <tower-score :score="pureRecords[tower.id].score" :pure="true" :towerData="tower"/>
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
</style>
