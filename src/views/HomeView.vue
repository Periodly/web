<template>
  <div
    class="h-screen w-screen gap-5 flex justify-center items-center bg-[url('../assets/bg-gradient.png')] bg-cover"
  >
    <div class="flex flex-col gap-5">
      <UserInfo @start-cycle="startNewCycle" />
      <FriendList :friendList="friendList" />
    </div>
    <PeriodInfo :period="periodCycleInfo!" :beastInfo="beastInfo!" />
  </div>
  <AddMoodModal v-if="show" @close-modal="showModal" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserInfo from '@/components/UserInfo.vue';
import FriendList from '@/components/FriendList.vue';
import AddMoodModal from '@/components/AddMoodModal.vue';
import { apiInstance } from '@/helpers/api';
import type { PeriodModel } from '@/models/period.model';
import type { BeastModel } from '@/models/beast.model';
import PeriodInfo from '@/components/PeriodInfo.vue';

const friendList = ref<string[]>([]);
const periodCycleInfo = ref<PeriodModel | undefined>(undefined);
const beastInfo = ref<BeastModel>({} as BeastModel);
const show = ref(false);

const showModal = async () => {
  show.value = !show.value;
};

onMounted(async () => {
  const friendsRes = await apiInstance.get<{
    friends: string[];
  }>('friends', true);
  friendList.value = friendsRes ? friendsRes.friends : [];

  const periodCycleRes = await apiInstance.get<
    PeriodModel
  >('period/current', true);
  console.log(periodCycleRes);
  periodCycleInfo.value = periodCycleRes ? periodCycleRes : {} as PeriodModel;

  const beastRes = await apiInstance.get<{ beast: BeastModel }>('friends/beast/status', true);
  beastInfo.value = beastRes ? beastRes.beast : {} as BeastModel;

  console.log(beastInfo.value);
  console.log(periodCycleInfo.value);
  console.log(friendList.value);
});

const startNewCycle = async () => {
  await apiInstance.post('period/new-cycle', true, {
    from: new Date().toISOString(),
  });
  const periodCycleRes = await apiInstance.get<
    PeriodModel
  >('period/current', true);
  periodCycleInfo.value = periodCycleRes ? periodCycleRes : {} as PeriodModel;
};
</script>
