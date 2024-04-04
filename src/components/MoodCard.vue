<template>
  <div class="flex bg-white/30 rounded-xl">
    <div class="flex flex-col justify-between overflow-hidden rounded-xl">
      <BlobImage :mood="mood.mood as MoodString" class="p-5" />
      <div class="bg-white/50 backdrop-blur-2xl p-5">
        <p class="">{{ new Date(mood.date).toLocaleString() }}</p>
        <p class="font-medium text-xl">{{ mood.mood }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Mood from '@/models/mood.model';
import BlobImage, { type MoodString } from '@/components/BlobImage.vue';

defineProps<{ mood: Mood }>();
</script>
