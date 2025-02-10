<script setup lang="ts">
import type { IService, IBathProduct } from "@/stores/services";
interface Props {
  pageService: IService;
  bathProducts: IBathProduct[];
}
defineProps<Props>();
</script>

<template>
  <section class="basic-form-block">
    <div class="form-block">
      <div class="group-form">
        <h6 class="m-0">
          <nuxt-icon name="puzzle-piece" class="puzzle-icon" filled />基本資訊
        </h6>
        <div class="input-group">
          <label>預約人姓名</label>
          <q-input
            :model-value="'預約人姓名'"
            outlined
            dense
            rounded
            placeholder="姓名"
          />
        </div>
        <div class="input-group">
          <label>聯絡電話</label>
          <q-input
            :model-value="null"
            outlined
            dense
            rounded
            type="number"
            placeholder="聯絡電話"
          />
        </div>
        <div class="input-group">
          <label>寶貝資訊</label>
          <CommonPetCategorySelect :model-value="1" />
          <q-input
            outlined
            dense
            rounded
            :model-value="'寶貝名字'"
            placeholder="寶貝名字"
          />
        </div>
      </div>
      <div class="group-form">
        <h6 class="m-0">
          <nuxt-icon name="puzzle-piece" class="puzzle-icon" filled />預約內容
        </h6>
        <div class="input-group">
          <label>預約時段</label>
          <div class="q-input read-only">2024/12/25 13:30</div>
        </div>
        <div class="input-group">
          <label>預約內容</label>
          <div class="q-input read-only">{{ pageService.display_name }}</div>
        </div>
      </div>
      <div
        v-if="pageService.has_bath_products"
        class="group-form bath-checkbox"
      >
        <p class="m-0">
          加值選購<nuxt-icon name="plus" filled class="plus-icon" />
        </p>
        <div class="input-group">
          <div
            v-for="bathProduct in bathProducts"
            class="checkbox-box"
            :class="{ active: bathProduct.id === 1 }"
          >
            <div>{{ bathProduct.name }}</div>
            <div>+{{ bathProduct.price }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <h4 class="m-0">1,000</h4>
        <h5 class="plus letter-spacing-text m-0">+200</h5>
      </div>
      <div class="right">
        <h6 class="m-0 letter-spacing-text">總計</h6>
        <h4 class="m-0">NT 1,200</h4>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.basic-form-block {
  .puzzle-icon {
    margin-right: 10px;
    :deep(svg) {
      transform: rotate(270deg) translateX(2px);
    }
  }
  .form-block,
  .footer {
    padding: 0 15px;
  }
  .group-form {
    margin-bottom: 1.5rem;
    h6 {
      margin-bottom: 0.25rem;
    }
    .input-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      padding: 5px 0;
      label:first-child {
        flex: 0 0 90px;
      }
      .q-input {
        flex: 1;
        &.read-only {
          background: #a39991;
          line-height: 40px;
          padding: 0 1rem;
          border-radius: 28px;
        }
      }
      :deep(.pet-category-select) {
        flex: 0 0 180px;
      }
    }
    &.bath-checkbox {
      padding-top: 10px;
      margin-bottom: 10px;
      p {
        color: var(--primary-color);
        fill: var(--primary-color);
        font-size: 1.125rem;
        :deep(.plus-icon svg) {
          transform: translate(2px, -10px);
        }
      }
      .input-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 5px;
        .checkbox-box {
          color: white;
          border: 1px solid;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 30px;
          cursor: pointer;
          &.active,
          &:hover {
            color: var(--secondary-color);
            background-color: #fceed4;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
  .footer {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left,
    .right {
      display: flex;
      align-items: flex-end;
      gap: 5px;
    }
    h4 {
      font-size: 1.75rem;
      letter-spacing: 3px;
    }
    .letter-spacing-text {
      letter-spacing: 1px;
      padding: 0 5px;
    }
    .plus {
      color: var(--primary-color);
    }
  }
}
</style>
