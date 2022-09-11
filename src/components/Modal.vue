<template>
  <teleport to="body">
    <transition leave-active-class="duration-200">
      <div v-show="show" class="fixed inset-0 overflow-y-auto px-4 py-6 z-50" scroll-region>
        <transition enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0">
        <div v-show="show" class="fixed inset-0 transform transition-all" @click="emits('close')">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        </transition>

        <transition enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div v-show="show" class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto sm:max-w-lg">
            <div class="px-6 py-4">
              <div class="flex justify-between items-center pb-3 border-b">
                <div class="text-lg font-bold">
                  <slot name="title"></slot>
                </div>
                <div>
                  <button class="w-8 h-8 leading-1 border rounded text-sm text-gray-600 hover:bg-gray-200" @click="emits('close')"><i class="fa fa-fw fa-times"></i></button>
                </div>
              </div>
              <div class="py-4">
                <slot name="content"></slot>
              </div>
            </div>
            <div class="px-6 py-3 bg-gray-100 text-right">
              <slot name="footer"></slot>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from "vue";
const emits = defineEmits(['close'])
const props = defineProps({
  show: {
    default: false
  },

})


</script>
