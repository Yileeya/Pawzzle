<script setup lang="ts">
const userPetId = defineModel<number>({ required: true });

// pinia user pets
const userStore = useUserStore();
const { userPets, userDefaultPet } = storeToRefs(userStore);

watch(userDefaultPet, (newVal) => {
  userPetId.value = newVal.id;
});

const optionsData = computed<{ id: number; name: string }[]>(() => {
  const pets = userPets.value?.map(({ id, name }) => ({ id, name })) || [];
  pets.push({
    id: -1,
    name: '新增'
  });
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
    class="pet-category-select"
    popup-content-class="pet-category-select-pupup-content"
    options-selected-class="options-selected"
  />
</template>

<style lang="scss"></style>
