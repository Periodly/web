<template>
  <img :src="blob" alt="mood blob" />
</template>

<script setup lang="ts">
import angryBlob from '@/assets/moods/angryBlob.webp';
import excitedBlob from '@/assets/moods/excitedBlob.webp';
import happyBlob from '@/assets/moods/happyBlob.webp';
import hungryBlob from '@/assets/moods/hungryBlob.webp';
import relaxedBlob from '@/assets/moods/relaxedBlob.webp';
import sadBlob from '@/assets/moods/sadBlob.webp';
import stressedBlob from '@/assets/moods/stressedBlob.webp';
import tiredBlob from '@/assets/moods/tiredBlob.webp';

type MoodString =
  | 'angry'
  | 'excited'
  | 'happy'
  | 'hungry'
  | 'relaxed'
  | 'sad'
  | 'stressed'
  | 'tired';

const props = defineProps<{ mood: MoodString }>();

const blob = {
  angry: angryBlob,
  excited: excitedBlob,
  happy: happyBlob,
  hungry: hungryBlob,
  relaxed: relaxedBlob,
  sad: sadBlob,
  stressed: stressedBlob,
  tired: tiredBlob,
}[props.mood];
</script>
