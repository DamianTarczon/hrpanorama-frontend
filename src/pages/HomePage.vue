<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="handleFormSubmit" ref="myForm">
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
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="showDialog" @hide="clearPdfUrl" auto-close>
      <q-card>
        <q-card-section>
          <a :href="pdfUrl" title="hrPanorama" target="_blank">{{pdfUrl}}</a>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {QForm, useQuasar} from 'quasar';
import {api} from 'boot/axios';
import {AxiosError} from 'axios';
const baseInputFontSize = 16;
const maxInputFontSize = 46;

const text = ref<string>('');
const pdfUrl = ref<string>('');
const showDialog = ref<boolean>(!!pdfUrl.value);
const isLoading = ref<boolean>(false);
const myForm = ref<QForm>();
const $q = useQuasar()

const inputStyle = computed<{fontSize: string}>(() => {
  const sizeIncrease = text.value.length;
  let newSize = baseInputFontSize + sizeIncrease * 0.5;
  newSize = Math.min(newSize, maxInputFontSize);

  return {
    fontSize: `${newSize }px`
  };
});

async function handleFormSubmit() {
  const token = localStorage.getItem('token');
  const data = { text: text.value };

  isLoading.value = true;
  try {
    const response = await api.post('/index.php', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if(response.data){
      pdfUrl.value = response.data.url;
      showDialog.value = true;
      text.value = '';
      myForm.value?.reset();
    }
  } catch (err) {
    const error = err as AxiosError;
    $q.notify({
      color: 'negative',
      message: error.message,
      position: 'top'
    });
  } finally {
    isLoading.value = false;
  }
}

function clearPdfUrl() {
  pdfUrl.value = '';
  showDialog.value = false;
}
</script>
