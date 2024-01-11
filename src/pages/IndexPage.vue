<template>
  <q-page class="row items-start justify-evenly">
    <div class="col q-pa-sm">
      <game-selection></game-selection>
    </div>
    <div class="col q-pa-sm">
      <lobby-selection></lobby-selection>
    </div>
    <div class="col q-pa-sm">
      <!-- <leaderboard></leaderboard> -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import GameSelection from 'src/components/home/GameSelection.vue';
import LobbySelection from 'src/components/home/LobbySelection.vue';
</script>
