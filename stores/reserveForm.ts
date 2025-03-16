import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { usePetsCategoryStore } from '@/stores/petsCategory';

interface iTimeSlot {
  key: string;
  value: string;
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
    type: Yup.number().required('請選擇寵物類別。'),
    name: Yup.string().required('請輸入寶貝名字。')
  }),
  bathId: Yup.number().nullable().notRequired()
});

export const useReserveFormStore = defineStore('reserveForm', () => {
  // petsCategoryStore
  const petsCategoryStore = usePetsCategoryStore();
  const { selectedId: petTypeId } = toRefs(petsCategoryStore);

  const initialValues = {
    timePeriodStart: '',
    isTimePeriodValid: false,
    isBeforeCutoffTimeValid: false,
    user: {
      name: '',
      phone: ''
    },
    pet: {
      type: petTypeId.value,
      name: ''
    },
    bathId: null as number | null
  };

  const { values, errors, defineField, validateField, handleSubmit, resetForm } = useForm({
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
  function setSelectedTimePeriod(data: iTimeSlot[]){
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

  const submit = handleSubmit((values) => {
    // send values to API
    console.log('Submit', JSON.stringify(values, null, 2));
  });

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
    submit,
    setSelectedTimePeriod,
    selectedTimePeriod
  };
});
