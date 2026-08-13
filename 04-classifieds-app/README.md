# 🏷️ MarketPlace — Classifieds Web App

Buy and sell used products. Pure HTML/CSS/JS, no backend — post listings, browse/search by category, and manage your own ads, all stored in `localStorage`.

## Features
- User registration & login
- Post a classified ad (title, description, price, category, image URL)
- Browse all available listings with search and category filter
- View listing details
- Manage your own listings: edit, mark sold/available, delete

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript (ES6)
- `localStorage` for users and listings

## Project Structure
```
04-classifieds-app/
├── index.html          # browse + search/filter
├── detail.html
├── post.html
├── my-listings.html
├── login.html
├── register.html
├── css/
│   └── style.css
└── js/
    ├── auth.js           # register/login/session helpers
    └── data.js             # listings CRUD + categories
```

## Setup & Run
```bash
cd 04-classifieds-app
python3 -m http.server 8000
```
Then open **http://localhost:8000/register.html**.

## How it works
1. Register / log in.
2. Click **+ Post Ad** to list an item for sale.
3. Browse and search listings from the home page; filter by category.
4. Manage your posted items from **My Listings** (edit, mark sold, delete).

## Note
This is a client-side demo. Listings and accounts only persist in the browser you used — there's no shared server-side database.
