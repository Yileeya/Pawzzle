<script setup lang="ts">
const model = defineModel({ required: true, type: Boolean });

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
    model.value = false;
  }
  sending.value = false;
}
</script>

<template>
  <q-dialog v-model="model" class="login-modal">
    <div class="container">
      <h6 class="m-0 text-center">登入</h6>
      <div class="form-block">
        <q-input v-model="form.email" label="帳號" stack-label :dense="false"/>
        <q-input
          v-model="form.password"
          label="密碼"
          stack-label
          :dense="false"
        />
      </div>
      <q-btn
        class="submit-btn"
        color="primary"
        :ripple="false"
        unelevated
        label="送出"
        :disable="sending || !(form.email && form.password)"
        @click="submit"
      />
    </div>
  </q-dialog>
</template>

<style scoped lang="scss">
.login-modal {
  .m-0 {
    margin: 0;
  }

  .container {
    padding: 15px;
    background: white;
    width: 450px;

    :deep(.form-block) {
      margin: 15px 0 30px;
      .q-field {
        margin-bottom: 15px;
        &__label {
          font-size: 1.125rem;
          padding-bottom: 10px;
        }
        &__control {
          color: var(--secondary-color);
        }
      }
    }

    .submit-btn {
      float: right;
      letter-spacing: 1px;
      width: 100%;
    }
  }
}
</style>
