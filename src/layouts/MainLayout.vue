<template>
  <q-layout view="lHh Lpr lFf" class="ibm-plex">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Code Racer </q-toolbar-title>

        <q-btn
          @click="userModel = true"
          :label="displayName"
          icon="person"
        ></q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Navigation </q-item-label>

        <q-item clickable v-ripple @click="$router.push('/')">
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="toggleDark">
          <q-item-section avatar>
            <q-icon color="primary" name="nights_stay" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Toggle Dark Mode</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-dialog @hide="displayName = getDisplayName()" v-model="userModel">
        <set-username-modal></set-username-modal>
      </q-dialog>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dark } from 'quasar';
import { connectionId } from 'src/hub-logic/HubConnection';
import SetUsernameModal from 'src/components/home/modals/SetUsernameModal.vue';
import { getUsername } from 'src/utils/LocalStorage';

const leftDrawerOpen = ref(false);
const displayName = ref(getDisplayName());

function getDisplayName() {
  const username = getUsername();
  return username ? username : connectionId.value;
}

function toggleDark() {
  Dark.toggle();
  localStorage.setItem('darkMode', Dark.isActive.toString());
}

const userModel = ref(false);
</script>
