<script setup lang="ts">
const gender = defineModel<string>({ required: true });

const typeListStore = useTypeListStore();
const { genderList } = storeToRefs(typeListStore);

const optionsData = computed(() => {
  const genderOptions = Object.entries(genderList.value).map(
    ([key, value]) => ({
      id: key,
      name: value
    })
  );
  return [{ id: '', name: '請選擇性別', disable: true }, ...genderOptions];
});
</script>

<template>
  <q-select
    v-model="gender"
    :options="optionsData"
    option-value="id"
    option-label="name"
    transition-show="scale"
    transition-hide="scale"
    emit-value
    map-options
    class="el-select"
    popup-content-class="el-select-pupup-content"
    options-selected-class="options-selected"
  />
</template>

<style lang="scss"></style>
