<script setup>
const store = useServicesStore();
const { services, bathProducts, notices } = storeToRefs(store);
</script>

<template>
  <div class="home-page">
    <HomeCarousel />
    <section class="max-page-width main-content">
      <h5 class="text-center">美容服務</h5>
      <div class="service-blocks">
        <HomeServiceBlock
          v-for="service in services"
          :key="`service_block_${service.id}`"
          :service="service"
          :bath-products="bathProducts"
        />
      </div>
    </section>
    <div class="notice-block">
      <div class="max-page-width">
        <q-separator/>
        <h6 class="text-center">注意事項</h6>
        <ul class="notice-list">
          <li v-for="(notice, idx) in notices" :key="`notice_${idx}`">
            {{ notice }}
          </li>
        </ul>
      </div>
    </div>
    <HomeIntroductionBlock />
  </div>
</template>

<style scoped lang="scss">
.home-page {
  h5,
  h6 {
    margin: 0;
    letter-spacing: 3px;
  }
  .notice-block {
    position: relative;
    padding: 3% 0 6%;
    h6 {
      margin: 30px 0 15px;
    }
    .notice-list {
      list-style-type: "＊";
      width: 75%;
      margin: auto;
    }
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 700px;
      background-image: url("/images/notice-bg.png");
      background-repeat: no-repeat;
      background-position: bottom;
      position: absolute;
      bottom: 0;
      z-index: -1;
    }
  }
}
</style>
