<script setup lang="ts">
const config = useRuntimeConfig();
const clientId = config.public.googleClientId;

const { googleLogin } = useUserStore();

const handleCredentialResponse = async (response: { credential: string; }) => {
  const idToken = response.credential;
  await googleLogin(idToken);
};

onMounted(() => {
  // 載入 Google Identity SDK
  // 判斷螢幕寬度
  const isSmallScreen = window.innerWidth <= 576;
  const size = isSmallScreen ? 'small' : 'large';

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse
    });

    window.google.accounts.id.prompt();

    window.google.accounts.id.renderButton(
      document.getElementById('g_id_signin'),
      {
        theme: 'outline', // 或 filled_blue, filled_black
        size: size, // small, medium, large
        shape: 'pill' // 或 rectangular, pill
      }
    );
  };
  document.head.appendChild(script);
});
</script>

<template>
  <div id="g_id_signin"></div>
</template>

<style lang="scss">
</style>