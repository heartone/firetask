<template>
  <div class="p-3 border border-indigo-300 rounded-t-lg bg-indigo-200">
    <slot name="header" />
  </div>
  <div class="py-5 px-3 border-l border-r border-gray-300 bg-white">
    <slot name="body" />
  </div>
  <div class="p-3 border border-gray-300 rounded-b-lg bg-gray-200">
    <slot name="footer" />
  </div>
</template>
