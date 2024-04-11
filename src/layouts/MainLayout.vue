<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="min-height: 100vh" class="shadow-2">
      <q-header reveal elevated>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>Quasar Framework</q-toolbar-title>

          <q-btn color="white" text-color="black" label="Logout" @click="logout" />
        </q-toolbar>
      </q-header>

      <q-footer reveal elevated>
        <q-toolbar>
          <q-toolbar-title>Footer</q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter();

defineOptions({
  name: 'MainLayout'
});

function logout() {
  localStorage.setItem('isLogged', 'false');
  router.push({ path: '/login' });
}

</script>
