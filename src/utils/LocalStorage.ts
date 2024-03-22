export function getUsername() {
  const user = localStorage.getItem('user');
  return user ? user : undefined;
}

export function setUsername(username: string | undefined) {
  if (username == '' || username == undefined) {
    console.log('null user');
    localStorage.removeItem('user');
  } else {
    localStorage.setItem('user', username);
  }
}
