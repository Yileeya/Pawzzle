<script setup>
function goToProduct(route, id){
  navigateTo(id ? `/${route}/${id}` : `/${route}`);
}
</script>

<template>
  <div>
    <HomeCarousel />
    <h1>首頁</h1>
    <button @click="goToProduct('product', 1)">跳轉到產品：1</button>
    <button @click="goToProduct('member')">跳轉到會員頁</button>
  </div>
</template>
