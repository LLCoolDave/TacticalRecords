<template>
  <div class="tower">
    <div class="name">{{ towerData?.fullName }}</div>
    <div class="towerThresholds" v-if="towerData">
      <table>
        <tr v-for="entry in thresholds" :key="entry.icon">
          <td class="rightAlign">
            <tn-icon :icon="entry.icon" size="normal" />
          </td>
          <td class="rightAlign">
            <span class="scoreFont">{{ entry.value }}</span>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="$store.getters.isAdmin">
      <router-link :to="`/admin/tower/${id}`">
        Edit Tower Data
      </router-link>
    </div>
    <div><input type="checkbox" v-model="personalRecords" />Show only Personal Bests <input
      type="checkbox"
      v-model="legacyScores" />Include legacy scores</div>
    <div class="tables">
      <table class="table" v-if="hasImpure">
        <tr>
          <th class="element">Impure</th>
        </tr>
        <tr v-for="run in impureRunsDisplay" :key="run.id">
          <td class="element">
            <router-link :to="'/run/' + run.id">
              <player-score :runData="run" :player="run.player" :pure="false" :towerData="towerData" />
            </router-link>
          </td>
        </tr>
      </table>
      <table class="table">
        <tr>
          <th class="element">Pure</th>
        </tr>
        <tr v-for="run in pureRunsDisplay" :key="run.id">
          <td class="element">
            <router-link :to="'/run/' + run.id">
              <player-score :runData="run" :player="run.player" :towerData="towerData" />
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script src="./tower.js">
</script>

<style>
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

.towerThresholds {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
