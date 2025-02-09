<script setup lang="ts">
import type { IPetCategory } from '@/stores/petsCategory';

// pinia
const store = usePetsCategoryStore();
const { selectedId, selectedPet, pets } = storeToRefs(store);
const { setSelectedPet } = store;

// 組合格式
const groupedOptions = computed(() => {
  if (!pets.value) return [];
  const petsGroup = {
    cat: '貓',
    dog: '狗'
  };
  return pets.value.reduce<IPetCategory[]>((acc, item) => {
    const { category } = item;

    // 如果當前的 category 與上次的不一樣，插入對應的標題
    if (acc.length === 0 || acc[acc.length - 1].category !== category) {
      acc.push({
        id: 0,
        name: petsGroup[category as 'cat' | 'dog'],
        extra_price: {},
        category: ''
      });
    }

    acc.push(item);
    return acc;
  }, []);
});

function selectOption(data: IPetCategory) {
  setSelectedPet(data);
}
</script>

<template>
  <q-select
    :model-value="selectedId"
    :options="groupedOptions"
    option-value="id"
    option-label="name"
    map-options
    rounded
    outlined
    dense
    color="primary"
    transition-show="scale"
    transition-hide="scale"
    class="pet-category-select"
    popup-content-class="pet-category-select-pupup-content"
    options-selected-class="options-selected"
    :display-value="`${selectedPet ? selectedPet.name : '請選擇寵物類別'}`"
    @update:model-value="selectOption"
  >
    <template #option="scope">
      <div v-if="scope.opt.id === 0" class="group-label">
        {{ scope.opt.name }}
      </div>
      <q-item v-else v-bind="scope.itemProps">
        <q-item-section>{{ scope.opt.name }}</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<style lang="scss">
.pet-category-select {
  .q-field__control:hover {
    transition: border-color 0.36s cubic-bezier(0.4, 0, 0.2, 1);
    &:before {
      border-color: var(--primary-color);
    }
  }
}
.pet-category-select-pupup-content {
  .group-label {
    padding: 0 10px;
    background-color: #CCC6C2;
    color: white;
  }
  .options-selected {
    background-color: var(--secondary-color);
    color: white;
  }
}
</style>
