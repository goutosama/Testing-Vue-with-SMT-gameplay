<script setup lang="ts">
import MainWindow from '@/components/MainWindow.vue'
</script>

<template>
  <div class="about">
    <MainWindow />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
