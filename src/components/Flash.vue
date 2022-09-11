<script setup>
import { ref, watch, computed } from 'vue'
import { useAppStore } from '@/stores/app.js'
const appStore = useAppStore()
const show = ref(false)
const flashedAt = computed(() => appStore.flash + new Date())
watch(flashedAt, (newValue, oldValue) => {
  if (appStore.flash.length > 0) {
    show.value = true
    setTimeout(() => {
      show.value = false
      appStore.flash = ''
    }, 3000)
  }
})



</script>
<template>
  <div :class="{'-right-full': !show}" class="fixed z-30 top-0 right-0 p-4 duration-500 transition-all">
    <div class="py-2 px-4 rounded-lg shadow-lg bg-pink-500 flex items-center justify-between text-white">
      <div class="truncate">{{ appStore.flash }}</div>
      <button
        type="button"
        class="ml-3 flex p-2 rounded-md focus:outline-none sm:-mr-2 transition bg-pink-600 hover:bg-pink-700 focus:bg-pink-600"
        aria-label="Dismiss"
        @click="show=false"
        >
        <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

    </div>
  </div>
</template>

