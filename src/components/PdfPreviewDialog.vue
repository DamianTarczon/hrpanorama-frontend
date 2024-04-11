<template>
  <q-dialog v-model="isVisible" @hide="closeDialog" auto-close>
    <q-card style="max-width: 100%">
      <q-card-section style="height: 80vh; width: 90vw">
        <iframe v-if="pdfUrl" :src="pdfUrl" frameborder="0" class="full-width full-height"></iframe>
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <q-btn flat label="Close" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const isVisible = defineModel<boolean>();

defineProps({
  pdfUrl: String
});

const emits = defineEmits(['update:isVisible', 'onHide']);

function closeDialog() {
  emits('onHide');
}
</script>
