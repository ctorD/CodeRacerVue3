import { connection } from './HubConnection';
import { Lobby } from './Inferfaces';

export function useLobbyManager() {
  function joinLobby(lobbyId: string) {
    //

    connection.invoke('JoinLobby', lobbyId).catch((err) => console.error(err));
  }

  function createOnlineLobby(lobbyName: string, lang: string) {
    console.log('creatingLobby');
    connection
      .invoke('CreateLobby', lobbyName, lang, true)
      .catch((err) => console.error(err));
  }

  function createOfflineLobby(lobbyName: string, lang: string) {
    lang;
    lobbyName;
    console.log('creatingLobby');
  }

  return { joinLobby, createOnlineLobby, createOfflineLobby };
}

export function useCodeRacer() {
  // const timer = ref('');

  function getLobby(id: string): Promise<Lobby> {
    return new Promise((resolve, reject) => {
      fetch(process.env.API + '/api/lobbies').then((result) => {
        result.json().then((value) => {
          const lobbies = value as Lobby[];
          const lobby = lobbies.find((e) => e.lobbyId == id);
          if (lobby) {
            resolve(lobby);
          }
          reject('Get Lobby Failed');
        });
      });
    });
  }

  function startGame(lobbyId: string) {
    connection.invoke('StartGame', lobbyId).catch((err) => console.error(err));
  }

  connection.on('UpdateTimer', (timer) => {
    timer.vaule = timer;
  });

  return { getLobby, startGame };
}
