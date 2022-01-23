<template>
  <div id="nav">
    <router-link to="/records">Records</router-link> |
    <router-link to="/players">Players</router-link> |
    <router-link to="/towers">Towers</router-link>
    <router-link to="/run/new" v-if="this.$store.state.userProfile"> | Submit Run</router-link>
    <login-status/>
  </div>
  <router-view/>
</template>

<script>
import { watch } from 'vue';
import { AuthState } from './scripts/auth0';

export default {
  name: 'App',
  created() {
    watch(() => AuthState.isAuthenticated, (isAuthenticated) => {
      if (isAuthenticated === true) {
        this.$store.dispatch('loadProfile');
      }
      return null;
    });
    this.$store.dispatch('fetchTowers');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
