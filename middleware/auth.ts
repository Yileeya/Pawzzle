import { Notify } from 'quasar';

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('token');

  // 沒有token，回首頁
  if (!token.value) {
    if (import.meta.client) {
      Notify.create({
        message: '請先登入！',
        type: 'negative'
      });
    }
    return navigateTo('/');
  }
});
