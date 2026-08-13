const DB_LISTINGS = 'market_listings';
const CATEGORIES = ['Electronics', 'Furniture', 'Vehicles', 'Clothing', 'Books', 'Sports', 'Other'];

function getListings() { return JSON.parse(localStorage.getItem(DB_LISTINGS) || '[]'); }
function saveListings(listings) { localStorage.setItem(DB_LISTINGS, JSON.stringify(listings)); }

function addListing(listing) {
  const listings = getListings();
  listings.unshift({ id: Date.now(), status: 'Available', created: Date.now(), ...listing });
  saveListings(listings);
}

function updateListing(id, updates) {
  const listings = getListings();
  const l = listings.find(x => x.id === id);
  if (l) Object.assign(l, updates);
  saveListings(listings);
}

function deleteListing(id) {
  saveListings(getListings().filter(x => x.id !== id));
}

function categoryOptions(selected) {
  return CATEGORIES.map(c => `<option value="${c}" ${c === selected ? 'selected' : ''}>${c}</option>`).join('');
}
