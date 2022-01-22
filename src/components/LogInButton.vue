<template>
  <div class="login" @click="login">
    Log In/Sign Up
  </div>
</template>

<script>
export default {
  name: 'LoginButton',
  inject: ['$auth'],
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
  },
};
</script>

<style lang="scss">
</style>
