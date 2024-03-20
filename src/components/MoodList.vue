<template>
  <div
    class="flex flex-col gap-3 bg-white/30 p-5 rounded-2xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
  >
    <h2 class="font-medium text-xl">Moods</h2>
    <div class="flex flex-col gap-2">
      <p v-if="moodList.length === 0" class="text-center">You have no moods</p>
      <MoodCard v-for="mood in moodList" :key="mood.id" :mood="mood" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Mood from '@/models/mood.model';
import MoodCard from '@/components/MoodCard.vue';

defineProps<{ moodList: Mood[] }>();
</script>
