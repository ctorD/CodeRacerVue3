<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Set Username</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input label="Username" v-model="username"></q-input>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        @click="addUser"
        flat
        label="Submit"
        color="primary"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { getUsername, setUsername } from 'src/utils/LocalStorage';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const username = ref(getUsername());

    function addUser() {
      setUsername(username.value);
    }

    return { username, addUser };
  },
});
</script>
