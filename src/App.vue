<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopHeader from '@/components/TopHeader.vue'
import { getAuth } from 'firebase/auth'
</script>

<template>
  <TopHeader />
  <main>
    <RouterView />
  </main>
</template>
