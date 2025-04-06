<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import type { IPet } from '@/stores/user';
import { Notify } from 'quasar';

const show = defineModel({ required: true, type: Boolean });

const { rowPetData = null } = defineProps<{
  rowPetData: IPet | null;
}>();

//#region 驗證規則 vee-validate
type IPetForm = Omit<IPet, 'id'>;
const schema = Yup.object({
  name: Yup.string().required('請輸入名字。'),
  pet_type_id: Yup.number().required('請選擇種類').moreThan(0, '請選擇種類'),
  gender: Yup.string().required('請選擇性別'),
  birth_date: Yup.string().required('請選擇生日'),
  weight: Yup.string()
    .required('重量必須大於 0')
    .matches(/^\d+(\.\d{1,2})?$/, '重量必須大於 0，且小數位數不得超過 2 位')
    .test('is-greater-than-zero', '重量必須大於 0', (value) => {
      const num = parseFloat(value || '0');
      return !isNaN(num) && num > 0;
    }),
  is_default: Yup.number()
    .oneOf([0, 1], '請選擇是否為預設寵物')
    .required('請選擇是否為預設寵物')
});

const initPetData: IPetForm = {
  name: '',
  pet_type_id: 0,
  gender: '',
  birth_date: '',
  weight: '',
  is_default: 0
};
const {
  values: petData,
  errors,
  resetForm,
  validate,
  defineField
} = useForm<IPetForm>({
  validationSchema: schema,
  initialValues: initPetData
});

const [name, nameAttrs] = defineField('name');
const [pet_type_id, pet_type_id_Attrs] = defineField('pet_type_id');
const [gender, genderAttrs] = defineField('gender');
const [birth_date, birth_date_Attrs] = defineField('birth_date');
const [weight, weightAttrs] = defineField('weight');
const [is_default] = defineField('is_default');

function resetFormData(newVal: IPetForm) {
  const { name, pet_type_id, gender, birth_date, weight, is_default } = newVal;
  resetForm({
    values: { name, pet_type_id, gender, birth_date, weight, is_default },
    errors: {}
  });
}
//#endregion

const disabledDates = (date: string): boolean => {
  // 不可選擇未來日期
  return date <= formatDate(new Date(), 'YYYY/MM/DD');
};

// 帶入資料
watch(
  () => show.value,
  (newVal) => {
    resetFormData(newVal && rowPetData ? rowPetData : initPetData);
  }
);

//#region 送出
const { $api } = useNuxtApp();
const submitting = ref<boolean>(false);

const { updateUserPet } = useUserStore();

async function save() {
  const { valid } = await validate();
  if (!valid) return;

  submitting.value = true;
  const method = rowPetData ? 'PUT' : 'POST';
  const url = rowPetData ? `/pets/${rowPetData.id}` : '/pets';

  await $api<IPet>(`${url}`, {
    method: method,
    body: petData
  }).then((res) => {
    Notify.create({
      message: `${rowPetData ? '儲存' : '新增'}成功！`
    });
    updateUserPet(res);
    show.value = false;
  }).finally(() => {
    submitting.value = false;
  });
}
//#endregion
</script>

<template>
  <q-dialog
    v-model="show"
    class="user-pet-modal"
    no-backdrop-dismiss
    no-esc-dismiss
  >
    <div class="container">
      <q-btn
        v-close-popup
        class="close-btn"
        :disable="submitting"
        icon="close"
        flat
        round
        dense
      />
      <h6 class="m-0">{{ rowPetData ? "編輯" : "新增" }}寶貝資料</h6>
      <div class="form-block">
        <q-input
          v-model="name"
          v-bind="nameAttrs"
          label="名字"
          stack-label
          placeholder="請輸入名字"
          color="secondary"
          :dense="false"
          :error="!!errors.name"
        />
        <CommonPetCategorySelect
          v-model="pet_type_id"
          v-bind="pet_type_id_Attrs"
          :is-async-store="false"
          stack-label
          label="種類"
          color="secondary"
          :error="!!errors.pet_type_id"
          class="user-pet-category-select"
        />
        <CommonGenderSelect
          v-model="gender"
          v-bind="genderAttrs"
          stack-label
          color="secondary"
          :error="!!errors.gender"
        />
        <CommonDatePicker
          v-model="birth_date"
          v-bind="birth_date_Attrs"
          label="生日"
          stack-label
          placeholder="請選擇生日"
          color="secondary"
          :error="!!errors.birth_date"
          :format-date="disabledDates"
        />
        <q-input
          v-model="weight"
          v-bind="weightAttrs"
          label="重量(kg)"
          :dense="false"
          stack-label
          color="secondary"
          placeholder="請輸入重量"
          :error="!!errors.weight"
          :error-message="errors.weight"
        />
        <div v-if="rowPetData" class="toggle-box">
          <label>設為預設</label>
          <q-toggle v-model="is_default" :true-value="1" :false-value="0" />
        </div>
      </div>
      <q-btn
        class="submit-btn float-right"
        color="secondary"
        :ripple="false"
        unelevated
        label="送出"
        :disable="submitting"
        @click="save()"
      />
    </div>
  </q-dialog>
</template>

<style scoped lang="scss">
.user-pet-modal {
  .container {
    position: relative;
    padding: 15px;
    background: white;
    width: 450px;
    h6 {
      margin-bottom: 10px;
    }
    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
    }
    .toggle-box {
      display: flex;
      align-items: center;
    }
    :deep(.el-select .q-field__control:hover:before) {
      border-color: #000;
    }
    :deep(.q-field__marginal) {
      height: 60px;
    }
    :deep(.q-field__label.ellipsis) {
      overflow: initial;
    }
  }
}
:deep(.user-pet-category-select) {
  .q-field__control:hover:before {
    border-color: #000 !important;
  }
  .q-field__control-container {
    padding-bottom: 8px !important;
  }
  .q-field__marginal {
    height: 56px !important;
  }
}
</style>
