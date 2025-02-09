<script setup lang="ts">
import type { IService, IBathProduct } from '@/stores/services';

interface Props {
  service: IService;
  bathProducts: IBathProduct[];
  extraPrice: number;
}
const { extraPrice = 0 } = defineProps<Props>();

// 跳轉至產品頁
function goToProductPage(id: number) {
  navigateTo(`/product/${id}`);
}
</script>

<template>
  <div class="service-block">
    <div
      class="service-icon text-center basic-width"
      :class="[{ 'size-lg': service.name === 'both' }]"
    >
      <nuxt-icon :name="service.name" filled />
    </div>
    <div class="card-content">
      <div class="title">
        <h6>{{ service.display_name }}</h6>
        <span class="time gray-text">
          <nuxt-icon name="clock" filled />
          美容時間約{{ service.time }}分鐘
        </span>
      </div>
      <ul class="description-list">
        <li
          v-for="(item, idx) in service.describe"
          :key="`${service.name}_describe_${idx}`"
        >
          {{ item }}
        </li>
      </ul>
      <ul v-if="service.has_bath_products" class="tag-container-ul">
        <li
          v-for="bathProduct in bathProducts"
          :key="`${service.name}_bath_${bathProduct.id}`"
        >
          <div class="tag">
            {{ bathProduct.name }} <span>+{{ bathProduct.price }}</span>
          </div>
          <div class="text">{{ bathProduct.describe }}</div>
        </li>
      </ul>
    </div>
    <div class="reserve-block basic-width">
      <h5>{{ foramtCurrency(service.price + extraPrice) }}</h5>
      <q-btn
        unelevated
        class="reserve-btn"
        @click="goToProductPage(service.id)"
      >
        <div>馬上預約</div>
        <nuxt-icon name="arrow-right" filled class="arrow-right" />
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.service-block {
  border-radius: 10px;
  box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 15px 0;
  min-height: 200px;
  ul {
    margin: 0;
  }
  h5,
  h6 {
    margin: 0;
  }
  .gray-text {
    color: var(--gray-color);
  }
  .basic-width {
    width: 300px;
  }
  .service-icon {
    background-color: #ccc6c2;
    border-radius: 15px;
    :deep(.nuxt-icon svg) {
      width: 45%;
      height: 100%;
      fill: white;
    }
    &.size-lg :deep(.nuxt-icon svg) {
      width: 75%;
    }
  }
  .card-content {
    flex: 1;
    .title {
      display: flex;
      align-items: center;
      gap: 10px;
      h6 {
        letter-spacing: 3px;
        font-weight: 600;
      }
      .time {
        letter-spacing: 1px;
        :deep(.nuxt-icon svg) {
          fill: var(--gray-color);
        }
      }
    }
    .description-list {
      list-style-type: "＊";
      padding-left: 1rem;
      margin: 10px 0;
    }
  }
  .reserve-block {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 10px;
    h5 {
      letter-spacing: 3px;
      font-weight: 500;
      &::after {
        content: "起";
        margin: 0 5px;
      }
    }
    .reserve-btn {
      font-size: 1.125rem;
      width: 100%;
      letter-spacing: 2px;
      background-color: var(--primary-light-hover-color);
      border-radius: 10px;
      .arrow-right {
        width: 0;
        overflow: hidden;
        transition: width 0.3s ease-in-out;
        fill: var(--secondary-dark-color);
      }
      &:hover {
        background-color: var(--primary-color);
        color: var(--secondary-dark-color);
        .arrow-right {
          width: 20px;
        }
      }
    }
  }
  @include set-rwd(md) {
    .basic-width {
      width: 150px;
    }
  }
  @include set-rwd(sm) {
    flex-direction: column;
    .basic-width {
      width: 100%;
    }
    .service-icon {
      :deep(.nuxt-icon svg) {
        max-height: 75px;
        padding: 10px;
      }
    }
  }
}
</style>
