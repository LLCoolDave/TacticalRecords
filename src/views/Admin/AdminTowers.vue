<template>
  <div class="towers">
    <div class="tower" v-for="tower in towers" :key="tower.id">
      <router-link :to="`/admin/tower/${tower.id}`">
      {{tower.fullName}}
      </router-link>
    </div>
    -----
    <div class="tower">
      <router-link :to="`/admin/tower/addNewTower`">
      Add new Tower
      </router-link>
    </div>
  </div>
</template>

<script src="./admintowers.js">
</script>

<style lang="scss">
</style>
