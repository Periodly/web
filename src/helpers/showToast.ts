import { useToast } from 'vue-toastification';
import { TYPE } from 'vue-toastification';

const toast = useToast();

export const showToast = (message: string, type: TYPE) => {
  toast(message, {
    type,
  });
};
