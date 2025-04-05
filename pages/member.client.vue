<script setup lang="ts">
definePageMeta({
  redirect: '/member/user'
});

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

// pinia list
const { $api } = useNuxtApp();
const { setGenderList, setOrderStatusList } = useTypeListStore();

await useAsyncData('typeList', async () => {
  const apis = [$api('/statusList'), $api('/genderList')];
  const [statusList, genderList] = await Promise.allSettled(apis);

  const normalizedStatusList =
    statusList.status === 'fulfilled' ? (statusList.value as Record<string, string>) : {};

  const normalizedGenderList =
    genderList.status === 'fulfilled' ? (genderList.value as Record<string, string>) : {};

  setGenderList(normalizedGenderList);
  setOrderStatusList(normalizedStatusList);

  return {
    statusList: normalizedStatusList,
    genderList: normalizedGenderList
  };
});
</script>
<template>
  <div class="member-page max-page-width">
    <div class="menu-block">
      <div class="title-block">
        <h1 class="page-title">會員專區</h1>
        <div class="user-email">
          <nuxt-icon name="circle-user-solid" filled />
          {{ userInfo?.email }}
        </div>
      </div>
      <div class="tab-block">
        <NuxtLink to="/member/user">
          <nuxt-icon name="address-card-regular" filled />
          個人資料
        </NuxtLink>
        <NuxtLink to="/member/order">
          <nuxt-icon name="rectangle-list-regular" filled />
          我的訂單
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

  @include set-rwd(md) {
    .menu-block {
      flex-wrap: wrap;
      flex-direction: row;
      row-gap: 10px;
      padding: 15px 0;
    }
  }
}
</style>

<style lang="scss">
.member-page {
  .row-title {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 15px;
    .nuxt-icon {
      fill: var(--secondary-color);
      font-size: 1.25rem;
      margin-right: 3px;
      svg {
        fill: var(--secondary-color);
        margin-bottom: 5px;
      }
    }
  }

  .action-btn {
    background-color: var(--primary-dark-color);
    color: white;
    border-radius: 10px;
    padding: 0;
    min-height: auto;
    line-height: 2;
    font-weight: 400;
    letter-spacing: 1px;
    &:hover {
      background-color: var(--secondary-dark-color);
    }
  }
}
</style>
