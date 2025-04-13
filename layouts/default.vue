<script setup lang="ts">
import type { IServicesApiData } from '@/stores/services';
import type { IPetCategory } from '@/stores/petsCategory';

const loadingIndicator = useLoadingIndicator();

const { setLayoutLoading } = useUiUxStore();

// api fetch
const { setServicesApiData } = useServicesStore();
const { setPetsCategoryApiData } = usePetsCategoryStore();
const { getUser } = useUserStore();

const { $api } = useNuxtApp();

await useAsyncData('servicesAndPetsCategory', async () => {
  const apis = [$api('/services'), $api('/petsCategory')];
  const [services, petsCategory] = await Promise.allSettled(apis);

  const normalizedServices =
    services.status === 'fulfilled'
      ? (services.value as IServicesApiData)
      : { services: [], bath_products: [], notices: [] };

  const normalizedPetsCategory =
    petsCategory.status === 'fulfilled'
      ? (petsCategory.value as IPetCategory[])
      : [];

  setServicesApiData(normalizedServices);
  setPetsCategoryApiData(normalizedPetsCategory);

  return {
    services: normalizedServices,
    petsCategory: normalizedPetsCategory
  };
});

onMounted(async () => {
  setLayoutLoading(true);
  await getUser();
  setLayoutLoading(false);
});

// scroll to top
const { showButton, scrollToTop } = useScrollToTop();
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <AppLoading />
    <AppHeader />

    <q-page-container>
      <!--scroll-to-top-btn高度判定-->
      <div id="scrollTarget" />
      <slot />
    </q-page-container>

    <transition name="slide-left">
      <AppFooter v-if="loadingIndicator.progress.value === 0"/>
    </transition>
    <nuxt-icon
      name="go-to-top"
      filled
      class="scroll-to-top"
      :class="{ show: showButton }"
      @click="scrollToTop"
    />
  </q-layout>
</template>

<style scoped lang="scss">
.q-layout {
  overflow: hidden;

  .q-page-container {
    min-height: 100vh;
    @include set-rwd(md) {
      min-height: 100vh;
    }
  }
}
.scroll-to-top {
  font-size: 75px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  :deep(svg) {
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 100%;
  }
  &.show {
    opacity: 1;
  }
  &:hover {
    color: var(--gray-color);
  }
}
</style>
