<script setup lang="ts"></script>

<template>
  <section class="calendar-form-block">
    <div class="form-block" style="height: 250px">form-block</div>
    <div class="footer">
      <q-btn unelevated class="submit-btn">
        <div>送出訂單</div>
      </q-btn>
    </div>
  </section>
</template>

<style scoped lang="scss">
.calendar-form-block {
  .footer {
    padding: 0 15px;
  }
  .footer {
    display: flex;
    align-items: center;
    .submit-btn {
      width: 100%;
      height: 70%;
      background-color: var(--primary-color);
      color: var(--secondary-color);
      font-size: 1.125rem;
      letter-spacing: 2px;
      border-radius: 10px;
    }
  }
}
</style>
