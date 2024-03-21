<template>
  <div
    class="flex flex-col gap-3 bg-white/30 p-5 rounded-2xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
  >
    <div class="flex gap-3 justify-between">
      <h2 class="font-medium text-xl">Moods</h2>
      <button
        class="flex items-center gap-1 hover:scale-105 transition-all duration-150 focus:font-medium"
        @click="$emit('addMood')"
      >
        <PlusIcon class="w-5 h-5" />
        Add Mood
      </button>
    </div>
    <div class="flex flex-col gap-2">
      <p v-if="moodList.length === 0" class="text-center">You have no moods</p>
      <MoodCard v-for="mood in moodList" :key="mood.id" :mood="mood" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Mood from '@/models/mood.model';
import MoodCard from '@/components/MoodCard.vue';
import { PlusIcon } from 'lucide-vue-next';

defineProps<{ moodList: Mood[] }>();
defineEmits<{
  addMood: [];
}>();
</script>
