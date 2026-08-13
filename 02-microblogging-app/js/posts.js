const DB_POSTS = 'chirp_posts';

function getPosts() { return JSON.parse(localStorage.getItem(DB_POSTS) || '[]'); }
function savePosts(posts) { localStorage.setItem(DB_POSTS, JSON.stringify(posts)); }

function addPost(username, content) {
  const posts = getPosts();
  posts.push({ id: Date.now(), username, content, created: Date.now() });
  savePosts(posts);
}

function removePost(id) {
  savePosts(getPosts().filter(p => p.id !== id));
}

function isFollowing(followerUsername, targetUsername) {
  const user = getUsers().find(u => u.username === followerUsername);
  return user && user.following && user.following.includes(targetUsername);
}

function toggleFollow(followerUsername, targetUsername) {
  const users = getUsers();
  const user = users.find(u => u.username === followerUsername);
  if (!user.following) user.following = [];
  const idx = user.following.indexOf(targetUsername);
  if (idx >= 0) user.following.splice(idx, 1);
  else user.following.push(targetUsername);
  saveUsers(users);
}

function followerCount(username) {
  return getUsers().filter(u => (u.following || []).includes(username)).length;
}
function followingCount(username) {
  const user = getUsers().find(u => u.username === username);
  return user && user.following ? user.following.length : 0;
}
