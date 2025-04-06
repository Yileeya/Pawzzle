<script setup lang="ts">
const date = defineModel({ required: true, type: String });

interface Props {
  minYearMonth?: string;
  maxYearMonth?: string;
  formatDate?: (date: string) => boolean; // 日期disabled等設定條件
}
const { minYearMonth = '2020/01', maxYearMonth = '2050/01' } = defineProps<Props>();

const locale = {
  days: ['日', '一', '二', '三', '四', '五', '六'],
  daysShort: ['日', '一', '二', '三', '四', '五', '六'],
  months: ['一月', '二月','三月','四月','五月','六月','七月','八月','九月', '十月','十一月','十二月'],
  monthsShort: ['一月', '二月','三月','四月','五月','六月', '七月', '八月', '九月','十月', '十一月', '十二月']
};
</script>

<template>
  <q-input
    v-model="date"
    mask="date"
    :rules="['date']"
    readonly
    class="el-date-picker-input"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            v-model="date"
            minimal
            :locale="locale"
            text-color="black"
            class="el-date-picker"
            :navigation-min-year-month="minYearMonth"
            :navigation-max-year-month="maxYearMonth"
            :options="formatDate"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="關閉" color="secondary" unelevated />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<style lang="scss">
.el-date-picker-input.q-field--readonly {
  .q-field__control:before {
    border-bottom-style: solid;
  }
}
.el-date-picker {
  .bg-primary.q-date__today {
    box-shadow: none;
  }
  .q-ripple {
    display: none !important;
  }
}
</style>
