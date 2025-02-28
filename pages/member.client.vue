<script setup>
definePageMeta({
  redirect: '/member/order'
});
</script>
<template>
  <div class="member-page max-page-width">
    <div class="menu-block">
      <div class="title-block">
        <h1 class="page-title">會員專區</h1>
        <div class="user-email">
          <nuxt-icon name="circle-user-solid" filled />
          rita841027@gmail.com
        </div>
      </div>
      <div class="tab-block">
        <NuxtLink to="/member/user">
          <nuxt-icon name="address-card-regular" filled />個人資料
        </NuxtLink>
        <NuxtLink to="/member/order">
          <nuxt-icon name="rectangle-list-regular" filled />我的訂單
        </NuxtLink>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>

<style scoped lang="scss">
.member-page {
  .menu-block {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    padding: 30px 0;
  }
  .title-block {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 10px 30px;
    .page-title {
      font-size: 1.875rem;
      margin: 0;
      font-weight: 400;
      line-height: 1;
    }
    .user-email {
      font-size: 1.125rem;
      :deep(.nuxt-icon) {
        font-size: 1.125rem;
        margin-right: 2px;
        fill: var(--secondary-color);
        svg {
          margin-bottom: 2px;
        }
      }
    }
  }

  .tab-block {
    font-size: 1.125rem;
    display: flex;
    a {
      text-decoration: none;
      color: var(--secondary-color);
      padding-bottom: 3px;
      width: 150px;
      text-align: center;
      border-radius: 5px;
      :deep(.nuxt-icon) {
        font-size: 24px;
        fill: var(--secondary-color);
        margin-right: 5px;
        svg {
          margin-bottom: 0;
        }
      }
      &.router-link-active {
        font-weight: 500;
        color: var(--secondary-color);
        border-bottom: 3px solid var(--secondary-color);
        border-radius: 0;
      }
      &:hover {
        background: var(--secondary-color);
        color: white;
        border-radius: 5px;
        .nuxt-icon {
          fill: white;
        }
      }
    }
  }

  @include set-rwd(md){
    .menu-block{
      flex-wrap: wrap;
      flex-direction: row;
      row-gap: 10px;
      padding: 15px 0;
    }
  }
}
</style>
