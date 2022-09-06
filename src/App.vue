<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopHeader from '@/components/TopHeader.vue'
</script>

<template>
  <TopHeader />
  <main class="container-fluid py-4">
    <RouterView />
  </main>
</template>

<style scoped>

</style>
