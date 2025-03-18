<script setup lang="ts">
const { error } = defineProps<{ error: { statusCode?: number; message?: string } }>();

const handleRetry = () => {
  navigateTo('/');
};

const token = useCookie('token');
onMounted(() => {
  if (error.statusCode === 401) {
    token.value = '';
  }
});
</script>
<template>
  <div class="error-page flex-center">
    <div class="max-page-width content-block">
      <div class="text-center">
        <nuxt-icon name="logo" filled class="logo"/>
      </div>
      <p v-if="error?.statusCode === 401">登入逾時，請重新登入！</p>
      <p v-else>發生了一些未知錯誤，請聯繫管理員。</p>
      <q-btn
        color="secondary" unelevated dense
        ripple class="back-btn"
        label="返回首頁" @click="handleRetry"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  position: relative;
  background-color: var(--primary-color);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;
    top: 20px;
    right: 0;
    width: 30%;
    height: 50%;
    background-image: url('/images/footer-bg.svg');
    background-repeat: no-repeat;
  }

  .content-block {
    position: relative;
    background: #ffffff69;
    z-index: 2;
    padding: 60px 30px 30px;
    border-radius: 30px;
    display: grid;
    justify-items: center;
    align-content: space-between;
    min-height: 380px;
    min-width: 600px;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.1);

    :deep(.logo svg) {
      width: fit-content;
      height: 45px;
      margin-bottom: 30px;
      fill: var(--secondary-dark-color);
    }

    p {
      font-size: 2rem;
    }

    .back-btn {
      width: 100%;
      font-size: 1.25rem;
      margin-top: 15px;
      border-radius: 10px;
      height: 55px;
    }
  }

  @include set-rwd(sm) {
    &:before {
      width: 100%;
    }

    .content-block {
      min-width: auto;
      width: 95%;
      min-height: 300px;

      :deep(.logo svg) {
        width: 100%;
      }
    }
  }
}
</style>
