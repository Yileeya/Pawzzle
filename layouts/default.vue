<script setup lang="ts">
import type { IServicesApiData } from '@/stores/services';
import type { IPetCategory } from '@/stores/petsCategory';

const leftDrawerOpen = ref<boolean>(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// api fetch
const { setServicesApiData } = useServicesStore();
const { setPetsCategoryApiData } = usePetsCategoryStore();

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

// scroll to top
const { showButton, scrollToTop } = useScrollToTop();
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader @toggle="toggleLeftDrawer" />

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile">
      drawer content
    </q-drawer>

    <q-page-container>
      <!--scroll-to-top-btn高度判定-->
      <div id="scrollTarget"/>
      <slot />
    </q-page-container>

    <AppFooter />
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
