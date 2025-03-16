<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
import type { IBathProduct } from '@/stores/services';

useSeoMeta({
  title: 'Pawzzle Studio 美容服務'
});

const routes = useRoute();

// pinia
const servicesStore = useServicesStore();
const { services, bathProducts } = storeToRefs(servicesStore);
const { getServiceById } = servicesStore;
const pageService = computed(() => getServiceById(Number(routes.params.id)));

const petsCategoryStore = usePetsCategoryStore();
const { selectedPet } = storeToRefs(petsCategoryStore);

const reserveStore = useReserveFormStore();
const {
  selectedDate,
  timePeriodStart,
  isTimePeriodValid,
  isBeforeCutoffTimeValid,
  bathId,
  errors
} = storeToRefs(reserveStore);
const { validateTimes, clearAllErrorMsg, validate, submit } = reserveStore;

// 預約日期時段顯示
const dateAndTimes = computed(() => {
  if (!timePeriodStart.value) return `${selectedDate.value}`;

  const endTime = calculateEndTime(
    timePeriodStart.value,
    pageService.value.time
  );
  const timeSlot = endTime ? `${timePeriodStart.value} - ${endTime}` : '';
  return `${selectedDate.value}   ${timeSlot}`;
});

// 加值選購
const selectedBathProduct = ref<IBathProduct | null>(null);
function handleBathProductClick(bathItem: IBathProduct) {
  if (selectedBathProduct.value?.id === bathItem.id) {
    selectedBathProduct.value = null;
  } else {
    selectedBathProduct.value = bathItem;
  }
  bathId.value = selectedBathProduct.value?.id ?? null;
}

// 價格計算
function priceCalculation(type: 'default' | 'total'): number {
  const defaultPrice = pageService.value.price + (selectedPet.value?.extra_price[pageService.value.id] || 0);

  if (type === 'total') return defaultPrice + (selectedBathProduct.value?.price || 0);
  else return defaultPrice;
}

// 送出按鈕
const $q = useQuasar();
const sending = ref(false);
async function clickSubmit() {
  const { valid } = await validate();
  if (!valid) return;

  sending.value = true;
  const result = await submit(pageService.value.id, priceCalculation('total'));
  if (result.type === 'success') {
    $q.dialog({
      component: Dialog,
      componentProps: {
        mode: 'success',
        content: result.message
      }
    }).onDismiss(() => {
      navigateTo('/');
    });
  }
  sending.value = false;
}

// 若輸入錯誤id，則導向id=1
onMounted(() => {
  if (!pageService.value.id) navigateTo('/product/1', { replace: true });
  clearAllErrorMsg();
  validateTimes();
});
</script>

<template>
  <div class="product-page max-page-width">
    <ProductServiceBlock
      :services="services"
      :page-service="pageService"
      :bath-products="bathProducts"
    />
    <section class="reserve-form-section">
      <nuxt-icon
        :name="pageService.name"
        class="bg-icon no-slide"
        :class="{ large: pageService.name === 'both' }"
        filled
      />
      <div class="left">
        <ProductBasicForm />
        <div class="form-group">
          <h6 class="m-0 sub-title">
            <nuxt-icon name="puzzle-piece" class="puzzle-icon" filled />預約內容
          </h6>
          <div class="input-group">
            <label>預約時段</label>
            <q-input
              :model-value="dateAndTimes"
              :error="
                !!errors['timePeriodStart'] ||
                  !!errors['isTimePeriodValid'] ||
                  !!errors['isBeforeCutoffTimeValid']
              "
              :error-message="
                errors['timePeriodStart'] ||
                  errors['isTimePeriodValid'] ||
                  errors['isBeforeCutoffTimeValid']
              "
              hide-bottom-space
              outlined
              dense
              rounded
              readonly
            />
          </div>
          <div class="input-group">
            <label>預約內容</label>
            <q-input
              :model-value="pageService.display_name"
              hide-bottom-space
              outlined
              dense
              rounded
              readonly
            />
          </div>
        </div>
        <ProductBathBlock
          v-if="pageService.has_bath_products"
          :bath-products="bathProducts"
          :selected-id="bathId"
          @update="handleBathProductClick"
        />
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
          :selected-date="selectedDate"
          @time-valid="validateTimes"
        />
      </div>
      <div class="footer">
        <div class="price-block">
          <div class="detail">
            <span class="h4 number-text">
              {{ foramtCurrency(priceCalculation("default")) }}
            </span>
            <span v-show="selectedBathProduct?.price" class="h6 number-text">
              +{{ selectedBathProduct?.price }}
            </span>
          </div>
          <div class="total">
            總計
            <span class="h4 number-text">
              NT
              {{ foramtCurrency(priceCalculation("total")) }}
            </span>
          </div>
        </div>
        <q-btn unelevated class="submit-btn" @click.prevent="clickSubmit">
          送出訂單
        </q-btn>
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
    row-gap: 10px;
    column-gap: 40px;
    position: relative;
    .footer {
      grid-column: span 2;
      display: flex;
      column-gap: 40px;
      row-gap: 15px;
      border-top: 1px solid white;
      padding-top: 15px;
      .price-block,
      .submit-btn {
        flex: 1 1 50%;
      }
      .price-block {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 1.25rem;
        .number-text {
          letter-spacing: 3px;
        }
        .h4 {
          font-size: 2rem;
        }
        .h6 {
          color: var(--primary-color);
          padding: 0 2px;
        }
        .total .h4 {
          padding-left: 5px;
        }
      }
      .submit-btn {
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
      .puzzle-icon {
        margin-right: 10px;
        svg {
          transform: rotate(270deg) translateX(2px);
        }
      }
      &.sub-title {
        margin-bottom: 10px;
      }
    }
    .form-group {
      margin: 30px 0;
    }
    .input-group {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 10px;
      label:first-child {
        flex: 0 0 90px;
      }
      .q-input {
        flex: 1;
      }
      :deep(.pet-category-select) {
        flex: 0 0 210px;
      }
    }
    .check-box {
      color: white;
      border-radius: 15px;
      border: 1px solid;
      padding: 5px 15px;
      cursor: pointer;
      text-align: center;

      input[type="radio"] {
        display: none;
      }

      &.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      &.active,
      &:not(.disabled):hover {
        background-color: var(--primary-dark-hover-color);
        color: var(--secondary-color);
      }

      &.active {
        &:not(.disabled):hover {
          opacity: 0.9;
        }
        &.disabled {
          background-color: var(--gray-color);
        }
      }
    }
    .bg-icon {
      position: absolute;
      fill: var(--primary-hover-color);
      left: calc(250px + 50vw);
      top: -50%;
      z-index: -1;
      svg {
        height: 100%;
        width: 500px;
      }
      &.large {
        left: 50vw;
        svg {
          width: 800px;
        }
      }
    }
  }
  @include set-rwd(md) {
    .reserve-form-section {
      display: flex;
      flex-direction: column;
      .right {
        order: 1;
      }
      .left {
        order: 2;
      }
      .footer {
        order: 3;
        flex-wrap: wrap;
      }
      .bg-icon {
        display: none;
      }
    }
  }
  @include set-rwd(xs) {
    .reserve-form-section {
      padding: 15px 10px;
      .detail {
        display: none;
      }
      .input-group {
        flex-direction: column;
        label:first-child {
          flex: 1;
        }
        .q-input,
        .pet-category-select {
          width: 100%;
          .q-field__control {
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
