<script setup>
import NewTask from '@/components/NewTask.vue'
import TasksList from '@/components/TasksList.vue'

</script>
<template>

    <NewTask />

  <div class="container-fluid py-3 overflow-x-auto">
    <TasksList />
  </div>
</template>
