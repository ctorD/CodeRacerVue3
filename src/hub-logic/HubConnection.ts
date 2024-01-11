import { ref } from 'vue';
import * as signalR from '@microsoft/signalr';
import { getUsername } from 'src/utils/LocalStorage';

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(process.env.API + '/app/lobbyHub', {
    accessTokenFactory: () => getUsername() ?? '',
  })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export const connectionId = ref('');

export async function connectToHub() {
  try {
    await connection.start();
    if (connection.connectionId) {
      connectionId.value = connection.connectionId;
    }
    console.log('connected');
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(() => connectToHub(), 5000);
  }
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
connection.onclose(async () => {
  await connectToHub();
});

connectToHub();
