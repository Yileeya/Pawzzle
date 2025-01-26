<script setup lang="ts">
const information = [
  {
    id: 1,
    title: '預約電話',
    content: '02-1234-5678'
  },
  {
    id: 2,
    title: '服務地址',
    content: '台北市信義區信義路五段123號'
  }
];
const socialMedias = [
  {
    id: 1,
    name: 'facebook',
    link: 'https://www.facebook.com'
  },
  {
    id: 2,
    name: 'instagram',
    link: 'https://www.instagram.com'
  }
];
</script>
<template>
  <q-footer class="app-footer">
    <div class="max-page-width">
      <nuxt-icon name="logo" filled class="logo" />
      <div class="info-block">
        <p v-for="info in information" :key="`info_${info.id}`">
          <span>{{ info.title }}</span>
          <span>{{ info.content }}</span>
        </p>
      </div>
      <q-separator />
      <div class="footer-bottom">
        <div class="social-media-block">
          <a
            v-for="media in socialMedias"
            :key="`media_${media.id}`"
            :href="media.link"
            target="_blank"
          >
            <nuxt-icon :name="media.name" filled />
          </a>
        </div>
        <p class="copy-right">
          Powered by Pawzzle Studio, all Rights Reserved. designed by CYC.
        </p>
      </div>
    </div>
  </q-footer>
</template>
<style lang="scss">
.app-footer {
  position: relative;
  min-height: 290px;
  display: flex;
  align-items: center;
  @mixin icon-color {
    fill: var(--secondary-dark-color);
    &:hover {
      fill: var(--secondary-color);
    }
  }
  .max-page-width {
    flex: 1;
    color: var(--secondary-dark-color);
    .logo svg {
      width: fit-content;
      height: 45px;
      margin-bottom: 30px;
      fill: var(--secondary-dark-color);
    }
    .info-block {
      p {
        span:last-child {
          padding: 0 10px;
        }
        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }
    .q-separator {
      margin: 30px 0 15px;
    }
    .footer-bottom {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      .social-media-block {
        display: flex;
        gap: 10px;
        svg {
          font-size: 2rem;
          margin: 0;
          @include icon-color;
        }
      }
      .copy-right {
        font-size: 0.87rem;
      }
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 20px;
    right: 0;
    width: 30%;
    height: 50%;
    background-image: url('/images/footer-bg.svg');
    background-repeat: no-repeat;
  }
}
</style>
