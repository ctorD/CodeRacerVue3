<template>
  <q-card class="row justify-center items-stretch">
    <div class="col q-ma-sm">
      <countdown-timer></countdown-timer>
      <wpm-counter></wpm-counter>
      <timer-box></timer-box>
    </div>
    <q-separator vertical></q-separator>
    <div class="col q-ma-sm">
      <div class="text-center">Leaderboard</div>
      <q-separator></q-separator>
      <!-- <div v-for="(item, index) in leaderboard" :key="index">
        {{ item.item1 }} - {{ item.item2.minutes }} Minutes,
        {{ item.item2.seconds }}.{{ item.item2.milliseconds }} Seconds
      </div> -->
      <div v-for="(item, index) in leaderboard" :key="index">
        {{ item.item1 }} - {{ item.item2 }}
      </div>
    </div>
    <q-separator vertical></q-separator>
    <div class="col-1">
      <q-btn style="width: 100%; height: 100%" @click="start">Start</q-btn>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import TimerBox from './TimerBox.vue';
import WpmCounter from './WpmCounter.vue';
import CountdownTimer from './CountdownTimer.vue';
import { leaderboard } from '../Game';

const emit = defineEmits(['start-game']);
function start() {
  emit('start-game');
}
</script>
