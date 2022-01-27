<template>
  <div class="players">
    <table class="table">
    <tr v-for="player in players" :key="player.id">
      <td class="element">
        <router-link :to="'/player/' + player.id">
          <div class="name"><img :src="player?.pfp" v-if="player?.pfp" width="32" height="32"/> {{ player?.name }}
            <tn-icon icon="sunstone" size="normal"/><span class="rewardFont large">{{player.sunstones}}</span>
          </div>
        </router-link>
      </td>
    </tr>
    </table>
  </div>
</template>

<script src="./players.js">
</script>

<style scoped>
.players {
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
}
.element {
  border: 1px solid black;
  padding: 8px;
}
.large {
  font-size: 30px;
}
</style>
