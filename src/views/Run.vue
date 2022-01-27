<template>
  <div v-if="hasLoaded" class="wrapper">
    <div class="header">
      <div class="names">
        <div class="player">
          <player-display v-if="player" :player="player"/>
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div class="tower">
          <router-link :to="'/run/' + this.tower?.id">{{ this.tower?.fullName }}</router-link>
        </div>
      </div>
      <div class="edit" v-if="canEdit">
        <router-link :to="editRoute">Edit Run</router-link>
      </div>
    </div>
    <div class="scoreBlock">
      <div class="score">
        <tower-score v-if="tower" :runData="this.runData" :towerData="tower" :hideStonesUsed="true"/>
      </div>
      <div class="sunstones">
        <tn-icon icon="sunwisher"/><span class="scoreFont">{{this.runData.resourceUse.sunstones}}</span>
        (
          <tn-icon icon="atk"/><span class="atkFont"> {{this.runData.resourceUse.atk}}</span>
          <tn-icon icon="def"/><span class="defFont"> {{this.runData.resourceUse.def}}</span>
          <tn-icon icon="hp"/><span class="hpFont"> {{this.runData.resourceUse.hp}}</span>
          )
      </div>
      <div class="medals">
        <medal-row :medals="this.runData.resourceUse" size="small"/>
      </div>
    </div>
    <div class="statBlock">
      <div class="atk"><tn-icon icon="atk"/><span class="atkFont"> {{this.runData.atk}}</span></div>
      <div class="def"><tn-icon icon="def"/><span class="defFont"> {{this.runData.def}}</span></div>
      <div class="hp"><tn-icon icon="hp"/><span class="hpFont"> {{this.runData.hp}}</span></div>
      <div class="level"><tn-icon icon="lvl"/><span class="expMultiFont"> {{this.runData.level}}</span></div>
      <div class="hpmulti"><tn-icon icon="crown"/><span class="hpMultiFont"> {{this.runData.hpMulti}}%</span></div>
      <div class="expmulti"><tn-icon icon="feather"/><span class="expMultiFont"> {{this.runData.expMulti}}%</span></div>
    </div>
    <div class="comment">
      <pre>{{this.runData.comment}}</pre>
    </div>
    <div class="screenshot" v-if="this.runData.screenshot">
      <a :href="this.runData.screenshot"><img :src="this.runData.screenshot"  width="640" height="480"/></a>
    </div>
  </div>
</template>

<script src="./run.js">
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-areas: 'header header screenshot screenshot'
                       'score stats screenshot screenshot'
                       'score stats screenshot screenshot'
                       'comment comment screenshot screenshot';
  justify-content: center;
}

.names {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  grid-column-start: 2;
}

.comment {
  grid-area: comment;
  background: rgb(79, 119, 228);
}

.screenshot {
  grid-area: screenshot;
}

.statBlock {
  grid-area: stats;
  display: grid;
  grid-template-areas: 'hp hpmulti'
                       'atk def'
                       'level expmulti';
  justify-content: left;
  align-content: center;
}

.hp {
  grid-area: hp;
}
.hpmulti {
  grid-area: hpmulti;
}
.expmulti {
  grid-area: expmulti;
}
.atk {
  grid-area: atk;
}
.def {
  grid-area: def;
}
.level {
  grid-area: level;
}

.scoreBlock {
  grid-area: score;
  display: grid;
  justify-content: right;
  align-content: center;
}

.edit {
  margin-left: auto;
}

.header {
  grid-area: header;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
}

</style>
