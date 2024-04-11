<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="send">
          <q-input v-model="text" :style="inputStyle" placeholder="Write here" />
          <div class="q-banner--top-padding">
            <q-btn class="full-width" label="Send" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
const baseInputFontSize: number = 16;
const maxInputFontSize: number = 46;

const text = ref<string>('');

const inputStyle = computed<{fontSize: string}>(() => {
  const sizeIncrease = text.value.length;
  let newSize = baseInputFontSize + sizeIncrease * 0.5;
  newSize = Math.min(newSize, maxInputFontSize);

  return {
    fontSize: `${newSize }px`
  };
});

function send() {
  console.log(text)
}
</script>
