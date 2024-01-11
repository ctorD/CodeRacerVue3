<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // Dark.set(localStorage.getItem('darkMode') === true ? true : false);
});
</script>
