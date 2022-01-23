<template>
  <div class="players">
    <table>
    <tr v-for="player in players" :key="player.id">
      <td>
        <router-link :to="'/player/' + player.id">
          <div class="name"><img :src="player?.pfp" v-if="player?.pfp" width="32" height="32"/> {{ player?.name }}
            <img src="../assets/sunstone.png"/>{{player.sunstones}}
          </div>
        </router-link>
      </td>
    </tr>
    </table>
  </div>
</template>

<script src="./players.js">
</script>

<style lang="scss">
</style>
