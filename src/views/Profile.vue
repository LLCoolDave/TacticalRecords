<template>
  <div class="Name">
    Display Name: <input type="text" v-model="name" size="40" maxlength="40" :disabled="isUpdating" :style="nameStyle">
  </div>
  <div class="Pfp">
    Profile Picture: <input type="text" v-model="pfp" size="40" maxlength="400" :disabled="isUpdating">
  </div>
  <img :src="pfp" v-if="pfp" width="256" height="256"/>
  <div><input type="button" @click="updateProfile" value="Update Profile" :disabled="!changes"/></div>
</template>

<script src="./profile.js">
</script>

<style lang="scss">
</style>
