<template>
<div v-if="hasLoaded" class="wrapper">
  <div class="player">
    <img :src="player?.pfp" v-if="player?.pfp" width="32" height="32"/> {{ player?.name }}
  </div>
  <div class="tower">
    <select v-model="towerId">
      <option v-for="tower in towerOrder" :key="tower" :value="tower">{{ this.$store.state.towers?.[tower].fullName }}</option>
    </select>
  </div>
  <div class="score">
    Score: <input type="text" v-model.number="score" size="10" maxlength="10" class="input scoreFont" :style="scoreHighlight" @focus="if(score === 0) score = null;" @focusout="if(!score) score = 0;">
    <tn-icon :icon="clear" v-if="clear"/>
    <span class="clearPlaceholder" v-else>&nbsp;</span>
    <tn-icon :icon="this.rewards?.medal?.toLowerCase()" size="small"/>
    <tn-icon icon="sunstone" size="small"/><span class="rewardFont">{{this.rewards?.sunstones}}</span>
  </div>
  <div class="stats">
    Final Stats:
    <div>
      <tn-icon icon="atk"/> <input type="text" v-model.number="atk" size="7" maxlength="7" class="input atkFont" @focus="if(atk === 0) atk = null;" @focusout="if(!atk) atk = 0;">
      <tn-icon icon="def"/> <input type="text" v-model.number="def" size="7" maxlength="7" class="input defFont" @focus="if(def === 0) def = null;" @focusout="if(!def) def = 0;">
      <tn-icon icon="hp"/> <input type="text" v-model.number="hp" size="10" maxlength="10" class="input hpFont" @focus="if(hp === 0) hp = null;" @focusout="if(!hp) hp = 0;">
    </div>
    <div>
      <tn-icon icon="lvl"/> <input type="text" v-model.number="lvl" size="3" maxlength="3" class="input expMultiFont" @focus="if(lvl === 1) lvl = null;" @focusout="if(!lvl) lvl = 1;">
      <tn-icon icon="crown"/> <input type="text" v-model.number="hpMulti" size="6" maxlength="6" class="input hpMultiFont" @focus="if(hpMulti === 100) hpMulti = null;" @focusout="if(!hpMulti) hpMulti = 100;">
      <tn-icon icon="feather"/> <input type="text" v-model.number="expMulti" size="6" maxlength="6" class="input expMultiFont" @focus="if(expMulti === 100) expMulti = null;" @focusout="if(!expMulti) expMulti = 100;">
    </div>
  </div>
  <div class="resources">
    Used resources:
    <div class="modifiers">
      <div class="mysticGate" v-if="towerHasMysticGate"><tn-icon icon="mysticgate"/> <input type="checkbox" v-model="mysticGate"/></div>
    </div>
    <div class="sunstones">
      <tn-icon icon="sunwisher"/> <input type="text" v-model.number="resourcesUsed.sunstones" size="5" maxlength="5" @change="calcSunstonesUsed" class="input scoreFont" @focus="if(resourcesUsed.sunstones === 0) resourcesUsed.sunstones = null;" @focusout="if(!resourcesUsed.sunstones) resourcesUsed.sunstones = 0;"> (
      <tn-icon icon="atk"/> <input type="text" v-model.number="resourcesUsed.atk" size="5" maxlength="5" @change="calcSunstonesUsed" class="input atkFont" @focus="if(resourcesUsed.atk === 0) resourcesUsed.atk = null;" @focusout="if(!resourcesUsed.atk) resourcesUsed.atk = 0;">
      <tn-icon icon="def"/> <input type="text" v-model.number="resourcesUsed.def" size="5" maxlength="5" @change="calcSunstonesUsed" class="input defFont" @focus="if(resourcesUsed.def === 0) resourcesUsed.def = null;" @focusout="if(!resourcesUsed.def) resourcesUsed.def = 0;">
      <tn-icon icon="hp"/> <input type="text" v-model.number="resourcesUsed.hp" size="5" maxlength="5" @change="calcSunstonesUsed" class="input hpFont" @focus="if(resourcesUsed.hp === 0) resourcesUsed.hp = null;" @focusout="if(!resourcesUsed.hp) resourcesUsed.hp = 0;"> )
    </div>
    <div class="medals">
      <tn-icon icon="bronze"/><input type="text" v-model.number="resourcesUsed.bronze" size="2" maxlength="2" class="input rewardFont" @focus="if(resourcesUsed.bronze === 0) resourcesUsed.bronze = null;" @focusout="if(!resourcesUsed.bronze) resourcesUsed.bronze = 0;">
      <tn-icon icon="silver"/><input type="text" v-model.number="resourcesUsed.silver" size="2" maxlength="2" class="input rewardFont" @focus="if(resourcesUsed.silver === 0) resourcesUsed.silver = null;" @focusout="if(!resourcesUsed.silver) resourcesUsed.silver = 0;">
      <tn-icon icon="gold"/><input type="text" v-model.number="resourcesUsed.gold" size="2" maxlength="2" class="input rewardFont" @focus="if(resourcesUsed.gold === 0) resourcesUsed.gold = null;" @focusout="if(!resourcesUsed.gold) resourcesUsed.gold = 0;">
      <tn-icon icon="platinum"/><input type="text" v-model.number="resourcesUsed.platinum" size="2" maxlength="2" class="input rewardFont" @focus="if(resourcesUsed.platinum === 0) resourcesUsed.platinum = null;" @focusout="if(!resourcesUsed.platinum) resourcesUsed.platinum = 0;">
      <tn-icon icon="diamond"/><input type="text" v-model.number="resourcesUsed.diamond" size="2" maxlength="2" class="input rewardFont" @focus="if(resourcesUsed.diamond === 0) resourcesUsed.diamond = null;" @focusout="if(!resourcesUsed.diamond) resourcesUsed.diamond = 0;">
      <tn-icon icon="moon"/><input type="text" v-model.number="resourcesUsed.moon" size="2" maxlength="2" class="input rewardFont" @focus="if(resourcesUsed.moon === 0) resourcesUsed.moon = null;" @focusout="if(!resourcesUsed.moon) resourcesUsed.moon = 0;">
    </div>
  </div>
  <div class="comment">Comment: <div><textarea cols="80" rows="8" v-model="comment"/></div></div>
  <div class="screenshot">
    Clear Screenshot: <input type="text" v-model="screenshot" size="40" maxlength="400" @paste="pasteScreenshot" placeholder="Paste image to upload">
    <div>
      <img :src="screenshot" v-if="screenshot" width="640" height="480"/>
    </div>
    <div class="upload" v-if="showUpload" width="640" height="480" @dragover.prevent @drop="uploadScreenshot">
      Drop screenshot to upload.
    </div>
  </div>
  <div class="buttons">
    <div><input type="button" @click="submit" :value="buttonText" :disabled="!canSubmit"/></div>
    <div v-if="isEdit"><input type="button" @click="deleteCurrentRun" value="Delete Run" :disabled="isUpdating"/> Are you sure? <input type="checkbox" v-model="deleteConfirm"/></div>
  </div>
</div>
</template>

<script src="./runedit.js">
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-areas: 'name screenshot'
                       'tower screenshot'
                       'score screenshot'
                       'stats screenshot'
                       'resources screenshot'
                       'comment screenshot'
                       'buttons buttons';
  justify-content: center;
}

.player {
  grid-area: name;
}

.tower {
  grid-area: tower;
}

.score {
  grid-area: score;
}

.stats {
  grid-area: stats;
}

.resources {
  grid-area: resources;
}

.screenshot {
  grid-area: screenshot;
}

.buttons {
  grid-area: buttons;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.comment {
  grid-area: comment;
}

.upload {
  width: 640px;
  height: 480px;
  background: rgb(79, 119, 228);
}

.input {
  border: none;
}

.clearPlaceholder {
  width: 24px;
  height: 24px;
  display: inline-block;
  flex: 1 1 auto;
}
</style>
