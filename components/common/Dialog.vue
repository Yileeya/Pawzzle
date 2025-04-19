<script setup lang="ts">
// https://quasar.dev/quasar-plugins/dialog#triggering-the-custom-component
import { useDialogPluginComponent } from 'quasar';

defineProps<{
  mode: 'success' | 'error' | 'login' | 'confirm';
  content?: string[];
}>();
defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
</script>

<template>
  <q-dialog
    ref="dialogRef"
    backdrop-filter="blur(4px)"
    class="confirm-dialog"
    @hide="onDialogHide"
  >
    <Suspense>
      <div class="dialog-container" :class="[mode]">
        <nuxt-icon
          class="close-icon"
          name="plus"
          filled
          @click="onDialogCancel"
        />
        <div class="container">
          <nuxt-icon name="confirm-dialog-bg" class="dialog-bg" filled />
          <div class="content">
            <nuxt-icon name="logo" class="logo" filled />
            <div v-if="mode === 'login'" class="login-message">
              請先登入才能進行預約喔！
            </div>
            <div v-else-if="mode === 'success'" class="title">
              {{ content?.[0] }}
              <nuxt-icon name="circle-check" filled />
            </div>
            <div v-else>
              <div class="title">
                <nuxt-icon name="triangle-exclamation" filled />
                {{ mode === 'error' ? '錯誤！' : '注意!' }}
              </div>
              <ul :class="{ 'string-style': content?.length === 1 }">
                <li v-for="msg in content" :key="`dialog_${msg}`">
                  {{ msg }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <footer v-if="mode === 'confirm'">
          <q-btn
            class="action-btn"
            text-color="white"
            style="background: var(--secondary-dark-color)"
            label="取消"
            unelevated
            :ripple="false"
            @click="onDialogCancel"
          />
          <q-btn
            class="action-btn"
            label="確定"
            unelevated
            text-color="var(--secondary-dark-color)"
            color="primary"
            :ripple="false"
            @click="onDialogOK"
          />
        </footer>
      </div>
    </Suspense>
  </q-dialog>
</template>

<style lang="scss">
.confirm-dialog {
  .q-dialog__backdrop {
    background: rgba(0, 0, 0, 0.2);
  }
  .dialog-container {
    color: var(--secondary-color);
    fill: var(--secondary-color);
    width: 100%;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    min-height: 275px;
    display: flex;

    &.login {
      background-color: white;
      .dialog-bg {
        color: var(--primary-hover-color);
      }
      .login-message {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
    &.success {
      background-color: var(--primary-hover-color);
      .dialog-bg {
        color: var(--primary-dark-hover-color);
      }
      .title {
        color: var(--primary-dark-color);
        fill: var(--primary-dark-color);
        .nuxt-icon {
          font-size: 2rem;
        }
      }
    }
    &.error {
      background-color: #f9f2f2;
      .dialog-bg {
        color: #fce7e7;
      }
      .title {
        color: #e58f8d;
        fill: #e58f8d;
        .nuxt-icon {
          font-size: 1.5rem;
        }
      }
    }
    &.confirm {
      flex-direction: column;
      background-color: white;
      .dialog-bg {
        color: var(--primary-hover-color);
      }
    }

    .container {
      flex: 1;
      position: relative;
      z-index: 2;
      .dialog-bg {
        z-index: -1;
        position: absolute;
        width: 100%;
        svg {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        padding: 30px 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.125rem;
        letter-spacing: 2px;
        gap: 15px;
        .logo svg {
          width: 100%;
          height: 40px;
        }
        .title {
          font-size: 1.5rem;
          text-align: center;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 10px;
          margin: 0 0 10px;
        }
        ul {
          margin: 0;
          padding: 0;
          &.string-style {
            list-style-type: none;
            padding: 0;
          }
        }
      }
    }

    .close-icon {
      position: absolute;
      font-size: 1.5rem;
      right: 10px;
      top: 5px;
      transform: rotate(45deg);
      fill: var(--secondary-color);
      z-index: 10;
      transition: transform 0.5s ease;
      &:hover {
        cursor: pointer;
        transform: rotate(225deg);
      }
    }

    footer {
      z-index: 2;
      text-align: right;
      .action-btn {
        border-radius: 10px;
        width: 75px;
        &:first-child {
          margin: 0 10px;
        }
      }
    }
  }
  @include set-rwd(xs) {
    .dialog-container {
      min-height: 200px;
      &.login {
        background-color: var(--primary-hover-color);
      }
      .container {
        .dialog-bg {
          display: none;
        }
        .content .logo {
          width: 75%;
        }
      }
    }
  }
}
</style>
