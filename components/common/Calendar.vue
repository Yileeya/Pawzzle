<script setup lang="ts">
const selectedDate = defineModel<string>({ default: formatDate() });

const curretMonth = ref<{ year: number; month: number }>({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
});

// 自訂語系
const myLocale = {
  /* starting with Sunday */
  daysShort: '日_一_二_三_四_五_六'.split('_'),
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_')
};

// 預設只可選擇今天後60天
function disabledBeforeToday(date: string) {
  return date >= formatDate() && date < adjustDate(formatDate(), 60);
}

// 切換日期，更新客製化標題
async function navigation(yearAndMonth: { year: number; month: number }) {
  curretMonth.value = { ...yearAndMonth };
}
</script>

<template>
  <q-date
    v-model="selectedDate"
    minimal
    class="calendar-inline"
    text-color="active"
    color="active"
    :locale="myLocale"
    :options="disabledBeforeToday"
    :navigation-min-year-month="formatDate(new Date(), 'YYYY/MM')"
    :navigation-max-year-month="adjustDate(new Date(), 60, 'YYYY/MM')"
    @navigation="navigation"
  >
    <div class="current-year-month-title">
      {{ curretMonth.year }} 年 {{ curretMonth.month }} 月
    </div>
  </q-date>
</template>

<style lang="scss"></style>
