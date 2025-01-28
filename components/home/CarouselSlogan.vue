<script setup lang="ts"></script>
<template>
  <div class="carousel-slogan">
    <nuxt-icon name="logo" filled class="logo" />
    <h4>把生活的最後一塊拼圖交給我們</h4>
    <nuxt-icon name="reserve-now" filled class="reserve-now" />
  </div>
</template>
<style scoped lang="scss">
.carousel-slogan {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  :deep(.logo svg) {
    width: 30%;
    height: auto;
    fill: white;
  }
  :deep(.reserve-now svg) {
    width: 15%;
    height: auto;
    fill: var(--primary-color);
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(2px 0px 0px white);
    }
  }
  h4 {
    margin: 15px 0;
    letter-spacing: 3px;
    font-size: 30px;
    color: white;
  }
}
</style>
