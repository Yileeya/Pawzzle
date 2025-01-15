<script setup lang="ts">
// https://ithelp.ithome.com.tw/articles/10338164
const event = useRequestEvent();
setResponseStatus(event, 404);

definePageMeta({
  layout: 'empty'
});
</script>

<template>
  <div>
    <h1>此頁面不存在！</h1>
  </div>
</template>


<style scoped>

</style>