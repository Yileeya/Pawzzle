<script setup lang="ts">
import { orderData } from "@/demoData/order";
import type { IService, IBathProduct } from "@/stores/services";
import type { IPetCategory } from "@/stores/petsCategory";

useSeoMeta({
  title: "Pawzzle Studio 我的訂單",
});

interface OrderDataRow {
  id: number;
  date: string;
  time: string[];
  serverId: number;
  server: IService;
  petId: number;
  pet: IPetCategory;
  price: number;
  bathProductId: number | null;
  bathProduct: IBathProduct | null;
}

const tables = ref([
  {
    title: "即將到來的預約",
    key: "feature",
  },
  {
    title: "過去的預約",
    key: "past",
  },
]);
const colspans = ref([
  {
    title: "預約日期/時段",
    key: "dateAndTimes",
  },
  {
    title: "預約服務",
    key: "service",
  },
  {
    title: "寵物資訊",
    key: "pet",
  },
  {
    title: "訂單金額",
    key: "price",
  },
]);

const data = ref<{
  feature: OrderDataRow[];
  past: OrderDataRow[];
}>({ ...orderData });

function showRowDateAndTimes(item: OrderDataRow) {
  const timeEnd = item.time[item.time.length - 1];
  return `${item.date}　${item.time[0]}-${timeEnd}`;
}

const current = ref(3);
</script>

<template>
  <div class="member-order-page">
    <div
      class="order-table-block"
      v-for="table in tables"
      :key="`order_table_${table.key}`"
    >
      <div class="title-box">
        <nuxt-icon name="puzzle-piece" filled />
        {{ table.title }}
      </div>

      <div class="grid-table">
        <div class="tr head sticky">
          <div v-for="thCol in colspans" :key="`th_${thCol.key}`">
            {{ thCol.title }}
          </div>
        </div>

        <q-expansion-item
          expand-separator
          v-for="item in data[table.key as keyof typeof data]"
          :key="`tr_${item.id}`"
          :header-class="'expansion-header'"
          class="tr-item"
        >
          <template v-slot:header>
            <div class="tr">
              <div
                v-for="tdCol in colspans"
                :key="`tr_${item.id}_td_${tdCol.key}`"
                :data-title="tdCol.title"
              >
                <div v-if="tdCol.key === 'dateAndTimes'">
                  {{ showRowDateAndTimes(item) }}
                </div>
                <div v-else-if="tdCol.key === 'service'">
                  {{ item.server.display_name }}
                </div>
                <div v-else-if="tdCol.key === 'pet'">
                  {{ item.pet.name }}
                </div>
                <div v-else-if="tdCol.key === 'price'">
                  {{ foramtCurrency(item.price) }}
                </div>
              </div>
              <div v-if="table.key === 'feature'">
                <q-btn
                  unelevated
                  :ripple="false"
                  class="cancel-btn"
                  label="取消訂單"
                />
              </div>
            </div>
          </template>
          <div class="content">
            <div class="remark-row">
              訂單備註：
              <span v-if="item.bathProductId">
                加購 {{ item.bathProduct?.name }}+{{ item.bathProduct?.price }}
              </span>
              <span v-else>無</span>
            </div>
          </div>
        </q-expansion-item>
        <div
          v-if="!data[table.key as keyof typeof data].length"
          class="tr no-data text-center"
        >
          無資料
        </div>
      </div>

      <div v-if="table.key === 'past'" class="page-block">
        <q-pagination
          v-model="current"
          :max="10"
          :max-pages="6"
          :ripple="false"
          flat
          direction-links
          text-color="page"
          active-color="active"
          class="el-pagination"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.member-order-page {
  padding-bottom: 30px;
  .order-table-block {
    margin-bottom: 30px;
    .title-box {
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: 15px;
      :deep(.nuxt-icon) {
        fill: var(--secondary-color);
        font-size: 1.25rem;
        margin-right: 3px;
        svg {
          transform: rotate(270deg);
          margin-bottom: 5px;
        }
      }
    }
  }

  .grid-table {
    :deep(.tr-item) {
      .expansion-header {
        padding: 0;
      }
      .content {
        padding: 10px 0;
        .remark-row {
          padding: 5px 15px;
          background: var(--primary-hover-color);
          border-radius: 15px;
        }
      }
    }
    .tr {
      grid-template-columns: 2fr repeat(4, 1fr);
      align-items: center;
      flex: 1;
      &.head {
        padding-right: 40px; //icon
      }
      &.no-data {
        grid-template-columns: 1fr;
      }
    }
    .cancel-btn {
      background-color: var(--primary-dark-color);
      color: white;
      border-radius: 10px;
      font-size: 1rem;
      padding: 0;
      min-height: auto;
      width: 120px;
      line-height: 2;
      font-weight: 400;
      letter-spacing: 1px;
      &:hover {
        background-color: var(--secondary-dark-color);
      }
    }
  }

  .page-block {
    margin-top: 15px;
    :deep(.el-pagination) {
      .bg-active {
        background-color: var(--primary-light-hover-color);
        &:before {
          box-shadow: none;
        }
      }
    }
  }

  @include set-rwd(md) {
    .grid-table {
      padding: 0 15px;
      :deep(.tr-item) {
        .expansion-header.q-hoverable:hover > .q-focus-helper {
          background-color: transparent;
        }
        .expansion-header {
          align-items: flex-start;
          .q-item__section--side {
            padding-top: 15px;
          }
        }
        .content {
          padding-top: 0;
          margin-top: -5px;
        }
        &.q-expansion-item--expanded {
          hr {
            display: none;
          }
        }
        &:not(:last-child) {
          border-bottom: 1px solid #e1e1e1;
        }
      }
      .tr {
        grid-template-columns: 1fr;
        > div {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          padding: 5px 0;
        }
      }
      .cancel-btn {
        width: 100%;
      }
    }
    .page-block {
      .el-pagination{
        justify-content: center;
      }
    }
  }
}
</style>
