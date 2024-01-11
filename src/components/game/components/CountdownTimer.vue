<template>
  <div class="text-body1">Starting in: {{ countDown }}</div>
</template>

<script setup lang="ts">
import { useGame } from '../Game';
const { countDown } = useGame().useCountDown();
</script>

<style lang="stylus" scoped></style>
