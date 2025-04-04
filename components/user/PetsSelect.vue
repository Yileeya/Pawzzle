<script setup lang="ts">
const userPetId = defineModel<number>({ required: true });

const { addMode = false, hasAll = false, selectedDefault = true } = defineProps<{
  addMode?: boolean;
  hasAll?: boolean;
  selectedDefault?: boolean;
}>();

// pinia user pets
const userStore = useUserStore();
const { userPets, userDefaultPet } = storeToRefs(userStore);

watch(userDefaultPet, (newVal) => {
  if(!selectedDefault) return;
  userPetId.value = newVal.id;
});

const optionsData = computed<{ id: number; name: string }[]>(() => {
  const pets = userPets.value?.map(({ id, name }) => ({ id, name })) || [];
  if (addMode) {
    pets.push({
      id: -1,
      name: '新增'
    });
  }
  if (hasAll) {
    pets.unshift({
      id: 0,
      name: '全部'
    });
  }
  return pets;
});
</script>

<template>
  <q-select
    v-model="userPetId"
    :options="optionsData"
    option-value="id"
    option-label="name"
    map-options
    rounded
    outlined
    dense
    color="primary"
    transition-show="scale"
    transition-hide="scale"
    emit-value
    class="el-select"
    popup-content-class="el-select-pupup-content"
    options-selected-class="options-selected"
  />
</template>

<style lang="scss"></style>
