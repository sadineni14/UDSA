const DB_USERS = 'quickbite_users';
const DB_SESSION = 'quickbite_session';

function getUsers() { return JSON.parse(localStorage.getItem(DB_USERS) || '[]'); }
function saveUsers(users) { localStorage.setItem(DB_USERS, JSON.stringify(users)); }
function getSession() { return localStorage.getItem(DB_SESSION); }
function setSession(username) { localStorage.setItem(DB_SESSION, username); }
function clearSession() { localStorage.removeItem(DB_SESSION); }
function requireAuth() { if (!getSession()) window.location.href = 'login.html'; }
function redirectIfLoggedIn() { if (getSession()) window.location.href = 'index.html'; }

function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const address = document.getElementById('address').value.trim();
  const msg = document.getElementById('formMsg');
  if (!username || !password) {
    msg.innerHTML = '<div class="alert alert-danger">Username and password are required.</div>';
    return;
  }
  const users = getUsers();
  if (users.find(u => u.username === username)) {
    msg.innerHTML = '<div class="alert alert-danger">Username already exists.</div>';
    return;
  }
  users.push({ username, password, address });
  saveUsers(users);
  msg.innerHTML = '<div class="alert alert-success">Account created! Redirecting...</div>';
  setTimeout(() => window.location.href = 'login.html', 900);
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const msg = document.getElementById('formMsg');
  const user = getUsers().find(u => u.username === username && u.password === password);
  if (!user) {
    msg.innerHTML = '<div class="alert alert-danger">Invalid username or password.</div>';
    return;
  }
  setSession(username);
  window.location.href = 'index.html';
}

function logout() {
  clearSession();
  window.location.href = 'login.html';
}
