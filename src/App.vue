<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="flex justify-between bg-teal-700 text-lg text-gray-100 h-16 items-center mx-auto px-2 sm:px-6 lg:px-8">
      <div class="capitalize text-orange-300 text-xl">File Upload App</div>
      <nav class="p-2 space-x-5">
        <RouterLink class="hover:text-orange-300" to="/">Home</RouterLink>
        <RouterLink class="hover:text-orange-300" to="/upload">Upload Image</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="p-2 g-gray-100 h-screen" />
</template>
