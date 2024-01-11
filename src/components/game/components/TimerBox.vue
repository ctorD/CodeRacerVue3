<template>
  <div class="div text-body1">{{ time }}</div>
</template>

<script setup lang="ts">
import { useGame } from '../Game';
const { time } = useGame().useTimer();
</script>

<style lang="stylus" scoped></style>
