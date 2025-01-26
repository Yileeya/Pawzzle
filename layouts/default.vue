
<script setup lang="ts">
const leftDrawerOpen = ref<boolean>(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
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

    <q-footer> footer here </q-footer>
  </q-layout>
</template>