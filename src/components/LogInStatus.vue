<template>
  <div class="loginStatus" v-if="!$auth.state.loading">
    <router-link to="/profile" v-if="$auth.state.isAuthenticated">{{ $auth.state.user.name }}</router-link>
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
};
</script>

<style lang="scss">
</style>
