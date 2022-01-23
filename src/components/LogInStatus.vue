<template>
  <div class="loginStatus" v-if="!$auth.state.loading">
    <div v-if="profile"><player-display :player="player" :route="'/profile'"/></div>
    <div>
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
</style>
