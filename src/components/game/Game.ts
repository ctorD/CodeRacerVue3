/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lobby } from 'src/hub-logic/Inferfaces';
import { connection } from 'src/hub-logic/HubConnection';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

function getLobby(id: string): Promise<Lobby> {
  return new Promise((resolve, reject) => {
    fetch(process.env.API + '/api/lobbies').then((result) => {
      result.json().then((value) => {
        const lobbies = value as Lobby[];
        const lobby = lobbies.find((e) => e.lobbyId == id);
        if (lobby != undefined) {
          resolve(lobby);
        }
        reject();
      });
    });
  });
}

const lobby = ref<Lobby>();
const loading = ref(true);
const editorEnabled = ref(false);
const countDown = ref(3);
const complete = ref(false);
export const leaderboard = ref<any[]>([]);

const time = ref('00:00:00.000');

let timeBegan: any = null,
  timeStopped: any = null,
  stoppedDuration = 0,
  started: any = null,
  running = false;

export function useGame() {
  function useTimer() {
    function reset() {
      running = false;
      clearInterval(started);
      stoppedDuration = 0;
      timeBegan = null;
      timeStopped = null;
      time.value = '00:00:00.000';
    }

    function zeroPrefix(num: any, digit: any) {
      let zero = '';
      for (let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }

    function clockRunning() {
      const currentTime = new Date();
      const timeElapsed = new Date(
        (currentTime as any) - timeBegan - stoppedDuration
      );
      const hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds(),
        ms = timeElapsed.getUTCMilliseconds();

      time.value =
        zeroPrefix(hour, 2) +
        ':' +
        zeroPrefix(min, 2) +
        ':' +
        zeroPrefix(sec, 2) +
        '.' +
        zeroPrefix(ms, 3);
    }

    function start() {
      if (running) return;

      if (timeBegan === null) {
        reset();
        timeBegan = new Date();
      }

      if (timeStopped !== null) {
        stoppedDuration += (new Date() as any) - timeStopped;
      }

      started = setInterval(clockRunning, 10);
      running = true;
    }

    function stop() {
      running = false;
      timeStopped = new Date();
      clearInterval(started);
    }

    return { time, start, stop, reset };
  }

  function useGameControls() {
    function initalise() {
      time.value = '00:00:00';
      countDown.value = 3;
      loading.value = true;
      useTimer().reset();
      editorEnabled.value = false;
      lobby.value = undefined;
      complete.value = false;
    }

    function userComplete() {
      useTimer().stop();
      time.value == undefined;
      if (!complete.value) {
        connection.invoke('UserComplete', lobby.value?.lobbyId, time.value);
        complete.value = true;
      }
    }

    function startGame() {
      connection.invoke('ReadyUp', lobby.value?.lobbyId);
    }

    function runGame() {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      editorEnabled.value = true;
      useTimer().start();
    }

    connection.on('StartGame', () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useCountDown().startCountDown();
    });

    connection.on('UpdateScoreboard', (score: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      console.log('updateScorboard', score);
      leaderboard.value = score;
      useCountDown().startCountDown();
    });

    return { startGame, stop, initalise, userComplete, runGame };
  }

  function useCountDown() {
    let countdownInterval: NodeJS.Timeout;

    function startCountDown() {
      countdownInterval = setInterval(function () {
        if (countDown.value > 0) {
          countDown.value = countDown.value - 1;
        } else {
          //start Game and timer
          if (!complete.value) {
            clearInterval(countdownInterval);
            useGameControls().runGame();
          }
        }
      }, 3000);
    }

    function resetCountDown() {
      clearInterval(countdownInterval);
    }

    return { startCountDown, resetCountDown, countDown };
  }

  return {
    useCountDown,
    useGameControls,
    useTimer,
    lobby,
    loading,
    editorEnabled,
  };
}

export function useLobbyManager() {
  const router = useRouter();
  function joinLobby(lobbyId: string) {
    connection.invoke('JoinLobby', lobbyId).catch((err) => console.error(err));
    console.log('getting lobby');
    getLobby(lobbyId).then((val) => {
      useGame().useGameControls().initalise();
      lobby.value = val;
      loading.value = false;

      console.log('going to Lobby' + val);
      router.push({ name: 'game', params: { id: lobbyId } });

      console.log('got Lobby' + val.lobbyId);
    });
  }

  function createOnlineLobby(lobbyName: string, lang: string) {
    console.log('creatingLobby');
    connection
      .invoke('CreateLobby', lobbyName, lang, true)
      .catch((err: any) => console.error(err));
  }

  function createOfflineLobby(lobbyName: string, lang: string) {
    console.log('creatingLobby', lobbyName, lang);
  }

  return { joinLobby, createOnlineLobby, createOfflineLobby };
}
