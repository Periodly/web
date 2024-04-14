<template>
  <div
    class="flex flex-col gap-2 bg-white/30 p-5 rounded-2xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
  >
    <div class="h-32 w-32 p-2 bg-white/30 rounded-xl overflow-hidden flex items-center">
      <img src="@/assets/user.png" alt="User" class="scale-125" />
    </div>
    <div class="gap-1">
      <p v-if="hasAdminAccess()" class="text-lg">Administrator</p>
      <p class="font-medium text-xl">{{ getUsername() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUsername, hasAdminAccess } from '@/helpers/jwtDecoder';
import { User } from 'lucide-vue-next';
</script>
