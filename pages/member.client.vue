<script setup>
definePageMeta({
  redirect: '/member/order'
});
</script>
<template>
  <div>
    <h1>會員頁面</h1>
    <div>
      <p>歡迎來到會員中心</p>
    </div>
    <div>
      <NuxtLink to="/member/user">客戶資料</NuxtLink>
      <NuxtLink to="/member/order">訂單頁</NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>
