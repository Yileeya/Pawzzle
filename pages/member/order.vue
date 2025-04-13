<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';

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

const { userIsAdmin } = storeToRefs(useUserStore());

//#region delete
const $q = useQuasar();
const { $api } = useNuxtApp();
const deletingId = ref<number>(-1);

function showDeleteDialogHandler(id: number) {
  deletingId.value = id;
  $q.dialog({
    component: Dialog,
    componentProps: {
      mode: 'confirm',
      content: ['確定要刪除此筆資料嗎？刪除後無法復原。']
    }
  })
    .onOk(() => {
      deleteOrderHandler(id);
    })
    .onCancel(() => {
      deletingId.value = -1;
    });
}

async function deleteOrderHandler(id: number) {
  await $api(`/appointments/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      $q.notify({ message: '刪除成功！' });
      const rowIndex = data.value?.booked?.findIndex((item) => item.id === id);
      if (rowIndex === -1 || rowIndex === undefined) return;
      data.value?.booked?.splice(rowIndex, 1);
    })
    .finally(() => {
      deletingId.value = -1;
    });
}
//#endregion

//#region update status
async function updateStatusHandler(statusString: string, id: number) {
  await $api(`/appointments/${id}`, {
    method: 'PATCH',
    body: { status: statusString }
  }).then(() => {
    $q.notify({ message: '修改成功！' });
    execute();
  });
}
//#endregion
</script>

<template>
  <div class="member-order-page">
    <div v-if="!userIsAdmin" class="search-row">
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
      <div class="row-title">
        <nuxt-icon name="puzzle-piece" filled />
        {{ table.title }}
      </div>

      <div class="grid-table" :class="{'admin': userIsAdmin}">
        <div class="tr head sticky">
          <div>預約日期/時段</div>
          <div v-for="thCol in colspans" :key="`th_${thCol.key}`">
            {{ thCol.name }}
          </div>
          <div class="action-div">{{ table.key === 'feature' ? '' : '狀態' }}</div>
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
                {{ calculateEndTime(item.appointment_end_time, 30) }}
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
              <div class="action-div" :data-title="!userIsAdmin && table.key !== 'feature' ? '狀態' : ''">
                <div v-if="userIsAdmin" @click.stop>
                  <MemberStatusSelect
                    :model-value="item.status"
                    :disable="item.status === 'timeout'"
                    @update:model-value="(newVal) => updateStatusHandler(newVal, item.id)"
                  />
                </div>
                <q-btn
                  v-else-if="table.key === 'feature'"
                  unelevated
                  :ripple="false"
                  class="action-btn"
                  label="取消訂單"
                  :disable="deletingId === item.id"
                  @click.stop="showDeleteDialogHandler(item.id)"
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
        padding: 5px 10px 10px;
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

    &.admin {
      .tr {
        &.head {
          padding-right: 55px; //icon
        }
        .action-div {
          padding: 0;
        }
      }
      :deep(.tr-item) .q-item__section {
        padding-left: 15px;
      }
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
          margin-right: 45px;
        }
      }
      .action-btn {
        width: 100%;
        margin-top: 10px;
      }

      &.admin {
        .tr .action-div {
          padding-left: 15px;
          :deep(.status-select) {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
