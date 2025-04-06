<script setup lang="ts">
import type { IPetCategory } from '@/stores/petsCategory';

const model = defineModel({ type: Number });

const { isAsyncStore = true } = defineProps<{
  isAsyncStore?: boolean; // pinia 同步
}>();

// pinia
const store = usePetsCategoryStore();
const { selectedId, pets } = storeToRefs(store);
const { setSelectedPet } = store;

interface IPetCategoryWithDisabled extends IPetCategory {
  disabled?: boolean;
}

// 組合格式
const groupedOptions = computed(() => {
  if (!pets.value) return [];
  const petsGroup = {
    cat: '貓',
    dog: '狗'
  };
  const petsOptions = pets.value.reduce<IPetCategoryWithDisabled[]>(
    (acc, item) => {
      const { category } = item;

      // 如果當前的 category 與上次的不一樣，插入對應的標題
      if (acc.length === 0 || acc[acc.length - 1].category !== category) {
        acc.push({
          id: -1,
          name: petsGroup[category as 'cat' | 'dog'],
          extra_price: {},
          category: ''
        });
      }

      acc.push(item);
      return acc;
    }, []);

  petsOptions.unshift({
    id: 0,
    name: '請選擇寵物類別',
    extra_price: {},
    category: '',
    disabled: true
  });
  return petsOptions;
});

const setSelectId = computed(() => {
  if (isAsyncStore) return selectedId.value;
  else return model.value;
});

function selectOption(data: IPetCategory) {
  if (isAsyncStore) setSelectedPet(data);
  else model.value = data.id;
}
</script>

<template>
  <q-select
    :model-value="setSelectId"
    :options="groupedOptions"
    option-value="id"
    option-label="name"
    map-options
    :rounded="isAsyncStore"
    :outlined="isAsyncStore"
    dense
    color="primary"
    transition-show="scale"
    transition-hide="scale"
    class="pet-category-select"
    popup-content-class="pet-category-select-pupup-content"
    options-selected-class="options-selected"
    @update:model-value="selectOption"
  >
    <template #option="scope">
      <div
        v-if="scope.opt.id <= 0"
        class="group-label"
        :class="{ hidden: scope.opt.id === 0 }"
      >
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
