<script setup lang="ts">
import type { IPet } from '@/stores/user';

useSeoMeta({
  title: 'Pawzzle Studio 個人資料'
});

// 使用者寵物
const userStore = useUserStore();
const { userPets } = storeToRefs(userStore);

// 寵物類別
const petsCategoryStore = usePetsCategoryStore();
const { pets } = storeToRefs(petsCategoryStore);

// typeListStore
const typeListStore = useTypeListStore();
const { genderList } = storeToRefs(typeListStore);

const colspans: { name: string; key: keyof IPet }[] = [
  {
    name: '預設',
    key: 'is_default'
  },
  {
    name: '名字',
    key: 'name'
  },
  {
    name: '種類',
    key: 'pet_type_id'
  },
  {
    name: '性別',
    key: 'gender'
  },
  {
    name: '生日',
    key: 'birth_date'
  },
  {
    name: '重量',
    key: 'weight'
  }
];

function showPetsCategoryName(petTypeId: number) {
  return pets.value.find((pet) => pet.id === petTypeId)?.name || '';
}
</script>

<template>
  <div class="user-page">
    <UserInformation/>

    <div class="row-title">
      <div>
        <nuxt-icon name="dog" filled />
        寶貝清單
      </div>
      <q-btn unelevated :ripple="false" class="action-btn" label="新增" />
    </div>
    <div class="grid-table pets">
      <div class="tr head sticky">
        <div v-for="thCol in colspans" :key="`th_${thCol.key}`">
          {{ thCol.name }}
        </div>
        <div />
      </div>
      <div v-if="!userPets?.length" class="tr no-data">無資料</div>
      <div v-for="pet in userPets" :key="`tr_${pet.id}`" class="tr">
        <div
          v-for="tdCol in colspans"
          :key="`tr_${pet.id}_td_${tdCol.key}`"
          :data-title="tdCol.name"
        >
          <span v-if="tdCol.key === 'gender'">
            {{ genderList[pet.gender] || '-'}}
          </span>
          <span v-else-if="tdCol.key === 'is_default'">
            <nuxt-icon
              v-if="pet.is_default === 1"
              name="circle-check-solid"
              filled
            />
          </span>
          <span v-else-if="tdCol.key === 'pet_type_id'">
            {{ showPetsCategoryName(pet.pet_type_id) }}
          </span>
          <span v-else> {{ pet[tdCol.key] }}</span>
        </div>
        <div class="text-right">
          <q-btn unelevated :ripple="false" class="action-btn" label="編輯" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.user-page {
  .row-title {
    display: flex;
    justify-content: space-between;
    .action-btn {
      width: 90px;
    }
  }

  .grid-table {
    margin-bottom: 30px;
    &.user .tr {
      grid-template-columns: 150px 1fr;
    }
    &.pets .tr {
      grid-template-columns: 65px 2fr repeat(4, 1fr) 100px;
    }
    .tr {
      align-items: baseline;
    }
    .nuxt-icon {
      fill: var(--primary-dark-color);
      svg {
        transform: scale(1.125);
        margin-bottom: 2px;
      }
    }
    .action-btn {
      width: 60px;
    }
  }

  @include set-rwd(md) {
    .grid-table {
      &.pets .tr {
        grid-template-columns: 1fr;
      }
      .action-btn {
        width: 100%;
        margin: 10px 0;
        line-height: 1.75;
      }
    }
  }
}
</style>
