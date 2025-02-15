<script setup lang="ts">
useSeoMeta({
  title: 'Pawzzle Studio 美容服務'
});

const routes = useRoute();

// pinia
const servicesStore = useServicesStore();
const { services, bathProducts } = storeToRefs(servicesStore);
const { getServiceById } = servicesStore;
const pageService = computed(() => getServiceById(Number(routes.params.id)));

const reserveStore = useReserveFormStore();
const { selectedDate, timePeriodStart, isTimePeriodValid, isBeforeCutoffTimeValid, errors, values } = storeToRefs(reserveStore);
const { submit } = reserveStore;

// 若輸入錯誤id，則導向id=1
onMounted(() => {
  if (!pageService.value) navigateTo('/product/1', { replace: true });
});
</script>

<template>
  <div v-if="pageService" class="product-page max-page-width">
    <ProductServiceBlock
      :services="services"
      :page-service="pageService"
      :bath-products="bathProducts"
    />
    <section class="reserve-form-section">
      <div class="left">
        values: {{ values }}<br>
        errors: {{ errors }}
      </div>
      <div class="right">
        <h6 class="m-0 sub-title">
          <nuxt-icon name="clock" class="clock-icon" filled /> 預約日期與時段
        </h6>
        <CommonCalendar v-model="selectedDate" />
        <ProductTimePeriodsBlock
          v-model:time-period-start="timePeriodStart"
          v-model:is-time-period-valid="isTimePeriodValid"
          v-model:is-before-cutoff-time-valid="isBeforeCutoffTimeValid"
          :service-time="pageService.time"
        />
      </div>
      <div class="footer">
        <q-btn unelevated class="submit-btn" @click="submit"> 送出訂單 </q-btn>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.product-page {
  .reserve-form-section {
    background-color: var(--secondary-color);
    color: white;
    fill: white;
    border-radius: 15px;
    padding: 30px;
    margin: 30px 0 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .footer {
      grid-column: span 2;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid white;
      padding-top: 15px;
      .submit-btn {
        width: 50%;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        font-size: 1.125rem;
        letter-spacing: 2px;
        border-radius: 10px;
      }
    }
    h6 {
      letter-spacing: 2px;
      font-weight: 500;
      &.sub-title {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
