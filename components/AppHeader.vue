<script setup lang="ts">
import scrollToElement from '@/utils/scroll-to-element';

function routerTo(route: string = '', isScroll = false) {
  navigateTo(`/${route}`);
  if (isScroll) scrollToElement();
}

const tokenCookie = useCookie('token');

const userStore = useUserStore();
const { logout } = userStore;
const { userIsAdmin } = storeToRefs(userStore);
const showLoginModal = ref(false);
</script>

<template>
  <q-header class="app-header bg-secondary">
    <q-toolbar class="max-page-width">
      <q-toolbar-title>
        <div>
          <nuxt-icon name="logo" filled class="logo" @click="routerTo('')" />
          <a class="router-link" @click="routerTo('', true)">美容服務</a>
        </div>

        <UserGoogleLoginButton  v-if="!tokenCookie"/>

        <q-btn-dropdown v-else flat class="user-dropdown-btn">
          <template #label>
            <span v-if="userIsAdmin" class="admin-text">管理員</span>
            <q-avatar size="xl">
              <img src="/images/user-avatar.png" alt="user-avatar" >
            </q-avatar>
          </template>
          <q-list class="user-dropdown-list">
            <q-item v-close-popup clickable @click="routerTo('member/order')">
              <q-item-section>
                <nuxt-icon name="clipboard" filled />
                預約紀錄
              </q-item-section>
            </q-item>
            <div class="el-separator" />
            <q-item v-close-popup clickable @click="routerTo('member/user')">
              <q-item-section>
                <nuxt-icon name="circle-user-solid" filled />
                個人資料
              </q-item-section>
            </q-item>
            <div class="el-separator" />
            <q-item v-close-popup clickable @click="logout()">
              <q-item-section>
                <nuxt-icon name="arrow-right-from-bracket" filled />
                登出
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <user-login-modal v-model="showLoginModal" />
</template>

<style lang="scss">
.app-header {
  height: 88px;
  .q-toolbar {
    height: 100%;
    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        svg {
          width: 100%;
          max-width: fit-content;
          height: 30px;
          margin-bottom: 5px;
          fill: var(--primary-color);
          cursor: pointer;
          &:hover {
            fill: var(--primary-hover-color);
          }
        }
      }
      .router-link {
        font-size: 1.25rem;
        letter-spacing: 3px;
        text-decoration: none;
        color: white;
        padding: 0 30px;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
      }
      .user-dropdown-btn {
        border-radius: 10px;
        .admin-text {
          font-size: 1rem;
          margin-right: 10px;
        }
      }
    }
    @media (min-width: 1439px) {
      padding: 0;
    }
  }
  @include set-rwd(sm) {
    height: 50px;
    .q-toolbar {
      &__title {
        .logo svg {
          max-height: 20px;
        }
        .router-link {
          display: none;
        }
        .user-dropdown-btn {
          padding: 0;
          max-height: 42px;
          .q-avatar {
            transform: scale(0.75);
          }
          .q-btn-dropdown__arrow {
            margin-left: 0;
          }
        }
      }
    }
  }
}

.user-dropdown-list {
  color: var(--secondary-color);
  width: 165px;
  padding: 5px;
  .q-item {
    min-height: 42px;
    border-radius: 10px;
    &:hover {
      background: var(--primary-light-color);
    }
    &:focus {
      background: var(--primary-light-hover-color);
    }
  }
  .q-hoverable:hover > .q-focus-helper {
    opacity: 0 !important;
  }
  .el-separator {
    margin: 3px 0;
    height: 1px;
    border-bottom: 1px solid #0000001f;
  }
  .q-item__section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 0 10px;
    .nuxt-icon {
      fill: var(--secondary-color);
    }
  }
  @include set-rwd(sm) {
    .q-item {
      min-height: 30px;
    }
  }
}
</style>
