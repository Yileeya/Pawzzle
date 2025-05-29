export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('token');

  // 後台登入後不得再回到登入頁
  if (token.value) {
    return navigateTo('/');
  }
});