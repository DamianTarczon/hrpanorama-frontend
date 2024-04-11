<template>
  <div class="full-width full-height flex justify-center items-center q-layout-padding" style="min-height: 100vh">
    <q-card class="card-width">
      <q-card-section>
        <q-form @submit.prevent="login">
          <q-input v-model="username" label="Username" />
          <q-input v-model="password" label="Password" type="password" />
          <div class="q-banner--top-padding">
            <q-btn label="Login" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useQuasar} from 'quasar'

const router = useRouter();
const $q = useQuasar()

const username = ref('');
const password = ref('');

function login() {
  if (username.value === 'admin' && password.value === 'admin') {
    localStorage.setItem('token', 'jhgkj1yrUFYfkgiFGUYGF82GJSGkjv');
    router.push({ path: '/' });
  } else {
    $q.notify({
      color: 'negative',
      message: 'Invalid username or password',
      position: 'top'
    });
  }
}
</script>

<style lang="scss" scoped>
.card-width {
  width: 50%;
}

</style>
