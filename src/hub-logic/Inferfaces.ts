export interface Lobby {
  host: string;
  lobbyId: string;
  lobbyName: string;
  maxPlayers: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  players: any;
  snippet: string;
}
