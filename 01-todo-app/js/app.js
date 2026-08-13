requireAuth();
const currentUser = getSession();
document.getElementById('userGreeting').textContent = `Hi, ${currentUser}`;

function taskKey() { return `todo_tasks_${currentUser}`; }
function getTasks() { return JSON.parse(localStorage.getItem(taskKey()) || '[]'); }
function saveTasks(tasks) { localStorage.setItem(taskKey(), JSON.stringify(tasks)); }

let currentFilter = 'all';

function priorityBadge(p) {
  const cls = p === 'High' ? 'badge-danger' : p === 'Medium' ? 'badge-warning' : 'badge-muted';
  return `<span class="badge ${cls}">${p}</span>`;
}

function render() {
  const tasks = getTasks();
  let filtered = tasks;
  if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);

  const list = document.getElementById('taskList');
  if (filtered.length === 0) {
    list.innerHTML = '<div class="card empty-state">No tasks here yet.</div>';
  } else {
    list.innerHTML = filtered.map(t => `
      <div class="card mb-2">
        <div class="flex-between">
          <div style="flex:1">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
              <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask(${t.id})" style="width:auto;margin:0;">
              <strong style="${t.completed ? 'text-decoration:line-through;color:#9ca3af' : ''}">${escapeHtml(t.title)}</strong>
            </label>
            ${t.description ? `<p class="text-muted mt-2" style="font-size:0.85rem;margin-left:24px;">${escapeHtml(t.description)}</p>` : ''}
            <div style="margin-left:24px;margin-top:6px;">${priorityBadge(t.priority)}</div>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-outline btn-sm" onclick="openEditModal(${t.id})">Edit</button>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteTask(${t.id})">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('statTotal').textContent = tasks.length;
  document.getElementById('statDone').textContent = tasks.filter(t => t.completed).length;
  document.getElementById('statPending').textContent = tasks.filter(t => !t.completed).length;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const priority = document.getElementById('priority').value;
  if (!title) return;
  const tasks = getTasks();
  tasks.unshift({ id: Date.now(), title, description, priority, completed: false, created: new Date().toISOString() });
  saveTasks(tasks);
  this.reset();
  document.getElementById('priority').value = 'Medium';
  render();
});

function toggleTask(id) {
  const tasks = getTasks();
  const t = tasks.find(x => x.id === id);
  if (t) t.completed = !t.completed;
  saveTasks(tasks);
  render();
}

function deleteTask(id) {
  if (!confirm('Delete this task?')) return;
  saveTasks(getTasks().filter(t => t.id !== id));
  render();
}

function openEditModal(id) {
  const t = getTasks().find(x => x.id === id);
  if (!t) return;
  document.getElementById('editId').value = t.id;
  document.getElementById('editTitle').value = t.title;
  document.getElementById('editDescription').value = t.description;
  document.getElementById('editPriority').value = t.priority;
  document.getElementById('editModal').style.display = 'flex';
}
function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}
document.getElementById('editForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const id = Number(document.getElementById('editId').value);
  const tasks = getTasks();
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.title = document.getElementById('editTitle').value.trim();
    t.description = document.getElementById('editDescription').value.trim();
    t.priority = document.getElementById('editPriority').value;
  }
  saveTasks(tasks);
  closeEditModal();
  render();
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    render();
  });
});

render();
