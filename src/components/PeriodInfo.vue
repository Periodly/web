<template>
  <div class="flex flex-col gap-2 bg-white/30 p-5 rounded-2xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
    <p class="text-xl font-medium">{{ period ? 'Dzień ' + getDayNumber(period?.periodCycleInfo.from) : 'Brak informacji' }}</p>
    <p class="text-lg">Przewidywany koniec: {{ period ? (new Date(period?.periodCycleInfo.predictedTo).toLocaleDateString()) : "Brak informacji" }}</p>

    <p
      class="text-lg font-medium "
      :class="{
        'bg-gradient-to-r to-[#FF3366] from-[#5e2ecd] inline-block text-transparent bg-clip-text': getPeriodCyclePhase(period?.periodCycleInfo.from) === getPeriodCyclePhase(beastInfo?.cycleDay) && period,
      }"
    >
      {{ getPeriodPhaseForBoth() }}
    </p>

    <div class="relative h-10 w-[30dvw] bg-white/30 rounded-xl">
      <div
        class="h-full bg-[#FF3366] rounded-l-xl"
        :style="{ width: `${period ? getCyclePercentage(period?.periodCycleInfo.from, period?.periodCycleInfo.predictedTo) : 0}%` }"
      />
      <div
        class="top-0 left-0 absolute h-10 bg-[#5e2ecd] rounded-l-xl opacity-50"
        :style="{ width: `${(beastInfo?.cycleDay / beastInfo?.cycleLength) * 100}%` }"
      />
    </div>
    <p
      v-if="getPeriodCyclePhase(period?.periodCycleInfo.from) === getPeriodCyclePhase(beastInfo?.cycleDay) && period"
    >
      <span class="font-bold text-[#FF3366]">Ty</span> i <span class="font-bold text-[#5e2ecd]">twoja bestia</span> jesteście zsynchronizowani
    </p>
  </div>
</template>

<script setup lang="ts">
import type { BeastModel } from '@/models/beast.model';
import type { PeriodModel } from '@/models/period.model';

const props = defineProps<{
  period: PeriodModel;
  beastInfo: BeastModel;
}>();

console.log(props.beastInfo);

const getDayNumber = (start: string) => {
  // count days from the start of the period
  const startDate = new Date(start);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getCyclePercentage = (start: string, end: string) => {
  const length = Math.ceil(Math.abs(new Date(start).getTime() - new Date(end).getTime()) / (1000 * 60 * 60 * 24));
  return Math.ceil((getDayNumber(start) / length) * 100);
};

const getPeriodCyclePhase = (start: string | number) => {
  const menstruationLength = 6;
  const ovulationLength = 5;
  const follicularLength = 14;

  let diffDays: number;
  if (typeof start === 'string') {
    const startDate = new Date(start);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else diffDays = start as number;

  if (diffDays <= menstruationLength) {
    return 'Menstruacja';
  } else if (diffDays <= follicularLength) {
    return 'Faza folikularna';
  } else if (diffDays <= follicularLength + ovulationLength) {
    return 'Owulacja';
  } else {
    return 'Faza lutealna';
  }
};

const getPeriodPhaseForBoth = () => {
  if (!props.period) return 'Brak informacji';
  const myPhase = getPeriodCyclePhase(props.period?.periodCycleInfo.from);
  if (props.beastInfo == {} as BeastModel) return myPhase
  const beastPhase = getPeriodCyclePhase(props.beastInfo?.cycleDay);

  if (myPhase === beastPhase) return myPhase;
  else return `${myPhase} i ${beastPhase}`;
};
</script>