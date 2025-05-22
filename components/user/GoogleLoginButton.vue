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
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse
    });

    window.google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        {
          theme: 'outline', // 或 filled_blue, filled_black
          size: 'large', // small, medium, large
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
.login-btn {
  background: var(--primary-light-hover-color);
  color: var(--secondary-color);
  font-size: 1rem;
  border-radius: 10px;
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  .nuxt-icon {
    transform: scale(1.5) translateY(1px);
  }

  &:after {
    content: '使用 Google 登入';
  }

  @include set-rwd(sm) {
    &:after {
      content: '登入';
    }
  }
}
</style>