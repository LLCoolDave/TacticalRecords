<template>
<div v-if="hasLoaded">
  <div class="player">
    <router-link :to="playerRoute"><img :src="player?.pfp" v-if="player?.pfp" width="24" height="24"/> {{ player?.name }}</router-link>
  </div>
  <div class="tower">
    {{ this.tower.fullName }}
  </div>
  <div class="score">
    <tower-score v-if="tower" :runData="this.runData" :towerData="tower" :hideStonesUsed="true"/>
  </div>
  <div class="stats">
    Final Stats:
    <div>
      <tn-icon icon="atk"/> {{this.runData.atk}}
      <tn-icon icon="def"/> {{this.runData.def}}
      <tn-icon icon="hp"/> {{this.runData.hp}}
    </div>
    <div>
      <tn-icon icon="lvl"/> {{this.runData.level}}
      <tn-icon icon="crown"/> {{this.runData.hpMulti}}%
      <tn-icon icon="feather"/> {{this.runData.expMulti}}%
    </div>
  </div>
  <div class="resources">
    Used resources:
    <div class="sunstones">
      <tn-icon icon="sunwisher"/>{{this.runData.resourceUse.sunstones}}
      (
        <tn-icon icon="atk"/> {{this.runData.resourceUse.atk}}
        <tn-icon icon="def"/> {{this.runData.resourceUse.def}}
        <tn-icon icon="hp"/> {{this.runData.resourceUse.hp}}
        )
    </div>
    <div class="medals">
      <tn-icon icon="bronze"/>{{this.runData.resourceUse.bronze}}
      <tn-icon icon="silver"/>{{this.runData.resourceUse.silver}}
      <tn-icon icon="gold"/>{{this.runData.resourceUse.gold}}
      <tn-icon icon="platinum"/>{{this.runData.resourceUse.platinum}}
      <tn-icon icon="diamond"/>{{this.runData.resourceUse.diamond}}
      <tn-icon icon="moon"/>{{this.runData.resourceUse.moon}}
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
