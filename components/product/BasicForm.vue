<script setup lang="ts">
// pinia
const reserveStore = useReserveFormStore();
const {
  name, nameAttrs,
  phone, phoneAttrs,
  petId, petIdAttrs,
  petName, petNameAttrs,
  petTypeId, petTypeIdAttrs,
  petGender, petGenderAttrs,
  errors
} = storeToRefs(reserveStore);
const { clearAllErrorMsg } = reserveStore;

const userStore = useUserStore();
const { userPets, userDefaultPet, userInfo } = storeToRefs(userStore);

//#region user
function setUserInfo() {
  name.value = userInfo.value.name;
  phone.value = userInfo.value.phone;
}
watch(userInfo, () => {
  setUserInfo();
});
//#endregion

//#region user pet default
const petsCategoryStore = usePetsCategoryStore();
const { selectedId: selectTypeId, pets: petsCategories } =
  storeToRefs(petsCategoryStore);

function setUserPetId() {
  if (petName.value || petTypeId.value || petGender.value) {
    return; // 已有填寫，跳過
  }
  if (!userPets.value?.length) {
    petId.value = -1; // 沒半隻，新增
  } else if (userDefaultPet.value.id !== 0) {
    petId.value = userDefaultPet.value.id; // 設定預設
  } else {
    petId.value = userPets.value[0].id; // 無預設，設定第一隻
  }
}

watch(userDefaultPet, () => {
  setUserPetId(); // 使用者變動預設寵物
});

watch(petId, (newVal) => {
  if (newVal === -1) { // 新增
    petName.value = '';
    petTypeId.value = selectTypeId.value ?? 0; // 已有選擇類別(首頁)
    petGender.value = '';
    clearAllErrorMsg();
  } else { // 找出對應的寵物類別
    const selectedUserPet = userPets.value?.find((pet) => pet.id === newVal);
    petTypeId.value =
      petsCategories.value.find(
        (petsCategory) => petsCategory.id === selectedUserPet?.pet_type_id
      )?.id ?? 0;
  }
});
//#endregion

//#region get gender list
const typeListStore = useTypeListStore();
const { getGenderList } = typeListStore;
const { genderList } = toRefs(typeListStore);
//#endregion

onMounted(() => {
  setUserInfo();
  setUserPetId();
  if (Object.keys(genderList.value).length === 0) {
    getGenderList();
  }
  clearAllErrorMsg();
});
</script>

<template>
  <section class="basic-form-block">
    <h6 class="m-0 sub-title">
      <nuxt-icon name="puzzle-piece" class="puzzle-icon" filled />基本資訊
    </h6>
    <div class="input-group">
      <label>預約人姓名</label>
      <q-input
        v-model="name"
        v-bind="nameAttrs"
        :error="!!errors['user.name']"
        hide-bottom-space
        outlined
        dense
        rounded
        placeholder="姓名"
      />
    </div>
    <div class="input-group">
      <label>聯絡手機</label>
      <q-input
        v-model="phone"
        v-bind="phoneAttrs"
        :error="!!errors['user.phone']"
        :error-message="errors['user.phone']"
        hide-bottom-space
        outlined
        dense
        rounded
        type="number"
        placeholder="聯絡電話"
      />
    </div>
    <div class="input-group">
      <label>寶貝資訊</label>
      <UserPetsSelect
        v-model="petId"
        v-bind="petIdAttrs"
        :add-mode="true"
        :selected-default="false"
        class="flex-150"
      />
      <CommonPetCategorySelect
        v-model="petTypeId"
        v-bind="petTypeIdAttrs"
        hide-bottom-space
        :is-async-store="false"
        :error="!!errors['pet.pet_type_id']"
        outlined
        dense
        rounded
        class="flex-200"
        :readonly="petId !== -1"
      />
      <template v-if="petId === -1">
        <CommonGenderSelect
          v-model="petGender"
          v-bind="petGenderAttrs"
          outlined
          dense
          rounded
          hide-bottom-space
          :error="!!errors['pet.gender']"
          class="flex-150"
        />
        <q-input
          v-model="petName"
          v-bind="petNameAttrs"
          :error="!!errors['pet.name']"
          hide-bottom-space
          outlined
          dense
          rounded
          placeholder="寶貝名字"
          class="pet-name"
        />
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
:deep(.input-group) {
  .flex-200 {
    flex: 1 1 200px;
  }
  .flex-150 {
    flex: 1 1 150px;
  }
  .pet-name {
    padding-left: 95px;
    flex: 1;
  }
}
</style>
