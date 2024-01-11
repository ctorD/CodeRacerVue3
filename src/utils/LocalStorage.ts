export function getUsername() {
  const user = localStorage.getItem('user');
  return user ? user : undefined;
}

export function setUsername(username: string) {
  localStorage.setItem('user', username);
}
