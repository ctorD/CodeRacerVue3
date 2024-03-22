<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Create Lobby</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input label="Lobby Name" v-model="lobbyName"></q-input>
      <q-select
        :options="langOptions"
        label="Language"
        v-model="lang"
      ></q-select>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        @click="create"
        flat
        label="Submit"
        color="primary"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useLobbyManager } from 'src/hub-logic/CodeRacer';
import { ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  online: {
    type: Boolean,
    required: true,
  },
});
const lobbyName = ref('');
const lang = ref('JS');
const langOptions = ['JS', 'TS', 'CSharp'];

const { createOnlineLobby, createOfflineLobby } = useLobbyManager();

function create() {
  console.log('create');
  props.online
    ? createOnlineLobby(lobbyName.value, lang.value)
    : createOfflineLobby('Test', lang.value);
}
</script>
