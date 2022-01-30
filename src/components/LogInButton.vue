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

<style scoped>
.login {
outline: 1px solid #ddd;
border: 1px solid #000;
border-right: 1px solid #353535;
border-bottom: 1px solid #353535;
-webkit-border-radius: 5px;
-moz-border-radius: 5px;
border-radius: 5px;
padding: 5px;
background: skyblue;
color: black;
}

.login:hover {
  background: rgb(0, 255, 170);
  cursor: pointer;
}
</style>
