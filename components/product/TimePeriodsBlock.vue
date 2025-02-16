<script setup lang="ts">
import dayjs from 'dayjs';

const { serviceTime = 30 } = defineProps<{
  serviceTime: number;
}>();
const emit = defineEmits(['timeValid']);
const timePeriodStart = defineModel('timePeriodStart', { type: String });
const isTimePeriodValid = defineModel('isTimePeriodValid', { type: Boolean });
const isBeforeCutoffTimeValid = defineModel('isBeforeCutoffTimeValid', { type: Boolean });

const timeSlots = generateTimeSlots('9:00', '17:30', 30);
const disabledTimes = ref<string[]>(['12:00', '12:30']);

// 耗時計算
const keepTimes = computed(() => {
  const timePeriodEnd = calculateEndTime(timePeriodStart.value as string, serviceTime);
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
    return times.every((time) => !disabledTimes.value.includes(time));
  },
  // 檢查時間是否小於 打烊時間
  withinCutoffTime: (times: string[], cutoffTime = '18:00'): boolean => {
    return times.every((time) =>
      dayjs(time, 'HH:mm').isBefore(dayjs(cutoffTime, 'HH:mm'))
    );
  }
};
watch(
  () => keepTimes.value,
  (newTimes) => {
    isTimePeriodValid.value = timesValidFunctions.notInDisabledTimes(newTimes);
    isBeforeCutoffTimeValid.value = timesValidFunctions.withinCutoffTime(newTimes);
    emit('timeValid');
  },
  { immediate: true }
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
