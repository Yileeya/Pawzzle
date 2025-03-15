import DialogComponent from '@/components/common/Dialog.vue';
import { Dialog } from 'quasar';

interface ApiErrorResponse {
  status: boolean;
  message: string[];
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  const api = $fetch.create({
    baseURL: config.public.apiUrl as string,
    onRequest({ request, options, error }) {
      const token = useCookie('token');
      if (token) {
        options.headers.set('Authorization', `Bearer ${token.value}`);
      }
    },
    onResponse({ response }) {
      // 拿取 data 層級的資料，若沒有則直接回傳原始資料
      if (response._data && response._data.data) {
        response._data = response._data.data;
      }
      return response._data;
    },
    async onResponseError(response) {
      const data = response.response._data;

      let status = false;
      let message: string[] = ['出現未知錯誤，請聯繫管理員。'];

      status = data.status !== 'fail';
      if (data.message)
        message = Array.isArray(data.message) ? data.message : [data.message];

      Dialog.create({
        component: DialogComponent,
        componentProps: {
          mode: 'error',
          content: message
        }
      });

      throw { status, message } as ApiErrorResponse;
    }
  }) as typeof $fetch;

  return {
    provide: {
      api
    }
  };
});
