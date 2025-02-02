<script setup>
useSeoMeta({
  title: 'Pawzzle Studio 首頁'
});
const servicesStore = useServicesStore();
const { services, bathProducts, notices } = storeToRefs(servicesStore);
const petsCategoryStore = usePetsCategoryStore();
const { selectedPet } = storeToRefs(petsCategoryStore);
</script>

<template>
  <div class="home-page">
    <HomeCarousel />
    <section id="ServiceBlock" class="max-page-width main-content">
      <h5 class="text-center">美容服務</h5>
      <div class="pet-select-block">
        <h6>要美容的寶貝是？</h6>
        <CommonPetCategorySelect />
        <nuxt-icon
          v-for="petsCategory in ['cat', 'dog']"
          :key="`pets_category_${petsCategory}`"
          :name="petsCategory"
          filled
          class="pet-icon"
          :class="{ active: selectedPet?.category === petsCategory }"
        />
      </div>
      <div class="service-blocks">
        <HomeServiceBlock
          v-for="service in services"
          :key="`service_block_${service.id}`"
          :service="service"
          :bath-products="bathProducts"
          :extra-price="selectedPet?.extra_price[service.id] || 0"
          data-aos="fade-up"
        />
      </div>
    </section>
    <div class="notice-block">
      <div class="max-page-width">
        <q-separator />
        <h6 class="text-center">注意事項</h6>
        <ul class="notice-list" data-aos="fade-in">
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
  h6 {
    margin: 0;
    letter-spacing: 1px;
  }
  h5 {
    font-size: 1.875rem;
  }
  .pet-select-block {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    background-color: var(--secondary-color);
    color: white;
    min-height: 60px;
    border-radius: 10px;
    box-shadow: 5px 5px 15px 0 rgba(0, 0, 0, 0.2);
    margin-bottom: 60px;
    :deep(.pet-category-select) {
      width: 250px;
    }
    :deep(.pet-icon) {
      svg {
        height: 100%;
        width: 36px;
        fill: #c1c1c1;
      }
      &.active {
        svg {
          fill: var(--primary-light-hover-color);
        }
      }
    }
  }
  .notice-block {
    position: relative;
    padding: 3% 0 6%;
    h6 {
      margin: 30px 0 15px;
      letter-spacing: 3px;
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
  @include set-rwd(md) {
    h5 {
      margin: 2rem 0;
    }
  }
  @include set-rwd(sm) {
    .pet-select-block {
      padding: 10px;
      margin-bottom: 30px;
      .pet-icon {
        display: none;
      }
    }
    .notice-block .notice-list {
      width: 100%;
      padding-left: 15px;
    }
  }
}
</style>
