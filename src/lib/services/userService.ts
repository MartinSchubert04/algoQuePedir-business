const STORAGE_KEY = "usuarios";

export interface User {
  username: string;
  password: string;
}

export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function registerUser(user: User): boolean {
  const users = getUsers();

  // evitar duplicados
  if (users.some((u) => u.username === user.username)) {
    return false;
  }

  users.push(user);
  saveUsers(users);
  return true;
}

// Verificar login
export function loginUser(username: string, password: string): boolean {
  const users = getUsers();
  return users.some(
    (u) => u.username === username && u.password === password
  );
}
