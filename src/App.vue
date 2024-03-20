<template>
  <MainNavbar />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainNavbar from '@/components/MainNavbar.vue';
</script>
