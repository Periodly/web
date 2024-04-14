<template>
  <div
    class="h-screen w-screen gap-5 flex justify-center items-center bg-[url('../assets/bg-gradient.png')] bg-cover"
  >
    <div class="flex flex-col gap-5">
      <UserInfo />
      <FriendList :friendList="friendList" />
    </div>
    <MoodList :moodList="moodList" @add-mood="showModal" />
  </div>
  <AddMoodModal v-if="show" @close-modal="showModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserInfo from '@/components/UserInfo.vue';
import FriendList from '@/components/FriendList.vue';
import type Mood from '@/models/mood.model';
import MoodList from '@/components/MoodList.vue';
import AddMoodModal from '@/components/AddMoodModal.vue';

const friendList = ref<string[] | undefined>([]);
const moodList = ref<Mood[] | undefined>([]);
const show = ref(false);

const showModal = async () => {
  show.value = !show.value;
};
</script>
