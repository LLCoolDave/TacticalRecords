<template>
<div id="main">
  <div id="nav">
    <div id="links">
      <router-link to="/records">Records</router-link> |
      <router-link to="/players">Players</router-link> |
      <router-link to="/towers">Towers</router-link>
      <template v-if="this.$store.state.userProfile"> | <router-link to="/run/new" >Submit Run</router-link></template>
    </div>
    <div id="status">
      <login-status/>
    </div>
  </div>
  <div id="body">
    <router-view/>
  </div>
</div>
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
  background: #bebbbb;
}

#nav {
  padding: 30px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

a, a:visited {
  color: blue;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#main  {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#body {
  flex: 1 1 auto;
  overflow-y: auto;
  height: 100%;
}

body {
  margin: 0px;
}
</style>
