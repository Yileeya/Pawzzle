import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { usePetsCategoryStore } from '@/stores/petsCategory';
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
    phone: Yup.string().nullable().notRequired()
    // .required('手機號碼須以09開頭，且為10位數字。')
    // .matches(/^09\d{8}$/, '手機號碼須以09開頭，且為10位數字。')
  }),
  pet: Yup.object({
    type: Yup.number().required('請選擇寵物類別。'),
    name: Yup.string().required('請輸入寶貝名字。')
  }),
  bathId: Yup.number().nullable().notRequired()
});

export const useReserveFormStore = defineStore('reserveForm', () => {
  const { $api } = useNuxtApp();

  // petsCategoryStore
  const petsCategoryStore = usePetsCategoryStore();
  const { selectedId: petTypeId } = toRefs(petsCategoryStore);

  // userStore
  const userStore = useUserStore();
  const { user, userDefaultPet } = toRefs(userStore);

  const initialValues = {
    timePeriodStart: '',
    isTimePeriodValid: false,
    isBeforeCutoffTimeValid: false,
    user: {
      name: user.value.name,
      phone: user.value.phone
    },
    pet: {
      type: petTypeId.value,
      name: userDefaultPet.value.id ? userDefaultPet.value.name : ''
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
  const [petType] = defineField('pet.type');
  const [petName, petNameAttrs] = defineField('pet.name');

  // 加值服務
  const [bathId] = defineField('bathId');

  // 監聽寵物類別，同步賦值
  watch(
    () => petTypeId.value,
    (newVal) => {
      petType.value = newVal;
    }
  );

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

  async function submit(
    serviceId: number,
    price: number
  ): Promise<iReserveApiResult> {
    const form = {
      pet_id: userDefaultPet.value.id,
      service_id: serviceId,
      bath_product_id: bathId.value,
      price: price,
      pet_appointment_details: selectedTimePeriod.value.map((time) => time.key)
    };

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
    name,
    nameAttrs,
    phone,
    phoneAttrs,
    petName,
    petNameAttrs,
    bathId,
    errors,
    validateTimes,
    clearAllErrorMsg,
    validate,
    submit,
    setSelectedTimePeriod
  };
});
