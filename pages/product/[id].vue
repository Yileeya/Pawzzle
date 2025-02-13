<script setup lang="ts">
useSeoMeta({
  title: 'Pawzzle Studio 美容服務'
});

const routes = useRoute();

// pinia
const store = useServicesStore();
const { services, bathProducts } = storeToRefs(store);
const { getServiceById } = store;
const pageService = computed(() => getServiceById(Number(routes.params.id)));

// 若輸入錯誤id，則導向id=1
onMounted(() => {
  if (!pageService.value) navigateTo('/product/1', { replace: true });
});
</script>

<template>
  <div v-if="pageService" class="product-page max-page-width">
    <ProductServiceBlock
      :services="services"
      :page-service="pageService"
      :bath-products="bathProducts"
    />
  </div>
</template>
  
<style lang="scss">
</style>
