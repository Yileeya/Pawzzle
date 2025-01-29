<script setup lang="ts">
import type { IServicesApiData } from '@/stores/services';
import type { IPetsCategory } from '@/stores/petsCategory';

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
      ? (petsCategory.value as IPetsCategory)
      : { cats: [], dogs: [] };

  setServicesApiData(normalizedServices);
  setPetsCategoryApiData(normalizedPetsCategory);

  return {
    services: normalizedServices,
    petsCategory: normalizedPetsCategory
  };
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader @toggle="toggleLeftDrawer" />

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile">
      drawer content
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>

    <AppFooter />
  </q-layout>
</template>
