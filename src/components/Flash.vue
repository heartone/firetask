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
      setTimeout(() => {
        appStore.flash = ''
      }, 300)
    }, 3000)
  }
})



</script>
<template>
  <div :class="{'-right-full': !show}" class="fixed z-30 top-0 right-0 p-4 duration-500 transition-all">
    <div @click="show=false" class="cursor-pointer py-2 px-4 rounded-lg shadow-lg text-orange-900 bg-yellow-200 border border-yellow-300 hover:border-orange-400 hover:shadow-xl flex items-center justify-between transition-all duration-300">
      <div class="truncate">{{ appStore.flash }}</div>
      <button
        type="button"
        class="ml-3 flex p-2 rounded-md focus:outline-none sm:-mr-2 transition bg-orange-500 hover:bg-orange-600 focus:bg-orange-500"
        aria-label="Dismiss"
        >
        <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

    </div>
  </div>
</template>

