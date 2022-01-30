<template>
<div id="main">
  <link rel="preload" as="font" href="./IBM-Plex-Sans-Condensed-Bold.ttf.woff" type="font/woff" crossorigin="anonymous">
  <div id="nav">
    <div id="links">
      <router-link to="/records">Records</router-link> |
      <router-link to="/latest">Most Recent Runs</router-link> |
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
  color: #EEEEEE;
  -webkit-text-stroke: 0.2px black;
  background: linear-gradient(190deg, #0D3B4B, #060F24, #04165C);
  background-attachment:fixed;
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
}

a, a:visited {
  color: #FFFF96;
  text-decoration: none;
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

@font-face {
  font-family: "IBM-Plex";
  font-style: normal;
  font-display: auto;
  src: local("IBM-Plex-Sans-Condensed-Bold"), url("/IBM-Plex-Sans-Condensed-Bold.ttf.woff") format("woff");
}

.scoreFont {
  font-family: "IBM-Plex";
  font-size: 20px;
  background: linear-gradient(180deg, #ffff23 25%, #FF7B23, #ff2323 75%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  -webkit-text-stroke: 0.6px black;
}

.rewardFont {
  font-family: "IBM-Plex";
  font-size: 20px;
  background: linear-gradient(180deg, #ffea36 25%, #EAC20E, #c39b00 75%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  -webkit-text-stroke: 0.6px black;
}

.hpFont {
  font-family: "IBM-Plex";
  font-size: 20px;
  background: linear-gradient(180deg, #F4FFBE 25%, #ACFF82, #5AFF5A 75%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  -webkit-text-stroke: 0.6px black;
}

.hpMultiFont {
  font-family: "IBM-Plex";
  font-size: 20px;
  background: linear-gradient(180deg, #66FF66 25%, #66FFFF, #6699FF 75%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  -webkit-text-stroke: 0.6px black;
}

.atkFont {
  font-family: "IBM-Plex";
  font-size: 20px;
  background: linear-gradient(180deg, #FFD7D7 25%, #FFAFAF, #FF7373 75%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  -webkit-text-stroke: 0.6px black;
}

.defFont {
  font-family: "IBM-Plex";
  font-size: 20px;
  background: linear-gradient(180deg, #BEFFFF 25%, #96E3FF, #5A91FF 75%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  -webkit-text-stroke: 0.6px black;
}

.expMultiFont {
  font-family: "IBM-Plex";
  font-size: 20px;
  background: linear-gradient(180deg, #FFFFBE 25%, #FFFF82, #FFFF5A 75%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  -webkit-text-stroke: 0.6px black;
}

</style>
