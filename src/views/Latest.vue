<template>
  <div class="latest" v-if="hasLoaded">
    <div>Most Recent Runs</div>
    <table class="table">
    <tr>
      <th class="element">Tower</th>
      <th class="element">Player</th>
      <th class="element">Score</th>
      <th class="element">Date</th>
    </tr>
    <tr v-for="run in latest" :key="run.id">
      <td class="element"><router-link :to="'/tower/' + run.towerId">{{towerById(run.towerId).fullName}}</router-link></td>
      <td class="element"><player-display :player="run.player"/></td>
      <td class="element">
        <router-link :to="'/run/' + run.id">
          <tower-score :runData="run" :towerData="towerById(run.towerId)" :pure="run.pure"/>
        </router-link>
      </td>
      <td class="element">
        {{formatDate(run.time)}}
      </td>
    </tr>
    </table>
  </div>
</template>

<script src="./latest.js">
</script>

<style scoped>
.latest {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.table {
  height: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  margin: auto;
}
.element {
  border: 1px solid black;
  padding: 8px;
}
</style>
