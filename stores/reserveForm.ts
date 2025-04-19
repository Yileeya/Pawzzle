import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useUserStore } from '@/stores/user';

interface iTimeSlot {
  key: string;
  value: string;
}

interface iReserveApiResult {
  type: 'error' | 'success';
  message: string[];
}

const schema = Yup.object({
  timePeriodStart: Yup.string().required('請選擇時段。'),
  isTimePeriodValid: Yup.boolean()
    .oneOf([true], '包含已被預定時段，請選擇其他可用時段。')
    .required(),
  isBeforeCutoffTimeValid: Yup.boolean()
    .oneOf([true], '超過營業結束時間，請選擇較早的時段。')
    .required(),
  user: Yup.object({
    name: Yup.string().required('請輸入姓名。'),
    phone: Yup.string()
      .required('手機號碼須以09開頭，且為10位數字。')
      .matches(/^09\d{8}$/, '手機號碼須以09開頭，且為10位數字。')
  }),
  pet: Yup.object({
    // 新增時其他的欄位才是必填
    id: Yup.number().required('請選擇寵物。'),
    name: Yup.string().when('id', {
      is: -1,
      then: (schema) => schema.required('請輸入寶貝名字。'),
      otherwise: (schema) => schema.notRequired()
    }),
    pet_type_id: Yup.number().when('id', {
      is: -1,
      then: (schema) => schema.required('請選擇種類').moreThan(0, '請選擇種類'),
      otherwise: (schema) => schema.notRequired()
    }),
    gender: Yup.string().when('id', {
      is: -1,
      then: (schema) => schema.required('請選擇性別。'),
      otherwise: (schema) => schema.notRequired()
    })
  }),
  bathId: Yup.number().nullable().notRequired()
});

export const useReserveFormStore = defineStore('reserveForm', () => {
  const { $api } = useNuxtApp();

  // userStore
  const userStore = useUserStore();
  const { getUser } = userStore;
  const { userInfo } = toRefs(userStore);

  const initialValues = {
    timePeriodStart: '',
    isTimePeriodValid: false,
    isBeforeCutoffTimeValid: false,
    user: {
      name: '',
      phone: ''
    },
    pet: {
      id: 0,
      name: '',
      pet_type_id: 0,
      gender: ''
    },
    bathId: null as number | null
  };

  const { values, errors, defineField, validateField, resetForm, validate } =
    useForm({
      validationSchema: schema,
      initialValues: initialValues
    });

  // 日期與時段
  const selectedDate = ref<string>(formatDate(new Date()));
  const selectedTimePeriod = ref<iTimeSlot[]>([]);
  const [timePeriodStart] = defineField('timePeriodStart');
  const [isTimePeriodValid] = defineField('isTimePeriodValid');
  const [isBeforeCutoffTimeValid] = defineField('isBeforeCutoffTimeValid');

  // 使用者資訊
  const [name, nameAttrs] = defineField('user.name');
  const [phone, phoneAttrs] = defineField('user.phone');

  // pet
  const [petId, petIdAttrs] = defineField('pet.id');
  const [petName, petNameAttrs] = defineField('pet.name');
  const [petTypeId, petTypeIdAttrs] = defineField('pet.pet_type_id');
  const [petGender, petGenderAttrs] = defineField('pet.gender');

  // 加值服務
  const [bathId] = defineField('bathId');

  // 選擇的時段
  function setSelectedTimePeriod(data: iTimeSlot[]) {
    selectedTimePeriod.value = [...data];
  }

  // 立即驗證時段
  async function validateTimes() {
    await validateField('isTimePeriodValid');
    await validateField('isBeforeCutoffTimeValid');
  }

  async function clearAllErrorMsg() {
    resetForm({ values: values });
  }

  function resetInitFormData() {
    resetForm({ values: initialValues, errors: {} });
  }

  interface iSubmitForm {
    service_id: number;
    bath_product_id?: number | null;
    price: number;
    pet_appointment_details: string[];
    pet: {
      id?: number;
      name?: string;
      pet_type_id?: number;
      gender?: string;
    };
    name: string;
    phone: string;
  }

  async function submit(
    serviceId: number,
    price: number
  ): Promise<iReserveApiResult> {
    const form: iSubmitForm = {
      service_id: serviceId,
      bath_product_id: bathId.value,
      price: price,
      pet_appointment_details: selectedTimePeriod.value.map((time) => time.key),
      pet: {},
      name: name.value,
      phone: phone.value
    };

    if (values.pet.id === -1) { // 寵物新增
      const { id, ...petNewData } = values.pet;
      form.pet = { ...petNewData };
    } else {
      form.pet.id = values.pet.id;
    }

    const result: iReserveApiResult = {
      type: 'error',
      message: []
    };

    await $api('/appointments', {
      method: 'POST',
      body: form
    })
      .then(() => {
        result.type = 'success';
        result.message = ['新增成功！'];

        // 新增寵物、使用者資料變更：刷新使用者資料
        if (
          petId.value === -1 ||
          name.value !== userInfo.value.name ||
          phone.value !== userInfo.value.phone
        ) {
          getUser();
        }
        const resetFormData = {
          ...values,
          timePeriodStart: '',
          isTimePeriodValid: false,
          isBeforeCutoffTimeValid: false,
          bathId: null
        };
        if (petId.value === -1) {
          resetFormData.pet = { ...initialValues.pet };
        }
        resetForm({ values: resetFormData, errors: {} });
      })
      .catch((err) => {
        result.type = 'error';
        result.message = err.message;
      });
    return result;
  }

  return {
    selectedDate,
    timePeriodStart,
    isTimePeriodValid,
    isBeforeCutoffTimeValid,
    name, nameAttrs,
    phone, phoneAttrs,
    petId, petIdAttrs,
    petName, petNameAttrs,
    petTypeId, petTypeIdAttrs,
    petGender, petGenderAttrs,
    bathId,
    errors,
    validateTimes,
    clearAllErrorMsg,
    validate,
    submit,
    setSelectedTimePeriod,
    resetInitFormData
  };
});
