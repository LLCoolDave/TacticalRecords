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
          <tower-score :score="impureRecords[tower.id].score" :pure="false" :towerData="tower"/>
        </router-link>
      </td>
      <td>
        <router-link :to="'/run/' + pureRecords[tower.id].id" v-if="tower.id in pureRecords">
          <tower-score :score="pureRecords[tower.id].score" :pure="true" :towerData="tower"/>
        </router-link>
      </td>
    </tr>
    </table>
  </div>
</template>

<script src="./player.js">
</script>

<style lang="scss">
</style>
