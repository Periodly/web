<template>
  <div
    class="h-screen w-screen gap-5 flex justify-center items-center bg-[url('../assets/bg-gradient.png')] bg-cover"
  >
    <div class="flex flex-col gap-5">
      <UserInfo />
      <FriendList :friendList="friendList" />
    </div>
    <MoodList :moodList="moodList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiInstance } from '@/helpers/api';
import UserInfo from '@/components/UserInfo.vue';
import FriendList from '@/components/FriendList.vue';
import type Mood from '@/models/mood.model';
import MoodList from '@/components/MoodList.vue';

const friendList = ref<string[]>([]);
const moodList = ref<Mood[]>([]);

onMounted(async () => {
  const friendsResponse = await apiInstance.get<{
    friends: string[];
  }>('friends', true);
  friendList.value = friendsResponse!.friends;

  const moodResponse = await apiInstance.get<{
    moods: Mood[];
  }>('mood', true);
  moodList.value = moodResponse!.moods;
});
</script>
