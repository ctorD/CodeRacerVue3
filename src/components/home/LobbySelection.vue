<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Join Lobby</div>
      <q-space></q-space>
      <q-btn icon="refresh" @click="getLobbies" flat></q-btn>
    </q-card-section>

    <q-separator />
    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="(lobby, index) in lobbies"
        :key="index"
        @click="join(lobby.lobbyId)"
      >
        <q-item-section>
          <q-item-label>{{ lobby.lobbyName }}</q-item-label>
          <q-item-label caption>
            <div v-for="(player, index) in lobby.players" :key="index">
              {{ player.name }}
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption
            >{{ lobby.players.length }}/ {{ lobby.maxPlayers }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { useLobbyManager } from 'src/components/game/Game';
import { ref } from 'vue';
export interface Lobby {
  host: string;
  lobbyId: string;
  lobbyName: string;
  maxPlayers: number;
  players: { connectionId: string; name: string; ready: boolean }[];
  snippet: string;
}

const lobbies = ref<Lobby[]>([]);

const { joinLobby } = useLobbyManager();

function getLobbies() {
  fetch(process.env.API + '/api/lobbies').then((result) => {
    result.json().then((value) => {
      lobbies.value = value as Lobby[];
    });
    console.log(result);
  });
}

function join(lobbyId: string) {
  //
  joinLobby(lobbyId);
  //Go to game
}
getLobbies();
</script>
localho
