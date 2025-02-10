<script setup lang="ts">
useSeoMeta({
  title: "Pawzzle Studio 美容服務",
});

const routes = useRoute();

// pinia
const store = useServicesStore();
const { services, bathProducts } = storeToRefs(store);
const { getServiceById } = store;
const pageService = computed(() => getServiceById(Number(routes.params.id)));

// form
const form = ref({
  user: {
    name: "",
    phone: "",
  },
  pet: {
    name: "",
    type: "",
  },
  serviceId: "",
  bathId: "",
  date: "",
  timeRange: [],
  price: "", // service price + pet price + bath price => 子組件計算 emit，父層slot
});

// 若輸入錯誤id，則導向id=1
onMounted(() => {
  if (!pageService.value) navigateTo("/product/1", { replace: true });
});
</script>

<template>
  <div v-if="pageService" class="product-page max-page-width">
    <ProductServiceBlock
      :services="services"
      :page-service="pageService"
      :bath-products="bathProducts"
    />
    <section class="reserve-form-section">
      <ProductBasicForm class="half-grid" />
      <ProductReserveForm class="half-grid" />
    </section>
  </div>
</template>

<style lang="scss">
.product-page {
  .reserve-form-section {
    background-color: var(--secondary-color);
    color: white;
    fill: white;
    border-radius: 15px;
    padding: 30px;
    margin: 30px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .half-grid {
      display: grid;
      grid-template-rows: 1fr 100px;
      .footer {
        border-top: 1px solid white;
      }
    }
    h6 {
      letter-spacing: 2px;
      font-weight: 500;
    }
    .input-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
    }
  }
}
</style>
