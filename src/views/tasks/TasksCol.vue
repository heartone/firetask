<script setup>
import TaskCard from '@/views/tasks/TaskCard.vue'
const props = defineProps(['status', 'tasks'])
</script>

<template>
  <div>
    <div class="mb-3 flex justify-center items-center">
      <span class="text-lg">{{ status.toUpperCase() }}</span>
      <span class="py-0.5 px-2 text-sm rounded bg-indigo-200 ml-3">{{ tasks.length }}</span>
    </div>
    <div class="bg-gray-200 px-4 pt-4 pb-1 rounded-lg">
      <div v-for="task in tasks" :key="task.id">
        <TaskCard :task="task" />
      </div>
    </div>
  </div>
</template>
