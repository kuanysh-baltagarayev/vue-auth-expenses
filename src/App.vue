<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/AppNavbar.vue'
</script>

<template>
  <div class="layout">
    <Navbar />
    <RouterView />
  </div>

</template>

<style>
.layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
