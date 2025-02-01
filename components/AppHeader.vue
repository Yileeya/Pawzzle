<script setup lang="ts">
import scrollToElement from '@/utils/scroll-to-element';

const emit = defineEmits(['toggle']);

function routerTo(route: string = '', isScroll = false){
  navigateTo(`/${route}`);
  if(isScroll) scrollToElement();
}
</script>

<template>
  <q-header class="app-header bg-secondary">
    <q-toolbar>
      <q-btn
        class="lt-md"
        dense
        flat
        round
        icon="menu"
        @click="emit('toggle')"
      />

      <q-toolbar-title>
        <div>
          <nuxt-icon name="logo" filled class="logo" @click="routerTo('')"/>
          <a class="router-link" @click="routerTo('', true)">美容服務</a>
        </div>
        <q-btn-dropdown flat class="user-dropdown-btn">
          <template #label>
            <q-avatar size="xl">
              <img src="/images/user-avatar.png" alt="user-avatar">
            </q-avatar>
          </template>
          <q-list class="user-dropdown-list">
            <q-item v-close-popup clickable @click="routerTo('member/order')">
              <q-item-section>
                <nuxt-icon name="clipboard" filled />
                預約紀錄
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item v-close-popup clickable>
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
</template>

<style lang="scss">
.app-header {
  height: 88px;
  .q-toolbar {
    height: 100%;
    padding: 0 100px;
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
  .q-separator {
    margin: 3px 0;
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
}
</style>
