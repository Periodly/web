import './assets/main.css';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import type { PluginOptions } from 'vue-toastification';
import Toast, { POSITION } from 'vue-toastification';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const toastOptions: PluginOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: true,
  icon: true,
};

app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);

app.mount('#app');
