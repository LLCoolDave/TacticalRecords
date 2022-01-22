<template>
  <div class="logout" @click="logout">
    Log Out
  </div>
</template>

<script>
export default {
  name: 'LogoutButton',
  inject: ['$auth'],
  methods: {
    logout() {
      this.$auth.logout({ returnTo: window.location.origin });
    },
  },
};
</script>

<style lang="scss">
</style>
