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

<style scoped>
.logout {
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

.logout:hover {
  background: rgb(0, 255, 170);
  cursor: pointer;
}
</style>
