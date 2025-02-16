<script setup lang="ts">
import type { IBathProduct } from '@/stores/services';
defineProps<{
  bathProducts: IBathProduct[];
  selectedId: number | null;
}>();
const emit = defineEmits(['update']);

function handleBathProductClick(bathItem: IBathProduct) {
  emit('update', bathItem);
}
</script>
<template>
  <div class="form-group bath-block">
    <h6 class="m-0 sub-title">
      加值選購<nuxt-icon name="plus" class="add-icon" filled />
    </h6>
    <div class="input-group">
      <div
        v-for="bathProduct in bathProducts"
        :key="`bath_product_${bathProduct.id}`"
        class="check-box"
        :class="{ active: bathProduct.id === selectedId }"
        @click="handleBathProductClick(bathProduct)"
      >
        <div>{{ bathProduct.name }}</div>
        <div>+{{ bathProduct.price }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bath-block {
  padding-top: 30px;
  h6 {
    font-size: 1rem;
    color: var(--primary-color);
    fill: var(--primary-color);
    :deep(.add-icon svg) {
      transform: translate(1px, -7px);
    }
  }
  .check-box {
    padding: 10px 20px !important;
  }
  @include set-rwd(md) {
    padding-top: 0;
    .check-box {
      flex: 1;
      max-width: 180px;
      min-width: 160px;
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }
  }
  @include set-rwd(xs) {
    .input-group {
      row-gap: 10px !important;
      .check-box {
        width: 100%;
        max-width: 100%;
      }
    }
  }
}
</style>
