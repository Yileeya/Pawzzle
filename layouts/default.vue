
<script setup lang="ts">
const leftDrawerOpen = ref<boolean>(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          header here
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile">
      drawer content
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>

    <q-footer> footer here </q-footer>
  </q-layout>
</template>