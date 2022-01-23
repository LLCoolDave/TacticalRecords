<template>
  <div class="loginStatus" v-if="!$auth.state.loading">
    <router-link to="/profile" v-if="profile"><img :src="pfp" v-if="pfp" width="24" height="24"/>{{ name }}</router-link>
    <LogoutButton v-if="$auth.state.isAuthenticated" />
    <LoginButton v-else />
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
    pfp() {
      return this.profile?.player?.pfp;
    },
    name() {
      return this.profile?.player?.name;
    },
  },
};
</script>

<style lang="scss">
</style>
