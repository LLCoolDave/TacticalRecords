<template>
<div v-if="hasLoaded">
  <div class="player">
    <img :src="player?.pfp" v-if="player?.pfp" width="32" height="32"/> {{ player?.name }}
  </div>
  <div class="tower">
    <select v-model="towerId">
      <option v-for="tower in towerOrder" :key="tower" :value="tower">{{ this.$store.state.towers?.[tower].fullName }}</option>
    </select>
  </div>
  <div class="score">
    Score: <input type="number" v-model="score" min="0" max="999999999999">
    <tn-icon :icon="this.rewards?.medal?.toLowerCase()" size="small"/>
    <tn-icon icon="sunstone" size="small"/>{{this.rewards?.sunstones}}
  </div>
  <div class="stats">
    Final Stats:
    <div>
      <tn-icon icon="atk"/> <input type="number" v-model="atk" min="0" max="1000000">
      <tn-icon icon="def"/> <input type="number" v-model="def" min="0" max="1000000">
      <tn-icon icon="hp"/> <input type="number" v-model="hp" min="0" max="1000000000">
    </div>
    <div>
      <tn-icon icon="lvl"/> <input type="number" v-model="lvl" min="0" max="500">
      <tn-icon icon="hpmulti"/> <input type="number" v-model="hpMulti" min="0" max="100000">
      <tn-icon icon="expmulti"/> <input type="number" v-model="expMulti" min="0" max="100000">
    </div>
  </div>
  <div class="resources">
    Used resources:
    <div class="modifiers">
      <div class="mysticGate" v-if="towerHasMysticGate"><tn-icon icon="mysticgate"/> <input type="checkbox" v-model="mysticGate"/></div>
    </div>
    <div class="sunstones">
      <tn-icon icon="sunwisher"/> <input type="number" v-model="resourcesUsed.sunstones" min="0" max="100000" @change="calcSunstonesUsed"> (
      <tn-icon icon="atk"/> <input type="number" v-model="resourcesUsed.atk" min="0" max="100000" @change="calcSunstonesUsed">
      <tn-icon icon="def"/> <input type="number" v-model="resourcesUsed.def" min="0" max="100000" @change="calcSunstonesUsed">
      <tn-icon icon="hp"/> <input type="number" v-model="resourcesUsed.hp" min="0" max="100000" @change="calcSunstonesUsed"> )
    </div>
    <div class="medals">
      <tn-icon icon="bronze"/><input type="number" v-model="resourcesUsed.bronze" min="0" max="20">
      <tn-icon icon="silver"/><input type="number" v-model="resourcesUsed.silver" min="0" max="20">
      <tn-icon icon="gold"/><input type="number" v-model="resourcesUsed.gold" min="0" max="20">
      <tn-icon icon="platinum"/><input type="number" v-model="resourcesUsed.platinum" min="0" max="20">
      <tn-icon icon="diamond"/><input type="number" v-model="resourcesUsed.diamond" min="0" max="20">
      <tn-icon icon="moon"/><input type="number" v-model="resourcesUsed.moon" min="0" max="20">
    </div>
  </div>
  <div class="comment">Comment: <textarea cols="80" rows="8" v-model="comment"/></div>
  <div class="screenshot">
    ClearScreenshot: <input type="text" v-model="screenshot" size="40" maxlength="400">
    <img :src="screenshot" v-if="screenshot" width="640" height="480"/>
  </div>

  <div><input type="button" @click="submit" :value="buttonText" :disabled="!canSubmit"/></div>
  <div v-if="isEdit"><input type="button" @click="deleteCurrentRun" value="Delete Run" :disabled="isUpdating"/> Are you sure? <input type="checkbox" v-model="deleteConfirm"/></div>
</div>
</template>

<script src="./runedit.js">
</script>

<style lang="scss">
</style>
