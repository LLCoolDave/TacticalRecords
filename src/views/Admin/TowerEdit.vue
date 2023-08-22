<template>
  <div v-if="hasLoaded" class="wrapper">
    <div class="tower">
      <div>
        Full Name: <input type="text" v-model="fullName" size="40" maxlength="80" class="input">
      </div>
      <div>
        Id: <input type="text" v-model="towerId" size="10" maxlength="20" class="input" :disabled="isEdit">
        Slot: <input type="text" v-model.number="slot" size="2" maxlength="2" class="input">
        Chapter: <input type="text" v-model.number="chapter" size="2" maxlength="2" class="input">
        InternalId: <input type="text" v-model.number="ingameId" size="2" maxlength="2" class="input">
      </div>
      <div>
        <tn-icon icon="mysticgate" /> <input type="checkbox" v-model="hasMysticGate" /> No Impure Scores: <input type="checkbox" v-model="hasNoImpure" />
      </div>
    </div>
    <div class="thresholds">
      <div class="threhold">
        <tn-icon icon="sunstone" /> <input type="text" v-model.number="thresholds.overscore" size="10" maxlength="10" class="input">
      </div>
      <div class="threhold">
        <tn-icon icon="sun" /> <input type="text" v-model.number="thresholds.sun" size="10" maxlength="10" class="input">
      </div>
      <div class="threhold">
        <tn-icon icon="moon" /> <input type="text" v-model.number="thresholds.moon" size="10" maxlength="10" class="input">
      </div>
      <div class="threhold">
        <tn-icon icon="diamond" /> <input type="text" v-model.number="thresholds.diamond" size="10" maxlength="10" class="input">
      </div>
      <div class="threhold">
        <tn-icon icon="platinum" /> <input type="text" v-model.number="thresholds.platinum" size="10" maxlength="10" class="input">
      </div>
      <div class="threhold">
        <tn-icon icon="gold" /> <input type="text" v-model.number="thresholds.gold" size="10" maxlength="10" class="input">
      </div>
      <div class="threhold">
        <tn-icon icon="silver" /> <input type="text" v-model.number="thresholds.silver" size="10" maxlength="10" class="input">
      </div>
      <div class="threhold">
        <tn-icon icon="bronze" /> <input type="text" v-model.number="thresholds.bronze" size="10" maxlength="10" class="input">
      </div>
    </div>
    <div class="clears">
      <div class="clear">
        <tn-icon icon="clear1" />
        Volume: <input type="text" v-model.number="clears['1'].volume" size="3" maxlength="3" class="input">
        Difficulty: <input type="text" v-model.number="clears['1'].difficulty" size="3" maxlength="3" class="input">
      </div>
      <div class="clear">
        <tn-icon icon="clear2" />
        Volume: <input type="text" v-model.number="clears['2'].volume" size="3" maxlength="3" class="input">
        Difficulty: <input type="text" v-model.number="clears['2'].difficulty" size="3" maxlength="3" class="input">
      </div>
      <div class="clear">
        <tn-icon icon="clear3" />
        Volume: <input type="text" v-model.number="clears['3'].volume" size="3" maxlength="3" class="input">
        Difficulty: <input type="text" v-model.number="clears['3'].difficulty" size="3" maxlength="3" class="input">
      </div>
    </div>
    <div class="buttons">
      <div><input type="button" @click="submit" :value="buttonText" :disabled="!canSubmit" /></div>
      <div v-if="isEdit"><input type="button" @click="deleteTower" value="Delete Tower" :disabled="isUpdating" /> Are you sure? <input type="checkbox" v-model="deleteConfirm" /></div>
    </div>
  </div>
</template>

<script src="./toweredit.js">
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-areas: 'tower'
                       'thresholds'
                       'clears'
                       'buttons';
  justify-content: center;
}

.tower {
  grid-area: tower;
}

.thresholds {
  grid-area: thresholds;
}

.clears {
  grid-area: clears;
}

.buttons {
  grid-area: buttons;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.input {
  border: none;
}
</style>
