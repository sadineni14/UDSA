# 🐦 Chirp — Simple Microblogging App

A pure HTML/CSS/JS Twitter-style app: register, post short updates, follow other users, and see a personalized feed. No backend — all data lives in the browser's `localStorage`.

## Features
- User registration & login
- Post short (280 char) updates
- Follow / unfollow other users
- Personalized home feed (your posts + posts from people you follow)
- Explore page to discover other users
- Profile page per user with editable bio and follower/following counts
- Delete your own posts

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript (ES6)
- Browser `localStorage` for users, posts, and follow relationships

## Project Structure
```
02-microblogging-app/
├── login.html
├── register.html
├── feed.html         # home feed + post composer
├── explore.html       # discover & follow users
├── profile.html        # view/edit profile, see a user's posts
├── css/
│   └── style.css
└── js/
    ├── auth.js         # register/login/session helpers
    └── posts.js         # posts + follow/unfollow logic
```

## Setup & Run
```bash
cd 02-microblogging-app
python3 -m http.server 8000
```
Then open **http://localhost:8000/register.html**.

## How it works
1. Register / log in.
2. Go to **Explore** to see other registered users and follow them.
3. Post updates from the **Home** feed — they show up for your followers.
4. Visit any user's **profile** to follow/unfollow and view their posts.

## Note
This is a client-side demo — great for trying multiple accounts in the same browser (open a second private/incognito window to simulate a second user). Data isn't shared between different browsers or devices, and passwords aren't securely hashed.
