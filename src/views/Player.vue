<template>
  <div class="player" v-if="hasLoaded">
    <div class="name"><img :src="player?.pfp" v-if="player?.pfp" width="32" height="32" /> {{ player?.name }}</div>
    <div class="meta">
      <tn-icon icon="sunstone" /><span class="rewardFont large">{{player.sunstones}}</span>
      <medal-row :medals="player" />
    </div>
    <div class="compare">
      <div class="margin"><router-link :to="'/compare/' + player.id + '/records'">Compare to Records</router-link></div>
      <div class="margin"><router-link :to="'/compare/' + player.id + '/progress'">Compare to Meta Progress</router-link></div>
      <div class="margin" v-if="this.$store.state.userProfile?.id && player.id !== this.$store.state.userProfile?.id"><router-link :to="'/compare/' + player.id + '/' + this.$store.state.userProfile?.id">Compare to Myself</router-link></div>
    </div>
    <div class="tables">
      <div class="wrapper">
        <div class="leftheader">
          Records
        </div>
        <table class="table lefttable">
          <tr>
            <th class="element">Tower</th>
            <th class="element">Impure</th>
            <th class="element">Pure</th>
          </tr>
          <tr v-for="tower in towers" :key="tower.id">
            <td class="element"><router-link :to="'/tower/' + tower.id">{{tower.fullName}}</router-link></td>
            <td class="element">
              <router-link :to="'/run/' + impureRecords[tower.id].id" v-if="tower.id in impureRecords">
                <tower-score :runData="impureRecords[tower.id]" :towerData="tower" :pure="false" />
              </router-link>
            </td>
            <td class="element">
              <router-link :to="'/run/' + pureRecords[tower.id].id" v-if="tower.id in pureRecords">
                <tower-score :runData="pureRecords[tower.id]" :towerData="tower" />
              </router-link>
            </td>
          </tr>
        </table>
      </div>
      <div class="wrapper">
        <div class="rightheader">
          Most Recent Runs
        </div>
        <table class="table" v-if="latest">
          <tr>
            <th class="element">Tower</th>
            <th class="element">Score</th>
            <th class="element">Date</th>
          </tr>
          <tr v-for="run in latest" :key="run.id">
            <td class="element"><router-link :to="'/tower/' + run.towerId">{{towerById(run.towerId).fullName}}</router-link></td>
            <td class="element">
              <router-link :to="'/run/' + run.id">
                <tower-score :runData="run" :towerData="towerById(run.towerId)" :pure="run.pure" />
              </router-link>
            </td>
            <td class="element">
              {{formatDate(run.time)}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script src="./player.js">
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
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
.compare {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.margin {
  margin: 10px;
}
.large {
  font-size: 30px;
}
</style>
