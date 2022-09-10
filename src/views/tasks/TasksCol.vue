<script setup>
import TaskCard from '@/views/tasks/TaskCard.vue'
const props = defineProps(['status', 'tasks'])

</script>

<template>


  <div class="bg-gray-200 px-3 pt-4 pb-1 rounded-lg h-full">
    <div class="mb-3 flex justify-center items-center">
      <span class="text-lg">{{ status.toUpperCase() }}</span>
      <span class="py-0.5 px-2 text-sm rounded bg-indigo-200 ml-3">{{ tasks.length }}</span>
    </div>
    <div class="">
      <div v-for="task in tasks" :key="task.id">
        <TaskCard :task="task" />
      </div>
    </div>
  </div>
</template>
