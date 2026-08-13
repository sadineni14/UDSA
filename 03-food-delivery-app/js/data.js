const DB_RESTAURANTS = 'quickbite_restaurants';
const DB_ORDERS = 'quickbite_orders';
const DB_CART = 'quickbite_cart';

const SEED_RESTAURANTS = [
  {
    id: 1, name: 'Spice Villa', cuisine: 'Indian', description: 'Authentic North Indian curries and tandoori.',
    menu: [
      { id: 101, name: 'Butter Chicken', price: 250, description: 'Creamy tomato curry with tender chicken' },
      { id: 102, name: 'Paneer Tikka', price: 200, description: 'Grilled cottage cheese skewers' },
      { id: 103, name: 'Garlic Naan', price: 50, description: 'Freshly baked garlic flatbread' }
    ]
  },
  {
    id: 2, name: 'Pizza Point', cuisine: 'Italian', description: 'Wood-fired pizzas made fresh to order.',
    menu: [
      { id: 201, name: 'Margherita Pizza', price: 220, description: 'Classic cheese and tomato pizza' },
      { id: 202, name: 'Pepperoni Pizza', price: 280, description: 'Loaded with pepperoni and mozzarella' },
      { id: 203, name: 'Garlic Bread', price: 90, description: 'Crispy bread with garlic butter' }
    ]
  },
  {
    id: 3, name: 'Dragon Wok', cuisine: 'Chinese', description: 'Wok-tossed Indo-Chinese favourites.',
    menu: [
      { id: 301, name: 'Veg Fried Rice', price: 150, description: 'Wok-fried rice with vegetables' },
      { id: 302, name: 'Chilli Chicken', price: 210, description: 'Spicy stir-fried chicken' },
      { id: 303, name: 'Manchow Soup', price: 120, description: 'Hot and spicy Chinese soup' }
    ]
  },
  {
    id: 4, name: 'Burger Barn', cuisine: 'American', description: 'Juicy burgers and crispy fries.',
    menu: [
      { id: 401, name: 'Classic Cheeseburger', price: 180, description: 'Beef patty with cheddar cheese' },
      { id: 402, name: 'Veggie Burger', price: 160, description: 'Grilled veggie patty burger' },
      { id: 403, name: 'French Fries', price: 90, description: 'Crispy golden fries' }
    ]
  }
];

function getRestaurants() {
  let data = JSON.parse(localStorage.getItem(DB_RESTAURANTS) || 'null');
  if (!data) {
    data = SEED_RESTAURANTS;
    localStorage.setItem(DB_RESTAURANTS, JSON.stringify(data));
  }
  return data;
}

function getCart() { return JSON.parse(localStorage.getItem(DB_CART) || '{"restaurantId":null,"items":{}}'); }
function saveCart(cart) { localStorage.setItem(DB_CART, JSON.stringify(cart)); }
function clearCart() { saveCart({ restaurantId: null, items: {} }); }

function addToCart(restaurantId, itemId) {
  let cart = getCart();
  if (cart.restaurantId !== null && cart.restaurantId !== restaurantId) {
    cart = { restaurantId, items: {} };
  }
  cart.restaurantId = restaurantId;
  cart.items[itemId] = (cart.items[itemId] || 0) + 1;
  saveCart(cart);
}

function removeFromCart(itemId) {
  const cart = getCart();
  delete cart.items[itemId];
  if (Object.keys(cart.items).length === 0) cart.restaurantId = null;
  saveCart(cart);
}

function findMenuItem(itemId) {
  for (const r of getRestaurants()) {
    const item = r.menu.find(m => m.id === Number(itemId));
    if (item) return { item, restaurant: r };
  }
  return null;
}

function getOrders(username) {
  const all = JSON.parse(localStorage.getItem(DB_ORDERS) || '[]');
  return all.filter(o => o.username === username);
}

function placeOrder(username) {
  const cart = getCart();
  if (!cart.restaurantId || Object.keys(cart.items).length === 0) return null;
  const restaurant = getRestaurants().find(r => r.id === cart.restaurantId);
  let total = 0;
  const items = Object.entries(cart.items).map(([itemId, qty]) => {
    const item = restaurant.menu.find(m => m.id === Number(itemId));
    total += item.price * qty;
    return { name: item.name, price: item.price, quantity: qty };
  });
  const order = {
    id: Date.now(), username, restaurantName: restaurant.name,
    items, total, status: 'Placed', created: Date.now()
  };
  const all = JSON.parse(localStorage.getItem(DB_ORDERS) || '[]');
  all.push(order);
  localStorage.setItem(DB_ORDERS, JSON.stringify(all));
  clearCart();
  return order;
}
