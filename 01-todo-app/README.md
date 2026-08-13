# ✅ To-Do List Manager

A pure HTML/CSS/JS web app where users can register, log in, and manage their personal to-do list. No backend — all data is stored in the browser via `localStorage`.

## Features
- User registration & login (client-side, stored in `localStorage`)
- Add, edit, delete tasks
- Mark tasks complete / active
- Priority levels (Low / Medium / High)
- Filter tasks by All / Active / Completed
- Task summary counters

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript (ES6)
- Browser `localStorage` for persistence (per-username task lists)

## Project Structure
```
01-todo-app/
├── index.html      # main task dashboard (requires login)
├── login.html
├── register.html
├── css/
│   └── style.css
└── js/
    ├── auth.js      # register/login/session helpers
    └── app.js        # task CRUD logic
```

## Setup & Run
No installation needed. Because the pages use `localStorage`, they work best served over `http://` rather than opened directly as `file://`. From this folder run:
```bash
cd 01-todo-app
python3 -m http.server 8000
```
Then open **http://localhost:8000/register.html** in your browser.

(You can also just double-click `register.html` — it will work in most modern browsers too.)

## How it works
1. Register a new account (stored in your browser's `localStorage`).
2. Log in.
3. Add tasks with a title, optional description, and priority.
4. Check the checkbox to mark a task complete, or use Edit/Delete.
5. Use the All / Active / Completed tabs to filter tasks.

## Note
This is a client-side demo. Since there's no real server or database, accounts and tasks only exist in the browser/profile you used, and passwords are **not** securely hashed — don't reuse real passwords here.
