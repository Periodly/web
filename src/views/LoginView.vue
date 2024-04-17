<template>
  <div
    class="h-screen w-screen flex justify-center items-center bg-[url('../assets/bg-2.jpg')] bg-center bg-cover"
  >
    <form
      @submit.prevent="formSubmit"
      class="flex gap-3 bg-white/30 p-5 rounded-2xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
    >
      <div class="flex flex-col gap-3">
        <h1 class="text-2xl font-semibold">
        {{ isLogin ? 'Witaj z powrotem!' : 'Stwórz swój profil' }}
        </h1>
        <div class="flex flex-col gap-1">
          <label for="username">Nazwa użytkownika</label>
          <input
            class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
            type="text"
            v-model="username"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password">Hasło</label>
          <input
            id="password"
            class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
            type="password"
            v-model="password"
            required
          />
        </div>
        <div v-if="!isLogin" class="flex flex-col gap-1">
          <label for="repeatedPassword">Powtórz hasło</label>
          <input
            id="repeatedPassword"
            class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
            type="password"
            v-model="repeatedPassword"
            required
          />
        </div>
        <div class="flex items-center gap-2">
          <button
            class="py-2 px-5 text-lg font-medium bg-white/50 hover:bg-white/70 active:bg-white/90 rounded-lg transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            type="submit"
          >
            {{ isLogin ? 'Zaloguj się' : 'Zarejestruj się' }}
          </button>
          <button class="py-2" type="button" @click="isLogin = !isLogin">
            lub {{ isLogin ? 'zarejestruj się' : 'zaloguj się' }}
          </button>
        </div>
      </div>
      <div v-if="!isLogin">
        <div class="flex flex-col gap-1">
          <label for="cycleLength">Średnia długość Twojego cyklu</label>
          <input
            id="cycleLength"
            class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
            type="number"
            v-model="cycleLength"
            min="1"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="regularity">Czy Twój cykl jest regularny?</label>
          <input
            id="regularity"
            class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
            type="checkbox"
            v-model="regularity"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="symptom">Najczęstszy symptom</label>
          <input
            id="symptom"
            class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
            type="text"
            v-model="commonSymptom"
            required
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const isLogin = ref(true);
const username = ref('');
const password = ref('');
const repeatedPassword = ref('');

const cycleLength = ref(0);
const regularity = ref(false);
const commonSymptom = ref("");

const formSubmit = async () => {
  if (isLogin.value) {
    await authStore.login(username.value, password.value);
  } else {
    if (password.value !== repeatedPassword.value) return;
    await authStore.register(username.value, password.value, cycleLength.value, regularity.value, commonSymptom.value);
  }
  username.value = '';
  password.value = '';
  repeatedPassword.value = '';
  cycleLength.value = 0;
  regularity.value = false;
  commonSymptom.value = '';
};
</script>
