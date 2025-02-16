<script setup lang="ts">
// pinia
const reserveStore = useReserveFormStore();
const { name, nameAttrs, phone, phoneAttrs, petName, petNameAttrs, errors } = storeToRefs(reserveStore);
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
      <CommonPetCategorySelect hide-bottom-space :error="!!errors['pet.type']" />
      <q-input
        v-model="petName"
        v-bind="petNameAttrs"
        :error="!!errors['pet.name']"
        hide-bottom-space
        outlined
        dense
        rounded
        placeholder="寶貝名字"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>
