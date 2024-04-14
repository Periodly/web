<template>
  <div class="w-full absolute top-5 px-10">
    <div
      class="bg-white/30 px-5 py-3 rounded-xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] flex items-center justify-between gap-3"
    >
      <div class="flex gap-3 items-center">
        <img src="@/assets/logo.png" alt="logo" class="w-20" />
        <p class="font-bold text-2xl">periodly lite</p>
      </div>
      <button
        class="py-2 px-5 text-lg font-medium bg-white/50 hover:bg-white/70 active:bg-white/90 rounded-lg transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        @click="authStore.logout()"
      >
        Wyloguj sie
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>
