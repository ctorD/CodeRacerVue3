<template>
  <div class="text-body1">Words Per Minute: {{ wpm }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const wpm = ref(0);
</script>

<style lang="stylus" scoped></style>
