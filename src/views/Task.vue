<script setup>
import TaskHeader from '@/views/tasks/TaskHeader.vue'
import TasksList from '@/views/tasks/TasksList.vue'

</script>
<template>

  <TaskHeader />

  <div class="container-fluid py-3 overflow-x-auto">
    <TasksList />
  </div>
</template>
