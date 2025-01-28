<script setup lang="ts">
const slide = ref<number>(1);
const autoplay = ref<boolean>(true);
</script>

<template>
  <q-carousel
    v-model="slide"
    animated
    arrows
    navigation
    infinite
    :autoplay="autoplay"
    transition-prev="slide-right"
    transition-next="slide-left"
    class="home-carousel"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
  >
    <q-carousel-slide
      v-for="index in 6"
      :key="`carousel-slide-${index}`"
      :name="index"
      :img-src="`/images/banner${index}.jpg`"
    >
      <HomeCarouselSlogan />
    </q-carousel-slide>
  </q-carousel>
</template>

<style lang="scss">
.home-carousel {
  height: 80vh;
  min-height: 500px;
  .q-carousel__navigation-icon--active {
    color: var(--primary-color);
  }
  .q-carousel__arrow .q-hoverable:hover {
    color: var(--primary-color);
  }
  @include set-rwd(md){
    height: 50vh;
    min-height: 300px;
  }
}
</style>
