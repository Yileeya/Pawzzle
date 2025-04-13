<script setup lang="ts">
const { isLoading } = storeToRefs(useUiUxStore());
</script>

<template>
  <Transition name="fade">
    <div v-show="isLoading" class="loading-layout">
      <q-spinner-bars
        color="primary"
        size="80px"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.loading-layout {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 5000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 淡入淡出動畫定義 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>