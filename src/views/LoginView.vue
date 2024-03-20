<template>
  <div
    class="h-screen w-screen flex justify-center items-center bg-[url('../assets/bg-2.jpg')] bg-center bg-cover"
  >
    <form
      @submit.prevent="login"
      class="flex flex-col gap-3 bg-white/30 p-5 rounded-2xl backdrop-blur-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
    >
      <h1 class="text-2xl font-semibold">
        {{ isLogin ? 'Witaj z powrotem!' : 'Stwórz swój profil' }}
      </h1>
      <div class="flex flex-col gap-1">
        <label for="username">Nazwa użytkownika</label>
        <input
          class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
          type="text"
          v-model="username"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="password">Hasło</label>
        <input
          class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
          type="password"
          v-model="password"
        />
      </div>
      <div v-if="!isLogin" class="flex flex-col gap-1">
        <label for="password">Powtórz hasło</label>
        <input
          class="rounded py-1 px-2 bg-white/50 focus:border-0 focus:outline-none active:bg-white/90 transition-colors duration-300 focus:ring-2 focus:ring-opacity-50"
          type="password"
          v-model="repeatedPassword"
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
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isLogin = ref(true);
const username = ref('');
const password = ref('');
const repeatedPassword = ref('');

const login = () => {
  // call to api
};

const register = () => {
  // call to api
};
</script>
