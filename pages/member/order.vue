<script setup lang="ts">
useSeoMeta({
  title: 'Pawzzle Studio 我的訂單'
});

interface IAppointments {
  id: number;
  appointment_date: string;
  appointment_start_time: string;
  appointment_end_time: string;
  service_name: string;
  bath_product_name: string;
  pet_name: string;
  price: number;
  status: string;
  service_staff: string;
  customer_name: string;
}

const userPetId = ref<number>(0);

const apiParams = computed(() => {
  const params: Record<string, any> = {};
  if (userPetId.value) params['pet_id'] = userPetId.value;
  return params;
});

const { data, execute, status } = useApi<{
  booked: IAppointments[];
  completed: IAppointments[];
  timeout: IAppointments[];
}>('/appointments', {
  params: apiParams,
  watch: false
});

const tables = computed(() => {
  return [
    {
      title: '即將到來',
      key: 'feature',
      data: data.value?.booked || []
    },
    {
      title: '歷史紀錄',
      key: 'past',
      data: [...(data.value?.completed || []), ...(data.value?.timeout || [])]
    }
  ];
});

const colspans: { name: string; key: keyof IAppointments }[] = [
  {
    name: '預約服務',
    key: 'service_name'
  },
  {
    name: '寵物資訊',
    key: 'pet_name'
  },
  {
    name: '訂單金額',
    key: 'price'
  }
];

function formatTime(timeString: string) {
  return timeString.slice(0, -3);
}

// pinia typeListStore
const typeListStore = useTypeListStore();
const { orderStatusList } = storeToRefs(typeListStore);
</script>

<template>
  <div class="member-order-page">
    <div class="search-row">
      <label class="title text-center">寶貝名字</label>
      <UserPetsSelect v-model="userPetId" :has-all="true" :selected-default="false"/>
      <q-btn
        unelevated :ripple="false"
        class="action-btn" label="查詢"
        :disable="status === 'pending'"
        @click="execute()" />
    </div>
    <div
      v-for="table in tables"
      :key="`order_table_${table.key}`"
      class="order-table-block"
    >
      <div class="row-tilte">
        <nuxt-icon name="puzzle-piece" filled />
        {{ table.title }}
      </div>

      <div class="grid-table">
        <div class="tr head sticky">
          <div>預約日期/時段</div>
          <div v-for="thCol in colspans" :key="`th_${thCol.key}`">
            {{ thCol.name }}
          </div>
          <div>{{ table.key === 'feature' ? '' : '狀態' }}</div>
        </div>
        <div v-if="!table.data.length" class="tr no-data">無資料</div>
        <q-expansion-item
          v-for="item in table.data"
          :key="`tr_${item.id}`"
          expand-separator
          :header-class="'expansion-header'"
          class="tr-item"
        >
          <template #header>
            <div class="tr">
              <div data-title="預約日期/時段">
                {{ item.appointment_date }}　
                {{ formatTime(item.appointment_start_time) }}~
                {{ formatTime(item.appointment_end_time) }}
              </div>
              <div
                v-for="tdCol in colspans"
                :key="`tr_${item.id}_td_${tdCol.key}`"
                :data-title="tdCol.name"
              >
                <span v-if="tdCol.key === 'price'">
                  {{ foramtCurrency(item.price) }}
                </span>
                <span v-else>{{ item[tdCol.key] }}</span>
              </div>
              <div>
                <q-btn
                  v-if="table.key === 'feature'"
                  unelevated
                  :ripple="false"
                  class="action-btn"
                  label="取消訂單"
                />
                <span v-else>{{ orderStatusList[item.status] || '-' }}</span>
              </div>
            </div>
          </template>
          <div class="content">
            <div class="remark-row">
              訂單備註：
              {{
                item.bath_product_name ? `加購 ${item.bath_product_name}` : '無'
              }}
            </div>
          </div>
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.member-order-page {
  .search-row {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    $border-radius: 10px;
    $height: 42px;

    .title {
      line-height: $height;
      background: var(--secondary-color);
      color: white;
      border-radius: $border-radius 0 0 $border-radius;
      width: 100px;
    }

    :deep(.el-select) {
      flex: 1;
      max-width: 350px;
      .q-field__control {
        border-radius: 0 $border-radius $border-radius 0;
        border: 1px solid var(--secondary-color);
        background: transparent;
        &:hover:before {
          border-color: var(--secondary-color);
        }
      }
      .q-field__control:after, .q-field__control:before {
        border: none;
      }
    }

    .action-btn {
      width: 80px;
      height: $height;
      font-size: 1rem;
      margin-left: 15px;
      background-color: var(--secondary-color);
    }
  }

  .grid-table {
    margin-bottom: 30px;
    .tr {
      grid-template-columns: 2fr repeat(2, 1fr) 130px 130px;
      align-items: center;
      &.head {
        padding-right: 40px; //icon
      }
    }
    :deep(.tr-item) {
      .expansion-header {
        padding: 0;
        .tr {
          flex: 1;
        }
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
    .action-btn {
      width: 90px;
    }
  }

  @include set-rwd(md) {
    .search-row {
      .title {
        width: 75px;
      }
      .action-btn {
        width: 60px;
        margin-left: 10px;
      }
    }

    .grid-table {
      .tr {
        grid-template-columns: 1fr;
        div:first-child::before {
          display: block;
        }
      }
      :deep(.tr-item) {
        &:nth-child(odd) {
          background-color: #f5f5f5;
        }
        .q-item__section--side {
          justify-content: flex-start;
          padding: 10px;
        }
        .content {
          padding: 0 15px 10px;
          margin-right: 45px;
        }
      }
      .action-btn {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
