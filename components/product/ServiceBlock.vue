<script setup lang="ts">
import type { IService, IBathProduct } from '@/stores/services';
interface Props {
  services: IService[];
  pageService: IService;
  bathProducts: IBathProduct[];
}
defineProps<Props>();

function replaceRoute(id: number) {
  const path = `/product/${id}`;
  navigateTo(path, { replace: true });
}
</script>

<template>
  <div class="service-block">
    <div class="tabs">
      <h6
        v-for="service in services"
        :key="`service_tab_${service.id}`"
        class="tab"
        :class="{ active: service.id === pageService.id }"
        @click="replaceRoute(service.id)"
      >
        {{ service.display_name }}
      </h6>
    </div>
    <div class="service-content">
      <div class="title"><nuxt-icon name="puzzle-piece" filled />服務內容</div>
      <div class="box">
        <div class="time">
          <nuxt-icon name="clock" filled />
          美容時間約{{ pageService.time }}分鐘
        </div>
        <ul>
          <li
            v-for="(describe, idx) in pageService.describe"
            :key="`${pageService.name}_describe_${idx}`"
          >
            {{ describe }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="pageService.has_bath_products === 1" class="bath-products">
      <div class="title"><nuxt-icon name="puzzle-piece" filled />加值服務</div>
      <ul class="tag-container-ul box">
        <li
          v-for="bathProduct in bathProducts"
          :key="`${pageService.name}_bath_${bathProduct.id}`"
        >
          <div class="tag">
            {{ bathProduct.name }} <span>+{{ bathProduct.price }}</span>
          </div>
          <div class="text">{{ bathProduct.description }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.service-block {
  .tabs {
    display: flex;
    margin-bottom: 4rem;
    .tab {
      border-radius: 0 0 30px 30px;
      padding: 0.5rem 4rem 1rem;
      background-color: #c1c1c1;
      color: white;
      margin: 0;
      letter-spacing: 2px;
      &.active {
        background-color: var(--primary-light-hover-color);
        color: var(--secondary-color);
      }
      &:hover:not(.active) {
        background-color: #afafaf;
        cursor: pointer;
      }
    }
  }
  .title {
    font-size: 1.25rem;
    font-weight: 500;
    :deep(.nuxt-icon) {
      fill: var(--secondary-color);
      svg {
        transform: rotate(270deg);
        margin-top: -5px;
        margin-right: 10px;
      }
    }
  }
  .box {
    border-left: 1px solid;
    padding: 0 15px;
    margin: 15px 0 30px;
    position: relative;
  }
  .service-content {
    .time {
      color: var(--gray-color);
      :deep(.nuxt-icon svg) {
        fill: var(--gray-color);
      }
    }
    ul {
      margin: 0;
      list-style: "＊";
      padding: 0 0 0 15px;
      li {
        margin: 5px 0;
      }
    }
  }
  .bath-products {
    .box {
      padding: 2px 15px;
      li {
        flex-wrap: wrap;
      }
    }
    .tag {
      background-color: #fff5ce;
    }
  }
  @include set-rwd(sm) {
    .tabs {
      display: none;
    }
    .box {
      margin: 10px 0 15px;
    }
    .service-content {
      margin-top: 15px;
    }
  }
}
</style>
