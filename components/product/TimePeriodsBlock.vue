<script setup lang="ts">
import dayjs from 'dayjs';

const props = defineProps<{
  serviceTime: number;
  selectedDate: string;
}>();

const emit = defineEmits(['timeValid']);
const timePeriodStart = defineModel('timePeriodStart', { type: String });
const isTimePeriodValid = defineModel('isTimePeriodValid', { type: Boolean });
const isBeforeCutoffTimeValid = defineModel('isBeforeCutoffTimeValid', { type: Boolean });

// 整日時段
const timeSlots = generateTimeSlots('9:00', '17:30', 30);

// 取得日期可使用的時間，偵測selectedDate
const { data: dailyTimeSlotsData } = useApi(
  () => `/dailyTimeSlots?user_id=3&date=${props.selectedDate}`,
  {
    transform: (dailyTimeSlotsData: Record<string, any>) => {
      const dateKey = Object.keys(dailyTimeSlotsData)[0];
      const entries = Object.entries(dailyTimeSlotsData[dateKey]);
      return entries.map(([key, value]) => ({
        key,
        value: (value as string).slice(0, -3) // Remove the last 3 characters ":00"
      }));
    }
  }
);

// 禁止時段
const disabledTimes = computed<string[]>(() => {
  const isSelectedToday = props.selectedDate === formatDate(new Date());
  const currentTime = new Date().getHours() * 60 + new Date().getMinutes(); // 轉換為分鐘

  return timeSlots.filter((time) => {
    const isBooked = !dailyTimeSlotsData.value?.some((item) => item.value === time);
    if (isBooked) return true; // 不可用時段

    if(isSelectedToday){ // 選到今天
      // 轉換 timeSlots 為分鐘（例如 "09:00" => 540）
      const [hours, minutes] = time.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;
      return timeInMinutes <= currentTime; // 禁用當前時間之前的時段
    }

    return false;
  });
});

// 耗時計算
const keepTimes = computed(() => {
  const timePeriodEnd = calculateEndTime(timePeriodStart.value as string, props.serviceTime);
  const keepTimePeriods = generateTimeSlots(
    timePeriodStart.value,
    timePeriodEnd,
    30
  );
  keepTimePeriods.pop(); // 要扣除完成時間
  return keepTimePeriods;
});

// 判斷時段是否有效
const timesValidFunctions = {
  // 檢查時間是否不在 disabledTimes 內
  notInDisabledTimes: (times: string[]): boolean => {
    return times.every(
      (time) => !disabledTimes.value.some((item) => item === time)
    );
  },
  // 檢查時間是否小於 打烊時間
  withinCutoffTime: (times: string[], cutoffTime = '18:00'): boolean => {
    return times.every((time) =>
      dayjs(time, 'HH:mm').isBefore(dayjs(cutoffTime, 'HH:mm'))
    );
  }
};

// 驗證規則: 選擇時段、日期變換(disabledTimes)時
const { setSelectedTimePeriod } = useReserveFormStore();

watch([() => keepTimes.value, () => disabledTimes.value.length],
    ([newKeepTimes]) => {
        isTimePeriodValid.value = timesValidFunctions.notInDisabledTimes(newKeepTimes);
        isBeforeCutoffTimeValid.value = timesValidFunctions.withinCutoffTime(newKeepTimes);

        // api的時段 + key, 存進store
        const selectedTimePeriod = dailyTimeSlotsData.value?.filter((item) => newKeepTimes.includes(item.value)) || [];
        setSelectedTimePeriod(selectedTimePeriod);

        emit('timeValid');
    },
    {immediate: true}
);
</script>

<template>
  <section class="time-periods-block">
    <label
      v-for="timeSlot in timeSlots"
      :key="`time_slot_${timeSlot}`"
      :for="timeSlot"
      class="check-box"
      :class="[
        {
          disabled: disabledTimes.includes(timeSlot),
          active: keepTimes.includes(timeSlot)
        },
      ]"
    >
      <input
        :id="timeSlot"
        v-model="timePeriodStart"
        type="radio"
        name="timePeriods"
        :value="timeSlot"
        :disabled="disabledTimes.includes(timeSlot)"
      >
      {{ timeSlot }}
    </label>
  </section>
</template>

<style scoped lang="scss">
.time-periods-block {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px 0;

  .check-box {
    width: calc((100% / 6) - 25px);
    min-width: 75px;
    @include set-rwd(md) {
      width: calc(20% - 10px);
    }
    @include set-rwd(xs) {
      width: calc((100% / 3) - 10px);
    }
  }
}
</style>
