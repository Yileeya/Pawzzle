<script setup lang="ts">
const config = useRuntimeConfig();

const { googleLogin } = useUserStore();

const clientId = config.public.googleClientId;
const scope = encodeURIComponent('openid email profile');
const redirectUri = computed(() => {
  if (import.meta.client) {
    return `${window.location.origin}/oauth-callback.html`;
  }
  return '';
});

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri.value)}&scope=${scope}&response_type=code&access_type=offline&include_granted_scopes=true`;

function loginWithGoogle() {
  const popup = window.open(authUrl, 'google_oauth', 'width=500,height=600');

  window.addEventListener('message', async (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data.type === 'oauth_code') {
      const code = event.data.code;
      popup?.close();

      await googleLogin(code, redirectUri.value);
    }
  }, { once: true });
}
</script>

<template>
  <q-btn
    class="login-btn"
    flat
    unelevated
    :ripple="false"
    @click="loginWithGoogle"
  >
    <nuxt-icon name="google" filled/>
  </q-btn>
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