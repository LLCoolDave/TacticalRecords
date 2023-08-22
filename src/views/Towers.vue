<template>
  <div class="towers">
    <div class="tower" v-for="tower in towers" :key="tower.id">
      <router-link :to="`/tower/${tower.id}`">
        {{ tower.fullName }}
      </router-link>
    </div>
  </div>
</template>

<script src="./towers.js">
</script>

<style lang="scss"></style>
