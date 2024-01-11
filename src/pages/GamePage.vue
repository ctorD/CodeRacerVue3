<template>
  <div class="q-ma-sm q-gutter-sm">
    <div v-if="loading" class="absolute-center">
      <q-spinner color="primary" size="3em" :thickness="10" />
    </div>
    <div v-else>
      <game-menu-bar @start-game="startGame"></game-menu-bar>
      <!-- <q-btn @click="showDialog = !showDialog">SHOW DIALOG</q-btn> -->
      <code-editor v-if="lobby" :lobby="lobby"></code-editor>
      <q-dialog v-model="showDialog">
        <!-- <snippet-ranking></snippet-ranking> -->
      </q-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGame } from 'src/components/game/Game';
import CodeEditor from 'src/components/game/components/CodeEditor.vue';
import GameMenuBar from 'src/components/game/components/GameMenuBar.vue';
import { ref } from 'vue';

const showDialog = ref(false);
const { loading, lobby, useGameControls } = useGame();
const { startGame } = useGameControls();
</script>

<style>
.correct {
  color: rgb(0, 0, 0);
}

.typo {
  color: #f00;
}
.snippet {
  user-select: none;
}
</style>
