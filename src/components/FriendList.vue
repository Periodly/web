<template>
  <div
    class="flex flex-col gap-3 bg-white/30 p-5 rounded-2xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
  >
    <h2 class="font-medium text-xl">Friends</h2>
    <div class="flex flex-col gap-2">
      <p v-if="!friendList || friendList.length === 0" class="text-center">You have no friends</p>
      <p v-for="friend in friendList" :key="friend">{{ friend }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ friendList: string[] | undefined }>();
</script>
