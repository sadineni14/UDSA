# 🍔 QuickBite — Food Delivery Website

Browse restaurants, view menus, add items to a cart, and place an order — with order history. Pure HTML/CSS/JS, no backend, data stored in `localStorage`.

## Features
- User registration & login (with delivery address)
- Browse a list of restaurants (pre-seeded with sample data on first load)
- View each restaurant's menu
- Add items to a cart (one restaurant per cart at a time)
- Checkout to place an order
- View your past orders with itemized totals

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript (ES6)
- `localStorage` for restaurants (seed data), cart, and order history

## Project Structure
```
03-food-delivery-app/
├── index.html         # restaurant listing
├── restaurant.html     # menu + add to cart
├── cart.html
├── orders.html
├── login.html
├── register.html
├── css/
│   └── style.css
└── js/
    ├── auth.js          # register/login/session helpers
    └── data.js           # restaurants (seeded), cart, orders
```

## Setup & Run
```bash
cd 03-food-delivery-app
python3 -m http.server 8000
```
Then open **http://localhost:8000/register.html**. Sample restaurants and menu items are seeded automatically on first load.

## How it works
1. Register / log in.
2. Browse restaurants on the home page and open one to see its menu.
3. Add menu items to your cart (switching restaurants clears the current cart).
4. Go to **Cart**, review items, and place the order.
5. Check **My Orders** for order history.

## Note
This is a client-side demo — orders and accounts live only in your browser's `localStorage`, not on a real server.
