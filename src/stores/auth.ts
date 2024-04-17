import { defineStore } from 'pinia';
import { apiInstance } from '@/helpers/api';
import router from '@/router';
import { showToast } from '@/helpers/showToast';
import { TYPE } from 'vue-toastification';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: localStorage.getItem('auth') == 'true',
    token: '',
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.isAuth;
    },
    getToken: (state) => {
      return state.token;
    },
  },
  actions: {
    async login(username: string, password: string) {
      const response = await apiInstance.post<{
        token: string;
      }>('session/login', false, {
        username: username,
        password: password,
      });
      if (!response) return;
      this.isAuth = true;
      this.token = response.token;
      localStorage.setItem('auth', 'true');
      localStorage.setItem('token', response.token);
      await router.push('/');
    },
    async register(username: string, password: string, cycleLength: number, regularity: boolean, commonSymptom: string) {
      const response = await apiInstance.post<string>('user', false, {
        username,
        password,
        cycleLength,
        regularity,
        mostCommonSymptom: commonSymptom
      });
      if (!response) return;
      showToast('Zarejestrowano pomyślnie', TYPE.SUCCESS);
    },
    async logout() {
      this.isAuth = false;
      localStorage.setItem('auth', 'false');
      localStorage.removeItem('token');
      await router.push('/login');
    },
  },
});
