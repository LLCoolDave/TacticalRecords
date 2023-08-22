<template>
  <div v-if="hasLoaded" :class="legacyRun ? 'wrapperWithLegacy' : 'wrapper'">
    <div class="header">
      <div class="names">
        <div class="player">
          <player-display v-if="player" :player="player" />
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div class="tower">
          <router-link :to="'/tower/' + this.tower?.id">{{ this.tower?.fullName }}</router-link>
        </div>
      </div>
      <div class="edit" v-if="canEdit">
        <router-link :to="editRoute"><span class="editButton">Edit Run</span></router-link>
      </div>
    </div>
    <div v-if="legacyRun" class="legacyRunInfo">This run was achieved on an older version of the game.</div>
    <div class="scoreBlock">
      <div class="score">
        <tn-icon :icon="clear" v-if="clear" />
        <tower-score v-if="tower" :runData="this.runData" :towerData="tower" :hideStonesUsed="true" :hideMedals="true" />
      </div>
      <div class="sunstones">
        <tn-icon icon="sunwisher" /><span class="scoreFont">{{this.runData.resourceUse.sunstones}}</span>
        (
        <tn-icon icon="atk" /><span class="atkFont"> {{this.runData.resourceUse.atk}}</span>
        <tn-icon icon="def" /><span class="defFont"> {{this.runData.resourceUse.def}}</span>
        <tn-icon icon="hp" /><span class="hpFont"> {{this.runData.resourceUse.hp}}</span>
        <tn-icon icon="maxHp" /><span class="hpFont"> {{this.runData.resourceUse.maxHp || 0}}</span>
        <template v-if="runData.mysticGate"><tn-icon icon="legacy" /><span class="rewardFont"> {{this.runData.resourceUse.legacyStones || 0}}</span></template>
        )
      </div>
      <div class="medals">
        <medal-row :medals="this.runData.resourceUse" size="small" />
      </div>
      <div class="legacies" v-if="runData.mysticGate">
        <legacy-row :modifiable="false" :legacies="usedLegacies" />
      </div>
    </div>
    <div class="statBlock">
      <div class="atk"><tn-icon icon="atk" /><span class="atkFont"> {{this.runData.atk}}</span></div>
      <div class="def"><tn-icon icon="def" /><span class="defFont"> {{this.runData.def}}</span></div>
      <div class="hp"><tn-icon icon="hp" /><span class="hpFont"> {{this.runData.hp}}</span></div>
      <div class="level"><tn-icon icon="lvl" /><span class="expMultiFont"> {{this.runData.level}}</span></div>
      <div class="hpmulti"><tn-icon icon="crown" /><span class="hpMultiFont"> {{this.runData.hpMulti}}%</span></div>
      <div class="expmulti"><tn-icon icon="feather" /><span class="expMultiFont"> {{this.runData.expMulti}}%</span></div>
    </div>
    <div class="comment">
      <pre v-if="runData.comment" class="commentDisplay">{{this.runData.comment}}</pre>
    </div>
    <div class="screenshot" v-if="this.runData.screenshot">
      <a :href="this.runData.screenshot"><img :src="this.runData.screenshot" width="640" height="480" /></a>
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

.wrapperWithLegacy {
  display: grid;
  grid-template-areas: 'header header screenshot screenshot'
                       'legacyRunInfo legacyRunInfo screenshot screenshot'
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
}

.commentDisplay {
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

.editButton{
  outline: 1px solid #ddd;
  border: 1px solid #000;
  border-right: 1px solid #353535;
  border-bottom: 1px solid #353535;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding: 5px;
  background: skyblue;
  color: black;
}

.editButton:hover {
  background: rgb(0, 255, 170);
  cursor: pointer;
}

.header {
  grid-area: header;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
}

.score {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.legacyRunInfo {
  text-align: center;
  font-size: 20px;
  font-style: italic;
  color: orange;
  grid-area: legacyRunInfo;
}

</style>
