<template>
  <header class="bg-gray-800 text-gray-200 py-3">
    <div class="container-fluid">
      <nav>
        <RouterLink :to="{name: 'home'}">Home</RouterLink>
        <RouterLink :to="{name: 'login'}">About</RouterLink>
      </nav>
    </div>
  </header>

</template>
