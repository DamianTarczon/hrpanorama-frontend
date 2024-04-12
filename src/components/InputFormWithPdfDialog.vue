<template>
  <q-page class="row items-center justify-evenly">
    <q-form @submit.prevent="handleFormSubmit" ref="myForm">
      <q-card>
        <q-card-section>
          <q-input
            v-model="text"
            placeholder="Write here"
            :style="inputStyle"
            :rules="[val => !!val || 'Field is required']"
          />
          <div class="q-banner--top-padding">
            <q-btn
              class="full-width"
              label="Send"
              type="submit"
              color="primary"
              :loading="isLoading"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
    <PdfPreviewDialog
      v-model="showDialog"
      :pdfUrl="pdfUrl"
      @update:isVisible="showDialog = $event"
      :closeDialog="onDialogHide"
    />
  </q-page>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {QForm, useQuasar} from 'quasar';
import PdfPreviewDialog from 'components/PdfPreviewDialog.vue';
import {apiGetPdf} from 'src/services/pdfService';
const baseInputFontSize = 16;
const maxInputFontSize = 46;
const scalingNumber = 0.5;
const $q = useQuasar();

const text = ref<string>('');
const pdfUrl = ref<string>('');
const showDialog = ref<boolean>(!!pdfUrl.value);
const isLoading = ref<boolean>(false);
const myForm = ref<QForm>();

const inputStyle = computed<{fontSize: string}>(() => {
  const sizeIncrease = Math.min(text.value.length * scalingNumber, maxInputFontSize - baseInputFontSize);
  return { fontSize: `${baseInputFontSize + sizeIncrease}px` };
});

async function handleFormSubmit() {
  isLoading.value = true;

  const {
    responseUrl,
    message
  } = await apiGetPdf(text.value);

  if (responseUrl) {
    pdfUrl.value = responseUrl;
    showDialog.value = true;
    text.value = '';
    myForm.value?.reset();
  } else if (message) {
    $q.notify({
      color: 'negative',
      message: message,
      position: 'top'
    });
  }

  isLoading.value = false;
}

function onDialogHide() {
  pdfUrl.value = '';
  showDialog.value = false;
}
</script>
