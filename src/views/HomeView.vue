<template>
  <div
    class="h-screen w-screen gap-5 flex justify-center items-center bg-[url('../assets/bg-gradient.png')] bg-cover"
  >
    <div class="flex flex-col gap-5">
      <UserInfo />
      <FriendList :friendList="friendList" />
    </div>
    <MoodList :moodList="moodList" @add-mood="showMoodModal" />
  </div>
  <AddMoodModal v-if="showModal" @close-modal="showMoodModal" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiInstance } from '@/helpers/api';
import UserInfo from '@/components/UserInfo.vue';
import FriendList from '@/components/FriendList.vue';
import type Mood from '@/models/mood.model';
import MoodList from '@/components/MoodList.vue';
import AddMoodModal from '@/components/AddMoodModal.vue';

const friendList = ref<string[] | undefined>([]);
const moodList = ref<Mood[] | undefined>([]);
const showModal = ref(false);

const fetchMoods = async () => {
  const response = await apiInstance.get<{
    moods: Mood[];
  }>('mood', true);
  moodList.value = response!.moods;
};

onMounted(async () => {
  const friendsResponse = await apiInstance.get<{
    friends: string[];
  }>('friends', true);
  friendList.value = friendsResponse!.friends;

  await fetchMoods();
});

const showMoodModal = async () => {
  showModal.value = !showModal.value;
  await fetchMoods();
};
</script>
