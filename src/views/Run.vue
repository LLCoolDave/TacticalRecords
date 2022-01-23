<template>
<div v-if="hasLoaded">
  <div class="player">
    <router-link :to="playerRoute"><img :src="player?.pfp" v-if="player?.pfp" width="24" height="24"/> {{ player?.name }}</router-link>
  </div>
  <div class="tower">
    {{ this.tower.fullName }}
  </div>
  <div class="score">
    <tower-score v-if="tower" :score="this.runData.score" :pure="this.runData.pure" :towerData="tower"/>
  </div>
  <div class="stats">
    Final Stats:
    <div>
      <stat-icon stat="atk"/> {{this.runData.atk}}
      <stat-icon stat="def"/> {{this.runData.def}}
      <stat-icon stat="hp"/> {{this.runData.hp}}
    </div>
    <div>
      <stat-icon stat="lvl"/> {{this.runData.level}}
      <stat-icon stat="hpmulti"/> {{this.runData.hpMulti}}%
      <stat-icon stat="expmulti"/> {{this.runData.expMulti}}%
    </div>
  </div>
  <div class="resources">
    Used resources:
    <div class="modifiers">
      <div class="mysticGate" v-if="tower.HasMysticGate">MysticGate: {{this.runData.mysticGate}}</div>
    </div>
    <div class="sunstones">
      <img src="../assets/sunstone.png">{{this.runData.resourceUse.sunstones}}
      (
        <stat-icon stat="atk"/> {{this.runData.resourceUse.atk}}
        <stat-icon stat="def"/> {{this.runData.resourceUse.def}}
        <stat-icon stat="hp"/> {{this.runData.resourceUse.hp}}
        )
    </div>
    <div class="medals">
      <medal-icon medal="bronze"/>{{this.runData.resourceUse.bronze}}
      <medal-icon medal="silver"/>{{this.runData.resourceUse.silver}}
      <medal-icon medal="gold"/>{{this.runData.resourceUse.gold}}
      <medal-icon medal="platinum"/>{{this.runData.resourceUse.platinum}}
      <medal-icon medal="diamond"/>{{this.runData.resourceUse.diamond}}
      <medal-icon medal="moon"/>{{this.runData.resourceUse.moon}}
    </div>
  </div>
  <div class="comment">Comment: {{this.runData.comment}}</div>
  <div class="screenshot">
    <img :src="this.runData.screenshot" v-if="this.runData.screenshot" width="640" height="480"/>
  </div>
  <div class="edit" v-if="canEdit">
    <router-link :to="editRoute">Edit Run</router-link>
  </div>
</div>
</template>

<script src="./run.js">
</script>

<style lang="scss">
</style>
