<template>
  <div class="loginStatus" v-if="!$auth.state.loading">
    <div v-if="profile">
      <player-display :player="player" :route="'/profile'" showStones="true"/>
      <div>Compare:&nbsp;
        <router-link :to="'/compare/' +profile.id  + '/records'">Records</router-link>&nbsp;-&nbsp;
        <router-link :to="'/compare/' +profile.id  + '/progress'">Meta</router-link>
      </div>
    </div>
    <div class="button">
      <LogoutButton v-if="$auth.state.isAuthenticated" />
      <LoginButton v-else />
    </div>
  </div>
</template>

<script>
import LoginButton from '@/components/LogInButton.vue';
import LogoutButton from '@/components/LogOutButton.vue';

export default {
  name: 'LogInStatus',
  inject: ['$auth'],
  components: { LogoutButton, LoginButton },
  computed: {
    profile() {
      return this.$store.state.userProfile;
    },
    player() {
      return this.profile?.player;
    },
  },
};
</script>

<style scoped>
.loginStatus {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  padding: 12px;
}
</style>
