<script setup>
defineProps({
  phrase: {
    type: String,
    default: ''
  }
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');
.phrase {
  font-family: 'Reggae One', cursive;
}
</style>
<template>
  <div class="phrase">{{ phrase }}</div>
</template>
