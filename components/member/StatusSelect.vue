<script setup lang="ts">
const status = defineModel<string>({ required: true });

const typeListStore = useTypeListStore();
const { orderStatusList } = storeToRefs(typeListStore);

const optionsData = computed<{ id: string; name: string }[]>(() => {
  return Object.entries(orderStatusList.value).map(([id, name]) => ({
    id,
    name: name as string
  }));
});
</script>

<template>
  <q-select
    v-model="status"
    :options="optionsData"
    option-value="id"
    option-label="name"
    transition-show="scale"
    transition-hide="scale"
    emit-value
    map-options
    class="el-select status-select"
    popup-content-class="el-select-pupup-content"
    options-selected-class="options-selected"
    outlined
    behavior="default"
  />
</template>

<style lang="scss">
.el-select.status-select {
  .q-field__control {
    height: 35px;
    min-height: auto;
    padding-right: 3px;
    .q-field__native{
      min-height: auto;
    }
  }
  .q-field__marginal {
    height: 35px;
  }
}
</style>
