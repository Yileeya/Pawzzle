<script setup lang="ts"></script>
<template>
  <div class="introduction-block">
    <div class="content" data-aos="fade-left">
      <p>生活因毛小孩的存在而更加圓滿，它們是您生活中最重要的拼圖之一。</p>
      <p>Pawzzle Studio提供專業的美容服務，讓您的毛孩子展現最美的一面，成為家庭中最閃亮的一部分。</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.introduction-block {
  position: relative;
  background-color: #FFEED2;
  height: 250px;
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    max-width: 600px;
    background-image: url('/images/introduction-bg.png');
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
  }

  .content {
    margin: auto;
    p {
      margin: 0;
      line-height: 2;
      letter-spacing: 1px;
    }
  }
  @include set-rwd(lg) {
    .content {
      padding: 0 30px;
    }
  }
  @include set-rwd(sm) {
    &::before {
      content: none;
    }
  }
}
</style>
