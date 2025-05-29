<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  middleware: 'admin-redirect-if-authenticated'
});

const form = reactive<{
  email: string;
  password: string;
}>({
  email: '',
  password: ''
});

const { login, getUser } = useUserStore();
const sending = ref(false);

async function submit() {
  if (!(form.email && form.password)) return;
  sending.value = true;
  const isLoginSuccess = await login(form);
  if (isLoginSuccess) {
    await getUser();
    navigateTo('/member/order');
  }
  sending.value = false;
}
</script>

<template>
  <div class="admin-login-page flex-center">
    <div class="max-page-width content-block">
      <h3 class="m-t-0 text-center">管理員登入</h3>
      <div class="form-block">
        <q-input v-model="form.email" class="el-input" color="black" label="帳號"/>
        <q-input
          v-model="form.password"
          label="密碼"
          color="black"
          class="el-input"
        />
        <q-btn
          color="secondary" unelevated dense
          ripple class="login-btn"
          label="登入"
          :disable="sending || !(form.email && form.password)"
          @click="submit()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-login-page {
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
    min-height: 380px;
    min-width: 600px;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.1);

    .m-t-0 {
      margin-top: 0;
    }

    .form-block {
      display: flex;
      flex-direction: column;
      gap: 15px;

      :deep(.el-input) {
        .q-field {
          &__control {
            height: 70px;
          }

          &__label {
            font-size: 1.25rem;
          }

          &__native {
            padding-top: 35px;
            font-size: 1.125rem;
          }
        }
      }

      .login-btn {
        margin: 30px 0 15px;
        font-size: 1.25rem;
      }
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
    }
  }
}
</style>