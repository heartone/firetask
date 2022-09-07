<script setup>
import NewTask from '@/components/NewTask.vue'
import TasksList from '@/components/TasksList.vue'

</script>
<template>
  <div class="container-fluid py-3 border-b shadow bg-white">
    <NewTask />
  </div>
  <div class="container-fluid py-3 ">
    <TasksList />
  </div>

</template>
