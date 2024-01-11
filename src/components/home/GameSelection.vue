<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Start A Game</div>
        <q-separator />
      </q-card-section>

      <q-list>
        <q-item clickable v-ripple @click="createLobby(true)">
          <q-item-section avatar>
            <q-icon color="primary" name="flag" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Create Online Race</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="createLobby(false)">
          <q-item-section avatar>
            <q-icon color="primary" name="outlined_flag" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Offline Race</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <q-dialog v-model="createLobbyDialog">
      <CreateLobbyModal :online="onlineVal"></CreateLobbyModal>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CreateLobbyModal from './modals/CreateLobbyModal.vue';

const createLobbyDialog = ref(false);
const onlineVal = ref(false);

function createLobby(online: boolean) {
  onlineVal.value = online;
  createLobbyDialog.value = true;
}
</script>
