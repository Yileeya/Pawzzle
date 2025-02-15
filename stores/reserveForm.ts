import { useForm } from 'vee-validate';
import * as Yup from 'yup';

const schema = Yup.object({
  timePeriodStart: Yup.string().required('請選擇時段。'),
  isTimePeriodValid: Yup.boolean()
    .oneOf([true], '包含已被預定時段，請選擇其他可用時段。')
    .required(),
  isBeforeCutoffTimeValid: Yup.boolean()
    .oneOf([true], '超過營業結束時間，請選擇較早的時段。')
    .required()
});

export const useReserveFormStore = defineStore('reserveForm', () => {
  const { values, errors, defineField, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      timePeriodStart: '',
      isTimePeriodValid: false,
      isBeforeCutoffTimeValid: false
    }
  });

  // 日期與時段
  const selectedDate = ref<string>(formatDate(new Date()));
  const [timePeriodStart] = defineField('timePeriodStart');
  const [isTimePeriodValid] = defineField('isTimePeriodValid');
  const [isBeforeCutoffTimeValid] = defineField('isBeforeCutoffTimeValid');

  const submit = handleSubmit((values) => {
    // send values to API
    console.log('Submit', JSON.stringify(values, null, 2));
  });

  return {
    selectedDate,
    timePeriodStart,
    isTimePeriodValid,
    isBeforeCutoffTimeValid,
    values,
    errors,
    submit
  };
});
