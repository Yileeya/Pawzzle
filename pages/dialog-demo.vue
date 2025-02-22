<script setup lang="ts">
import Dialog from '@/components/common/Dialog.vue';
const $q = useQuasar();
function showDialog(target: string, isMultiple?: boolean) {
  let contentMsg = [''];
  if (target === 'success') {
    contentMsg = ['預約成功！'];
  } else if (target === 'error') {
    contentMsg = isMultiple
      ? ['時間已被預約，請重新選擇。', '錯誤訊息二']
      : ['時間已被預約，請重新選擇。'];
  }

  $q.dialog({
    component: Dialog,
    componentProps: {
      mode: target,
      content: contentMsg
    }
  })
    .onOk((a) => {
      console.log('OK', a);
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('I am triggered on both OK and Cancel');
    });
}
</script>

<template>
  <div>
    <q-btn label="login" @click="showDialog('login')" />
    <q-btn label="success" color="primary" @click="showDialog('success')" />
    <q-btn label="error" color="negative" @click="showDialog('error', false)" />
    <q-btn label="error isMultiple" color="negative" @click="showDialog('error', true)" />
  </div>
</template>
