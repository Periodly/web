<template>
  <div
    class="top-0 absolute w-screen h-screen flex items-center justify-center bg-black/10 backdrop-blur-sm"
  >
    <div
      class="w-2/3 flex flex-col gap-3 bg-white/30 p-5 rounded-2xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
    >
      <h2 class="font-medium text-xl">Add mood</h2>
      <div class="flex flex-wrap gap-5 justify-center">
        <div
          v-for="mood in availableMoods"
          :key="mood"
          :id="mood"
          class="flex flex-col gap-2 items-center justify-center rounded-xl hover:bg-black/20 p-3 transition-all duration-150 cursor-pointer"
          @click="pickMood(mood)"
        >
          <BlobImage :mood="mood as MoodString" class="w-24" />
          <p class="text-black font-medium text-center">{{ mood }}</p>
        </div>
      </div>
      <button
        class="py-2 px-5 text-lg font-medium bg-white/50 hover:bg-white/70 active:bg-white/90 rounded-lg transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        @click="addMood"
      >
        Add Mood
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiInstance } from '@/helpers/api';
import BlobImage, { type MoodString } from '@/components/BlobImage.vue';
import { showToast } from '@/helpers/showToast';
import { TYPE } from 'vue-toastification';

const emit = defineEmits<{
  closeModal: [];
}>();

const availableMoods = ref<string[]>([]);
const chosenMood = ref<string | null>(null);
const lastPickedElement = ref<HTMLElement | null>(null);

onMounted(async () => {
  const response = await apiInstance.get<{
    moods: string[];
  }>('mood/list', true);

  availableMoods.value = response!.moods;
  console.log(response?.moods);
});

const pickMood = (mood: string) => {
  const element = document.getElementById(mood);
  if (element) {
    element.classList.add('bg-black/20');
    if (lastPickedElement.value) {
      lastPickedElement.value.classList.remove('bg-black/20');
    }
    lastPickedElement.value = element;
  }
  chosenMood.value = mood;
};

const addMood = async () => {
  const response = await apiInstance.post('mood', true, {
    mood: chosenMood.value,
  });
  if (response) {
    showToast('Mood added successfully', TYPE.SUCCESS);
    emit('closeModal');
  }
};
</script>
