<script setup lang="ts">
import type { IUser } from '@/stores/user';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { Notify } from 'quasar';

// user pinia
const userStore = useUserStore();
const { userInfo, user } = storeToRefs(userStore);

const userColspans: { name: string; key: keyof IUser }[] = [
  {
    name: '姓名',
    key: 'name'
  },
  {
    name: '信箱',
    key: 'email'
  },
  {
    name: '聯絡電話',
    key: 'phone'
  }
];

const isEdit = ref<boolean>(false);

const schema = Yup.object({
  name: Yup.string().required('請輸入姓名。'),
  email: Yup.string(),
  phone: Yup.string()
    .transform((value) => (value === '' ? null : value)) // 空字串轉 null
    .nullable()
    .notRequired()
    .matches(/^09\d{8}$/, '手機號碼須以09開頭，且為10位數字。')
});

const {
  values: userData,
  errors,
  resetForm,
  validate,
  setFieldValue
} = useForm<IUser>({
  validationSchema: schema,
  initialValues: {
    name: '',
    phone: '',
    email: ''
  }
});

function setUserInfoInputValue() {
  isEdit.value = true;
  resetForm({
    values: {
      name: userInfo.value.name,
      phone: userInfo.value.phone,
      email: userInfo.value.email
    },
    errors: {}
  });
}

// 更新數值
const updateValue = (key: keyof IUser, value: string | number | null) => {
  setFieldValue(key as string, value);
};

// save
const { $api } = useNuxtApp();
const submitting = ref<boolean>(false);

async function save() {
  const { valid } = await validate();
  if (!valid) return;

  submitting.value = true;
  await $api<IUser>(`/users/${userInfo.value.id}`, {
    method: 'PUT',
    body: userData
  }).then((res) => {
    const { name, phone } = res;
    user.value.name = name;
    user.value.phone = phone;

    Notify.create({
      message: '儲存成功！'
    });
    isEdit.value = false;
  });
  submitting.value = false;
}
</script>

<template>
  <div class="user-information-view">
    <div class="row-title">
      <div>
        <nuxt-icon name="circle-user-solid" filled />
        個人資料
      </div>
      <q-btn
        v-if="!isEdit"
        unelevated
        :ripple="false"
        class="action-btn"
        label="編輯"
        @click="setUserInfoInputValue()"
      />
      <div v-else>
        <q-btn
          unelevated
          :ripple="false"
          color="secondary"
          class="action-btn"
          label="取消"
          :disable="submitting"
          @click="isEdit = false"
        />
        <q-btn
          unelevated
          :ripple="false"
          color="primary"
          class="action-btn save-btn"
          label="儲存"
          text-color="secondary"
          :disable="submitting"
          @click="save()"
        />
      </div>
    </div>
    <div class="grid-table user">
      <div v-for="tdCol in userColspans" :key="`tr_${tdCol.key}`" class="tr">
        <div>{{ tdCol.name }}</div>
        <div v-if="!isEdit">{{ userInfo[tdCol.key] || "-" }}</div>
        <div v-else>
          <q-input
            :model-value="userData[tdCol.key]"
            hide-bottom-space
            outlined
            dense
            type="text"
            :placeholder="tdCol.name"
            :readonly="tdCol.key === 'email'"
            :error="!!errors[tdCol.key]"
            :error-message="errors[tdCol.key]"
            @update:model-value="(newValue) => updateValue(tdCol.key, newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.q-field--readonly) .q-field__control::before {
  border: none;
}
.save-btn {
  margin-left: 5px;
}
</style>
