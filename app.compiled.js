"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// ==========================================================================
// DONATION MARKETPLACE - FULL REACT SINGLE PAGE APPLICATION
// Featuring Campaigns, In-Kind Marketplace, Cart Total Calculations, 
// Order History, Donor Management, Role-Based Dashboards & Tax Receipts.
// ==========================================================================

var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useMemo = _React.useMemo;

// ----------------------------------------------------
// DEFAULT SEED DATA
// ----------------------------------------------------
var INITIAL_DATA = {
  users: [{
    id: 'usr-1',
    name: 'Elena Rostova',
    email: 'donor@hope.org',
    role: 'Donor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    organization: 'Individual Philanthropist'
  }, {
    id: 'usr-2',
    name: 'Marcus Vance',
    email: 'organizer@care.org',
    role: 'Organizer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    organization: 'Care & Relief Global'
  }, {
    id: 'usr-3',
    name: 'Dr. Sarah Jenkins',
    email: 'admin@marketplace.org',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    organization: 'Marketplace Oversight Foundation'
  }],
  campaigns: [{
    id: 'cmp-1',
    title: 'Emergency Medical Kits for Disaster Relief',
    description: 'Providing urgent trauma supplies, portable sterilizers, and first-aid kits to communities affected by recent floods.',
    category: 'Medical',
    targetAmount: 50000,
    raisedAmount: 36850,
    organizerId: 'usr-2',
    organizerName: 'Care & Relief Global',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    urgent: true,
    donorsCount: 214,
    endDate: '2026-12-31',
    createdAt: '2026-09-01T10:00:00Z'
  }, {
    id: 'cmp-2',
    title: 'STEM Labs & Laptops for Underserved Schools',
    description: 'Equipping 12 public schools with refurbished coding laptops, robotics kits, and high-speed satellite connectivity.',
    category: 'Education',
    targetAmount: 30000,
    raisedAmount: 21500,
    organizerId: 'usr-2',
    organizerName: 'NextGen Academy Foundation',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    urgent: false,
    donorsCount: 165,
    endDate: '2026-11-15',
    createdAt: '2026-08-28T14:30:00Z'
  }, {
    id: 'cmp-3',
    title: 'Clean Water Boreholes & Solar Pumps',
    description: 'Drilling 5 deep-water boreholes powered by solar pumps to serve 8,500 rural villagers with pure drinking water.',
    category: 'Environment',
    targetAmount: 45000,
    raisedAmount: 42300,
    organizerId: 'usr-2',
    organizerName: 'AquaViva Initiative',
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    urgent: true,
    donorsCount: 310,
    endDate: '2026-10-30',
    createdAt: '2026-08-20T09:15:00Z'
  }, {
    id: 'cmp-4',
    title: 'Urban Food Rescue & Community Kitchens',
    description: 'Rescuing surplus organic groceries from markets and preparing 2,000 warm, nutritious daily meals for homeless shelters.',
    category: 'Hunger',
    targetAmount: 20000,
    raisedAmount: 18900,
    organizerId: 'usr-2',
    organizerName: 'Daily Bread Coalition',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    urgent: false,
    donorsCount: 198,
    endDate: '2026-12-10',
    createdAt: '2026-08-15T11:00:00Z'
  }, {
    id: 'cmp-5',
    title: 'Wildlife Sanctuary Rescue & Veterinary Care',
    description: 'Rescue rehabilitation and prosthetic care for injured wildlife, endangered pangolins, and orphaned elephants.',
    category: 'Animal Welfare',
    targetAmount: 35000,
    raisedAmount: 12400,
    organizerId: 'usr-2',
    organizerName: 'Savannah Care Network',
    image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    urgent: false,
    donorsCount: 94,
    endDate: '2027-01-20',
    createdAt: '2026-09-10T16:45:00Z'
  }],
  marketplaceItems: [{
    id: 'mkt-1',
    title: 'Pediatric Wheelchairs & Mobility Walkers',
    description: 'Set of 4 lightweight foldable adjustable pediatric wheelchairs in pristine condition with safety harnesses.',
    category: 'Medical Supplies',
    quantity: 8,
    condition: 'Like New',
    estimatedValue: 240,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
    location: 'Chicago, IL',
    status: 'Available',
    donorName: 'Dr. Michael Chang',
    donorId: 'usr-1'
  }, {
    id: 'mkt-2',
    title: 'Refurbished ThinkPad Laptops (Core i5 / 16GB)',
    description: 'Tested and loaded with open-source educational software and typing tutors. AC power adapters included.',
    category: 'Tech & Devices',
    quantity: 15,
    condition: 'Refurbished',
    estimatedValue: 180,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    location: 'Austin, TX',
    status: 'Available',
    donorName: 'TechForGood Corp',
    donorId: 'usr-1'
  }, {
    id: 'mkt-3',
    title: 'High-Thermal Winter Blankets & Sleeping Pads',
    description: 'Durable waterproof thermal fleece blankets suitable for emergency shelters and winter displaced families.',
    category: 'Clothing & Shelter',
    quantity: 45,
    condition: 'Brand New',
    estimatedValue: 25,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
    location: 'Denver, CO',
    status: 'Available',
    donorName: 'Warmth Alliance',
    donorId: 'usr-1'
  }, {
    id: 'mkt-4',
    title: 'Sterile Surgical First Aid Backpacks',
    description: 'Complete trauma backpacks packed with bandaging, antiseptic wash, suture sets, and splints.',
    category: 'Medical Supplies',
    quantity: 12,
    condition: 'Brand New',
    estimatedValue: 95,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&auto=format&fit=crop&q=80',
    location: 'Seattle, WA',
    status: 'Available',
    donorName: 'Pacific Health Volunteers',
    donorId: 'usr-1'
  }, {
    id: 'mkt-5',
    title: 'Elementary Backpacks with Complete Stationery',
    description: 'Heavy-duty student backpacks filled with notebooks, pens, colored pencils, rulers, and geometry kits.',
    category: 'School Kits',
    quantity: 30,
    condition: 'Brand New',
    estimatedValue: 35,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    location: 'Atlanta, GA',
    status: 'Available',
    donorName: 'Elena Rostova',
    donorId: 'usr-1'
  }, {
    id: 'mkt-6',
    title: 'Solar Lanterns with USB Phone Charging Ports',
    description: 'Waterproof solar power lights with 12-hour charge retention and emergency SOS signaling.',
    category: 'Emergency Supplies',
    quantity: 20,
    condition: 'Brand New',
    estimatedValue: 40,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    location: 'Phoenix, AZ',
    status: 'Available',
    donorName: 'EcoLight Trust',
    donorId: 'usr-1'
  }],
  donors: [{
    id: 'dnr-1',
    name: 'Elena Rostova',
    email: 'donor@hope.org',
    totalDonated: 12450,
    donationsCount: 14,
    badge: 'Champion Donor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastDonatedAt: '2026-09-15T10:00:00Z'
  }, {
    id: 'dnr-2',
    name: 'Jonathan Sterling',
    email: 'j.sterling@meridian.io',
    totalDonated: 8900,
    donationsCount: 8,
    badge: 'Gold Tier',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    lastDonatedAt: '2026-09-12T14:30:00Z'
  }, {
    id: 'dnr-3',
    name: 'Amina Al-Mansoor',
    email: 'amina.mansoor@oasis.org',
    totalDonated: 6200,
    donationsCount: 6,
    badge: 'Gold Tier',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    lastDonatedAt: '2026-09-10T11:20:00Z'
  }, {
    id: 'dnr-4',
    name: 'David & Clara Hughes',
    email: 'hughes.family@outlook.com',
    totalDonated: 3450,
    donationsCount: 5,
    badge: 'Silver Tier',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    lastDonatedAt: '2026-09-05T09:00:00Z'
  }, {
    id: 'dnr-5',
    name: 'Priya Narayanan',
    email: 'priya.n@techseed.in',
    totalDonated: 1850,
    donationsCount: 3,
    badge: 'Bronze Tier',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    lastDonatedAt: '2026-08-30T16:00:00Z'
  }],
  donations: [{
    id: 'don-1',
    campaignId: 'cmp-1',
    campaignTitle: 'Emergency Medical Kits for Disaster Relief',
    donorName: 'Elena Rostova',
    donorEmail: 'donor@hope.org',
    amount: 1500,
    paymentMethod: 'Credit Card',
    receiptNumber: 'RCPT-2026-8841',
    isAnonymous: false,
    message: 'Praying for swift relief for everyone on the ground.',
    createdAt: '2026-09-15T10:00:00Z'
  }, {
    id: 'don-2',
    campaignId: 'cmp-3',
    campaignTitle: 'Clean Water Boreholes & Solar Pumps',
    donorName: 'Jonathan Sterling',
    donorEmail: 'j.sterling@meridian.io',
    amount: 2500,
    paymentMethod: 'Bank Wire',
    receiptNumber: 'RCPT-2026-8820',
    isAnonymous: false,
    message: 'Access to clean water is a fundamental human right.',
    createdAt: '2026-09-12T14:30:00Z'
  }, {
    id: 'don-3',
    campaignId: 'cmp-2',
    campaignTitle: 'STEM Labs & Laptops for Underserved Schools',
    donorName: 'Anonymous Donor',
    donorEmail: 'anonymous@hope.org',
    amount: 800,
    paymentMethod: 'Crypto (ETH)',
    receiptNumber: 'RCPT-2026-8799',
    isAnonymous: true,
    message: 'Inspiring the future coders and scientists!',
    createdAt: '2026-09-08T18:15:00Z'
  }, {
    id: 'don-4',
    campaignId: 'cmp-4',
    campaignTitle: 'Urban Food Rescue & Community Kitchens',
    donorName: 'Amina Al-Mansoor',
    donorEmail: 'amina.mansoor@oasis.org',
    amount: 1200,
    paymentMethod: 'PayPal',
    receiptNumber: 'RCPT-2026-8750',
    isAnonymous: false,
    message: 'Thank you for nourishing our vulnerable neighbors.',
    createdAt: '2026-09-01T11:20:00Z'
  }],
  orders: [{
    id: 'ord-1',
    orderNumber: 'REQ-2026-9041',
    userId: 'usr-2',
    userName: 'Marcus Vance (Care & Relief)',
    deliveryAddress: '742 Evergreen Community Hub, Sector 4, Chicago IL',
    notes: 'Urgent distribution for displaced community clinic.',
    status: 'Dispatched',
    totalItems: 4,
    totalEstimatedValue: 960,
    items: [{
      id: 'mkt-1',
      title: 'Pediatric Wheelchairs & Mobility Walkers',
      quantity: 2,
      unitValue: 240,
      totalValue: 480
    }, {
      id: 'mkt-4',
      title: 'Sterile Surgical First Aid Backpacks',
      quantity: 2,
      unitValue: 240,
      totalValue: 480
    }],
    createdAt: '2026-09-14T09:30:00Z'
  }, {
    id: 'ord-2',
    orderNumber: 'REQ-2026-9035',
    userId: 'usr-1',
    userName: 'Elena Rostova',
    deliveryAddress: 'Rural Youth Center, 120 Mountain Road, Denver CO',
    notes: 'High school computer lab installation.',
    status: 'Delivered',
    totalItems: 5,
    totalEstimatedValue: 900,
    items: [{
      id: 'mkt-2',
      title: 'Refurbished ThinkPad Laptops (Core i5 / 16GB)',
      quantity: 5,
      unitValue: 180,
      totalValue: 900
    }],
    createdAt: '2026-09-08T15:45:00Z'
  }]
};

// Storage helper functions
var getStoredData = function getStoredData(key, fallback) {
  try {
    var item = localStorage.getItem("donatemarket_".concat(key));
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};
var setStoredData = function setStoredData(key, value) {
  try {
    localStorage.setItem("donatemarket_".concat(key), JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

// ==========================================================================
// MAIN ROOT COMPONENT
// ==========================================================================
function App() {
  // Navigation View State: 'home', 'campaigns', 'marketplace', 'cart', 'orders', 'donors', 'donations', 'dashboard'
  var _useState = useState('home'),
    _useState2 = _slicedToArray(_useState, 2),
    currentView = _useState2[0],
    setCurrentView = _useState2[1];

  // Global App States
  var _useState3 = useState(function () {
      return getStoredData('users', INITIAL_DATA.users);
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    users = _useState4[0],
    setUsers = _useState4[1];
  var _useState5 = useState(function () {
      return getStoredData('currentUser', INITIAL_DATA.users[0]);
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    currentUser = _useState6[0],
    setCurrentUser = _useState6[1];
  var _useState7 = useState(function () {
      return getStoredData('campaigns', INITIAL_DATA.campaigns);
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    campaigns = _useState8[0],
    setCampaigns = _useState8[1];
  var _useState9 = useState(function () {
      return getStoredData('marketplaceItems', INITIAL_DATA.marketplaceItems);
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    marketplaceItems = _useState10[0],
    setMarketplaceItems = _useState10[1];
  var _useState11 = useState(function () {
      return getStoredData('donors', INITIAL_DATA.donors);
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    donors = _useState12[0],
    setDonors = _useState12[1];
  var _useState13 = useState(function () {
      return getStoredData('donations', INITIAL_DATA.donations);
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    donations = _useState14[0],
    setDonations = _useState14[1];
  var _useState15 = useState(function () {
      return getStoredData('orders', INITIAL_DATA.orders);
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    orders = _useState16[0],
    setOrders = _useState16[1];
  var _useState17 = useState(function () {
      return getStoredData('cart', []);
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    cart = _useState18[0],
    setCart = _useState18[1];

  // Modal States
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    activeModal = _useState20[0],
    setActiveModal = _useState20[1]; // 'donate', 'addCampaign', 'addListing', 'checkout', 'receipt', 'auth'
  var _useState21 = useState(null),
    _useState22 = _slicedToArray(_useState21, 2),
    selectedCampaign = _useState22[0],
    setSelectedCampaign = _useState22[1];
  var _useState23 = useState(null),
    _useState24 = _slicedToArray(_useState23, 2),
    selectedReceipt = _useState24[0],
    setSelectedReceipt = _useState24[1];
  var _useState25 = useState(null),
    _useState26 = _slicedToArray(_useState25, 2),
    editingItem = _useState26[0],
    setEditingItem = _useState26[1];
  var _useState27 = useState([]),
    _useState28 = _slicedToArray(_useState27, 2),
    toasts = _useState28[0],
    setToasts = _useState28[1];

  // Persist State Changes
  useEffect(function () {
    return setStoredData('users', users);
  }, [users]);
  useEffect(function () {
    return setStoredData('currentUser', currentUser);
  }, [currentUser]);
  useEffect(function () {
    return setStoredData('campaigns', campaigns);
  }, [campaigns]);
  useEffect(function () {
    return setStoredData('marketplaceItems', marketplaceItems);
  }, [marketplaceItems]);
  useEffect(function () {
    return setStoredData('donors', donors);
  }, [donors]);
  useEffect(function () {
    return setStoredData('donations', donations);
  }, [donations]);
  useEffect(function () {
    return setStoredData('orders', orders);
  }, [orders]);
  useEffect(function () {
    return setStoredData('cart', cart);
  }, [cart]);

  // Toast Notification Trigger
  var showToast = function showToast(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
    var id = Date.now();
    setToasts(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        id: id,
        message: message,
        type: type
      }]);
    });
    setTimeout(function () {
      setToasts(function (prev) {
        return prev.filter(function (t) {
          return t.id !== id;
        });
      });
    }, 4000);
  };

  // Switch Active User / Role
  var handleSwitchUser = function handleSwitchUser(userId) {
    var found = users.find(function (u) {
      return u.id === userId;
    });
    if (found) {
      setCurrentUser(found);
      showToast("Switched active profile to ".concat(found.name, " (").concat(found.role, ")"), 'info');
    }
  };

  // ----------------------------------------------------
  // CART CALCULATIONS & ACTIONS
  // ----------------------------------------------------
  var addToCart = function addToCart(item) {
    var requestedQty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var existingIndex = cart.findIndex(function (c) {
      return c.id === item.id;
    });
    var availableStock = item.quantity;
    if (availableStock <= 0) {
      showToast('Sorry, this item is currently out of stock.', 'error');
      return;
    }
    if (existingIndex > -1) {
      var updatedCart = _toConsumableArray(cart);
      var newQty = updatedCart[existingIndex].quantity + requestedQty;
      if (newQty > availableStock) {
        showToast("Cannot add more than ".concat(availableStock, " units available in stock."), 'error');
        return;
      }
      updatedCart[existingIndex].quantity = newQty;
      setCart(updatedCart);
    } else {
      setCart(function (prev) {
        return [].concat(_toConsumableArray(prev), [{
          id: item.id,
          title: item.title,
          unitValue: item.estimatedValue || 0,
          image: item.image,
          category: item.category,
          maxStock: availableStock,
          quantity: Math.min(requestedQty, availableStock)
        }]);
      });
    }
    showToast("Added \"".concat(item.title, "\" to request cart."), 'success');
  };
  var updateCartQuantity = function updateCartQuantity(itemId, delta) {
    setCart(function (prev) {
      return prev.map(function (item) {
        if (item.id === itemId) {
          var newQty = item.quantity + delta;
          if (newQty < 1) return item;
          if (newQty > item.maxStock) {
            showToast("Maximum available stock reached (".concat(item.maxStock, ")."), 'error');
            return item;
          }
          return _objectSpread(_objectSpread({}, item), {}, {
            quantity: newQty
          });
        }
        return item;
      });
    });
  };
  var removeFromCart = function removeFromCart(itemId) {
    setCart(function (prev) {
      return prev.filter(function (item) {
        return item.id !== itemId;
      });
    });
    showToast('Item removed from cart.', 'info');
  };
  var clearCart = function clearCart() {
    setCart([]);
  };

  // Real-Time Total Calculations
  var cartSummary = useMemo(function () {
    var totalItems = cart.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);
    var totalEstimatedValue = cart.reduce(function (sum, item) {
      return sum + item.quantity * item.unitValue;
    }, 0);
    return {
      totalItems: totalItems,
      totalEstimatedValue: totalEstimatedValue
    };
  }, [cart]);

  // ----------------------------------------------------
  // DONATION & CAMPAIGN ACTIONS
  // ----------------------------------------------------
  var handleMakeDonation = function handleMakeDonation(donationData) {
    var campaignId = donationData.campaignId,
      amount = donationData.amount,
      donorName = donationData.donorName,
      donorEmail = donationData.donorEmail,
      paymentMethod = donationData.paymentMethod,
      isAnonymous = donationData.isAnonymous,
      message = donationData.message;
    var numAmount = Number(amount);
    var receiptNum = "RCPT-".concat(new Date().getFullYear(), "-").concat(Math.floor(1000 + Math.random() * 9000));
    var newDonation = {
      id: "don-".concat(Date.now()),
      campaignId: campaignId,
      campaignTitle: selectedCampaign ? selectedCampaign.title : 'General Relief Fund',
      donorName: isAnonymous ? 'Anonymous Donor' : donorName || currentUser.name,
      donorEmail: isAnonymous ? 'anonymous@hope.org' : donorEmail || currentUser.email,
      amount: numAmount,
      paymentMethod: paymentMethod || 'Credit Card',
      receiptNumber: receiptNum,
      isAnonymous: Boolean(isAnonymous),
      message: message || '',
      createdAt: new Date().toISOString()
    };
    setDonations(function (prev) {
      return [newDonation].concat(_toConsumableArray(prev));
    });
    setCampaigns(function (prev) {
      return prev.map(function (c) {
        if (c.id === campaignId) {
          return _objectSpread(_objectSpread({}, c), {}, {
            raisedAmount: c.raisedAmount + numAmount,
            donorsCount: c.donorsCount + 1
          });
        }
        return c;
      });
    });
    if (!isAnonymous) {
      setDonors(function (prev) {
        var email = donorEmail || currentUser.email;
        var existing = prev.find(function (d) {
          return d.email.toLowerCase() === email.toLowerCase();
        });
        if (existing) {
          var newTotal = existing.totalDonated + numAmount;
          var badge = 'Bronze Tier';
          if (newTotal >= 10000) badge = 'Champion Donor';else if (newTotal >= 5000) badge = 'Gold Tier';else if (newTotal >= 2000) badge = 'Silver Tier';
          return prev.map(function (d) {
            return d.id === existing.id ? _objectSpread(_objectSpread({}, d), {}, {
              totalDonated: newTotal,
              donationsCount: d.donationsCount + 1,
              badge: badge,
              lastDonatedAt: new Date().toISOString()
            }) : d;
          });
        } else {
          return [{
            id: "dnr-".concat(Date.now()),
            name: donorName || currentUser.name,
            email: email,
            totalDonated: numAmount,
            donationsCount: 1,
            badge: numAmount >= 2000 ? 'Silver Tier' : 'Bronze Tier',
            avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            lastDonatedAt: new Date().toISOString()
          }].concat(_toConsumableArray(prev));
        }
      });
    }
    setActiveModal(null);
    setSelectedReceipt(newDonation);
    setActiveModal('receipt');
    showToast("Thank you! Your donation of $".concat(numAmount.toLocaleString(), " has been processed."), 'success');
  };

  // ----------------------------------------------------
  // ORDER CHECKOUT ACTION
  // ----------------------------------------------------
  var handleCheckoutSubmit = function handleCheckoutSubmit(formData) {
    if (cart.length === 0) return;
    var orderNumber = "REQ-".concat(new Date().getFullYear(), "-").concat(Math.floor(1000 + Math.random() * 9000));
    var processedItems = cart.map(function (item) {
      return {
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unitValue: item.unitValue,
        totalValue: item.quantity * item.unitValue
      };
    });
    setMarketplaceItems(function (prev) {
      return prev.map(function (mkt) {
        var cartItem = cart.find(function (c) {
          return c.id === mkt.id;
        });
        if (cartItem) {
          var newStock = Math.max(0, mkt.quantity - cartItem.quantity);
          return _objectSpread(_objectSpread({}, mkt), {}, {
            quantity: newStock,
            status: newStock === 0 ? 'Claimed' : 'Available'
          });
        }
        return mkt;
      });
    });
    var newOrder = {
      id: "ord-".concat(Date.now()),
      orderNumber: orderNumber,
      userId: currentUser.id,
      userName: "".concat(currentUser.name, " (").concat(currentUser.organization || 'Community', ")"),
      deliveryAddress: formData.deliveryAddress,
      notes: formData.notes || '',
      status: 'Submitted',
      totalItems: cartSummary.totalItems,
      totalEstimatedValue: cartSummary.totalEstimatedValue,
      items: processedItems,
      createdAt: new Date().toISOString()
    };
    setOrders(function (prev) {
      return [newOrder].concat(_toConsumableArray(prev));
    });
    clearCart();
    setActiveModal(null);
    setCurrentView('orders');
    showToast("Request #".concat(orderNumber, " submitted successfully!"), 'success');
  };

  // Save / Edit Campaign
  var handleSaveCampaign = function handleSaveCampaign(campaignData) {
    if (editingItem && editingItem.id) {
      setCampaigns(function (prev) {
        return prev.map(function (c) {
          return c.id === editingItem.id ? _objectSpread(_objectSpread(_objectSpread({}, c), campaignData), {}, {
            targetAmount: Number(campaignData.targetAmount)
          }) : c;
        });
      });
      showToast('Campaign details updated successfully.', 'success');
    } else {
      var newCmp = _objectSpread(_objectSpread({
        id: "cmp-".concat(Date.now())
      }, campaignData), {}, {
        targetAmount: Number(campaignData.targetAmount),
        raisedAmount: 0,
        organizerId: currentUser.id,
        organizerName: currentUser.organization || currentUser.name,
        donorsCount: 0,
        status: 'Active',
        createdAt: new Date().toISOString()
      });
      setCampaigns(function (prev) {
        return [newCmp].concat(_toConsumableArray(prev));
      });
      showToast('New fundraising campaign launched!', 'success');
    }
    setActiveModal(null);
    setEditingItem(null);
  };

  // Save / Edit Marketplace Listing
  var handleSaveListing = function handleSaveListing(listingData) {
    if (editingItem && editingItem.id) {
      setMarketplaceItems(function (prev) {
        return prev.map(function (item) {
          return item.id === editingItem.id ? _objectSpread(_objectSpread(_objectSpread({}, item), listingData), {}, {
            quantity: Number(listingData.quantity),
            estimatedValue: Number(listingData.estimatedValue)
          }) : item;
        });
      });
      showToast('Marketplace listing updated.', 'success');
    } else {
      var newItem = _objectSpread(_objectSpread({
        id: "mkt-".concat(Date.now())
      }, listingData), {}, {
        quantity: Number(listingData.quantity),
        estimatedValue: Number(listingData.estimatedValue),
        donorName: currentUser.name,
        donorId: currentUser.id,
        status: 'Available',
        createdAt: new Date().toISOString()
      });
      setMarketplaceItems(function (prev) {
        return [newItem].concat(_toConsumableArray(prev));
      });
      showToast('Item listed successfully in Donation Marketplace!', 'success');
    }
    setActiveModal(null);
    setEditingItem(null);
  };
  var handleDeleteCampaign = function handleDeleteCampaign(id) {
    if (window.confirm('Are you sure you want to remove this campaign?')) {
      setCampaigns(function (prev) {
        return prev.filter(function (c) {
          return c.id !== id;
        });
      });
      showToast('Campaign deleted.', 'info');
    }
  };
  var handleDeleteListing = function handleDeleteListing(id) {
    if (window.confirm('Are you sure you want to remove this item listing?')) {
      setMarketplaceItems(function (prev) {
        return prev.filter(function (i) {
          return i.id !== id;
        });
      });
      showToast('Listing removed.', 'info');
    }
  };
  var handleUpdateOrderStatus = function handleUpdateOrderStatus(orderId, newStatus) {
    setOrders(function (prev) {
      return prev.map(function (o) {
        return o.id === orderId ? _objectSpread(_objectSpread({}, o), {}, {
          status: newStatus
        }) : o;
      });
    });
    showToast("Order status updated to \"".concat(newStatus, "\"."), 'success');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "app-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ambient-container",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ambient-orb orb-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ambient-orb orb-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ambient-orb orb-3"
  })), /*#__PURE__*/React.createElement(Navbar, {
    currentView: currentView,
    setCurrentView: setCurrentView,
    currentUser: currentUser,
    users: users,
    onSwitchUser: handleSwitchUser,
    cartCount: cartSummary.totalItems,
    onOpenAuth: function onOpenAuth() {
      return setActiveModal('auth');
    }
  }), /*#__PURE__*/React.createElement("main", {
    className: "main-content"
  }, currentView === 'home' && /*#__PURE__*/React.createElement(HomePage, {
    campaigns: campaigns,
    marketplaceItems: marketplaceItems,
    onNavigate: setCurrentView,
    onDonate: function onDonate(cmp) {
      setSelectedCampaign(cmp);
      setActiveModal('donate');
    },
    onAddToCart: addToCart
  }), currentView === 'campaigns' && /*#__PURE__*/React.createElement(CampaignsPage, {
    campaigns: campaigns,
    currentUser: currentUser,
    onDonate: function onDonate(cmp) {
      setSelectedCampaign(cmp);
      setActiveModal('donate');
    },
    onAddCampaign: function onAddCampaign() {
      setEditingItem(null);
      setActiveModal('addCampaign');
    },
    onEditCampaign: function onEditCampaign(cmp) {
      setEditingItem(cmp);
      setActiveModal('addCampaign');
    },
    onDeleteCampaign: handleDeleteCampaign
  }), currentView === 'marketplace' && /*#__PURE__*/React.createElement(MarketplacePage, {
    marketplaceItems: marketplaceItems,
    currentUser: currentUser,
    onAddToCart: addToCart,
    onAddListing: function onAddListing() {
      setEditingItem(null);
      setActiveModal('addListing');
    },
    onEditListing: function onEditListing(item) {
      setEditingItem(item);
      setActiveModal('addListing');
    },
    onDeleteListing: handleDeleteListing
  }), currentView === 'cart' && /*#__PURE__*/React.createElement(CartPage, {
    cart: cart,
    cartSummary: cartSummary,
    onUpdateQty: updateCartQuantity,
    onRemove: removeFromCart,
    onClear: clearCart,
    onCheckout: function onCheckout() {
      return setActiveModal('checkout');
    },
    onBrowse: function onBrowse() {
      return setCurrentView('marketplace');
    }
  }), currentView === 'orders' && /*#__PURE__*/React.createElement(OrdersPage, {
    orders: orders,
    currentUser: currentUser,
    onUpdateStatus: handleUpdateOrderStatus,
    onBrowseMarket: function onBrowseMarket() {
      return setCurrentView('marketplace');
    }
  }), currentView === 'donors' && /*#__PURE__*/React.createElement(DonorsPage, {
    donors: donors,
    currentUser: currentUser,
    onAddDonor: function onAddDonor(donor) {
      setDonors(function (prev) {
        return [donor].concat(_toConsumableArray(prev));
      });
      showToast('Donor profile added to roster.', 'success');
    }
  }), currentView === 'donations' && /*#__PURE__*/React.createElement(DonationsPage, {
    donations: donations,
    onViewReceipt: function onViewReceipt(don) {
      setSelectedReceipt(don);
      setActiveModal('receipt');
    }
  }), currentView === 'dashboard' && /*#__PURE__*/React.createElement(DashboardPage, {
    currentUser: currentUser,
    campaigns: campaigns,
    donors: donors,
    donations: donations,
    orders: orders,
    marketplaceItems: marketplaceItems,
    onNavigate: setCurrentView,
    onAddCampaign: function onAddCampaign() {
      setEditingItem(null);
      setActiveModal('addCampaign');
    },
    onAddListing: function onAddListing() {
      setEditingItem(null);
      setActiveModal('addListing');
    },
    onApproveCampaign: function onApproveCampaign(id) {
      setCampaigns(function (prev) {
        return prev.map(function (c) {
          return c.id === id ? _objectSpread(_objectSpread({}, c), {}, {
            status: 'Active'
          }) : c;
        });
      });
      showToast('Campaign approved and marked live!', 'success');
    }
  })), activeModal === 'donate' && /*#__PURE__*/React.createElement(DonateModal, {
    campaign: selectedCampaign,
    currentUser: currentUser,
    onClose: function onClose() {
      return setActiveModal(null);
    },
    onSubmit: handleMakeDonation
  }), activeModal === 'addCampaign' && /*#__PURE__*/React.createElement(AddEditCampaignModal, {
    initialData: editingItem,
    currentUser: currentUser,
    onClose: function onClose() {
      setActiveModal(null);
      setEditingItem(null);
    },
    onSubmit: handleSaveCampaign
  }), activeModal === 'addListing' && /*#__PURE__*/React.createElement(AddEditListingModal, {
    initialData: editingItem,
    currentUser: currentUser,
    onClose: function onClose() {
      setActiveModal(null);
      setEditingItem(null);
    },
    onSubmit: handleSaveListing
  }), activeModal === 'checkout' && /*#__PURE__*/React.createElement(CheckoutModal, {
    cart: cart,
    cartSummary: cartSummary,
    currentUser: currentUser,
    onClose: function onClose() {
      return setActiveModal(null);
    },
    onSubmit: handleCheckoutSubmit
  }), activeModal === 'receipt' && selectedReceipt && /*#__PURE__*/React.createElement(TaxReceiptModal, {
    receipt: selectedReceipt,
    onClose: function onClose() {
      setActiveModal(null);
      setSelectedReceipt(null);
    }
  }), activeModal === 'auth' && /*#__PURE__*/React.createElement(AuthModal, {
    users: users,
    currentUser: currentUser,
    onSelectUser: function onSelectUser(u) {
      setCurrentUser(u);
      setActiveModal(null);
      showToast("Welcome back, ".concat(u.name, "!"));
    },
    onRegister: function onRegister(newUser) {
      setUsers(function (prev) {
        return [].concat(_toConsumableArray(prev), [newUser]);
      });
      setCurrentUser(newUser);
      setActiveModal(null);
      showToast("Account created! Welcome, ".concat(newUser.name, "."));
    },
    onClose: function onClose() {
      return setActiveModal(null);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "toast-container"
  }, toasts.map(function (toast) {
    return /*#__PURE__*/React.createElement("div", {
      key: toast.id,
      className: "toast-item toast-".concat(toast.type)
    }, /*#__PURE__*/React.createElement("span", null, toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'), /*#__PURE__*/React.createElement("span", null, toast.message));
  })));
}

// ----------------------------------------------------
// NAVBAR COMPONENT
// ----------------------------------------------------
function Navbar(_ref) {
  var currentView = _ref.currentView,
    setCurrentView = _ref.setCurrentView,
    currentUser = _ref.currentUser,
    users = _ref.users,
    onSwitchUser = _ref.onSwitchUser,
    cartCount = _ref.cartCount,
    onOpenAuth = _ref.onOpenAuth;
  return /*#__PURE__*/React.createElement("header", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-logo",
    onClick: function onClick() {
      return setCurrentView('home');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-symbol"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "brand-title"
  }, /*#__PURE__*/React.createElement("span", null, "Donatify"), /*#__PURE__*/React.createElement("span", {
    className: "brand-badge"
  }, "MARKETPLACE"))), /*#__PURE__*/React.createElement("ul", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-item-btn ".concat(currentView === 'home' ? 'active' : ''),
    onClick: function onClick() {
      return setCurrentView('home');
    }
  }, "Home")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-item-btn ".concat(currentView === 'campaigns' ? 'active' : ''),
    onClick: function onClick() {
      return setCurrentView('campaigns');
    }
  }, "Campaigns")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-item-btn ".concat(currentView === 'marketplace' ? 'active' : ''),
    onClick: function onClick() {
      return setCurrentView('marketplace');
    }
  }, "Marketplace")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-item-btn ".concat(currentView === 'orders' ? 'active' : ''),
    onClick: function onClick() {
      return setCurrentView('orders');
    }
  }, "Request Orders")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-item-btn ".concat(currentView === 'donors' ? 'active' : ''),
    onClick: function onClick() {
      return setCurrentView('donors');
    }
  }, "Donors")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-item-btn ".concat(currentView === 'donations' ? 'active' : ''),
    onClick: function onClick() {
      return setCurrentView('donations');
    }
  }, "Donations")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    className: "nav-item-btn ".concat(currentView === 'dashboard' ? 'active' : ''),
    onClick: function onClick() {
      return setCurrentView('dashboard');
    }
  }, "Dashboard"))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cart-nav-btn",
    title: "View Request Cart",
    onClick: function onClick() {
      return setCurrentView('cart');
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "21",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "21",
    r: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
  })), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "cart-badge-pill"
  }, cartCount)), /*#__PURE__*/React.createElement("div", {
    className: "user-menu-wrapper"
  }, /*#__PURE__*/React.createElement("img", {
    src: currentUser.avatar,
    alt: currentUser.name,
    className: "user-avatar-img"
  }), /*#__PURE__*/React.createElement("div", {
    className: "user-meta-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-name-text"
  }, currentUser.name.split(' ')[0]), /*#__PURE__*/React.createElement("span", {
    className: "role-pill-badge role-".concat(currentUser.role.toLowerCase())
  }, currentUser.role)), /*#__PURE__*/React.createElement("select", {
    className: "quick-role-select",
    value: currentUser.id,
    onChange: function onChange(e) {
      return onSwitchUser(e.target.value);
    },
    title: "Switch Demo Role"
  }, users.map(function (u) {
    return /*#__PURE__*/React.createElement("option", {
      key: u.id,
      value: u.id
    }, u.role, ": ", u.name);
  }))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: onOpenAuth
  }, "Auth"))));
}

// ----------------------------------------------------
// HOME PAGE COMPONENT
// ----------------------------------------------------
function HomePage(_ref2) {
  var campaigns = _ref2.campaigns,
    marketplaceItems = _ref2.marketplaceItems,
    onNavigate = _ref2.onNavigate,
    _onDonate = _ref2.onDonate,
    _onAddToCart = _ref2.onAddToCart;
  var featuredCampaigns = useMemo(function () {
    return campaigns.slice(0, 3);
  }, [campaigns]);
  var featuredMarket = useMemo(function () {
    return marketplaceItems.slice(0, 4);
  }, [marketplaceItems]);
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-pill-tag"
  }, /*#__PURE__*/React.createElement("span", null, "\u2728"), /*#__PURE__*/React.createElement("span", null, "Next-Generation Charitable Crowdfunding & In-Kind Marketplace")), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, "Direct Giving. Verified Aid. ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-gradient"
  }, "Real-Time Impact.")), /*#__PURE__*/React.createElement("p", {
    className: "hero-subtitle"
  }, "Empowering donors to fund critical relief campaigns and dispatch essential in-kind supplies directly to verified organizers on the frontlines."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta-group"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: function onClick() {
      return onNavigate('campaigns');
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  })), /*#__PURE__*/React.createElement("span", null, "Explore Campaigns")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-lg",
    onClick: function onClick() {
      return onNavigate('marketplace');
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "5",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    x2: "22",
    y1: "10",
    y2: "10"
  })), /*#__PURE__*/React.createElement("span", null, "Goods Marketplace"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, "$142,500+"), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Total Relief Funds Raised")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, "1,840+"), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Supplies Distributed")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, "980+"), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Verified Donors & NGOs")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, "100%"), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Tax-Deductible Receipts")))), /*#__PURE__*/React.createElement("section", {
    style: {
      margin: '60px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Urgent Fundraising Campaigns"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Critical initiatives requiring immediate support to save lives and empower communities.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    onClick: function onClick() {
      return onNavigate('campaigns');
    }
  }, "View All Campaigns \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "campaign-grid"
  }, featuredCampaigns.map(function (cmp) {
    return /*#__PURE__*/React.createElement(CampaignCard, {
      key: cmp.id,
      campaign: cmp,
      onDonate: function onDonate() {
        return _onDonate(cmp);
      }
    });
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      margin: '60px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "In-Kind Goods Marketplace"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Medical equipment, educational tech, and emergency blankets ready for organizer request.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    onClick: function onClick() {
      return onNavigate('marketplace');
    }
  }, "Browse Full Marketplace \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "marketplace-grid"
  }, featuredMarket.map(function (item) {
    return /*#__PURE__*/React.createElement(MarketplaceCard, {
      key: item.id,
      item: item,
      onAddToCart: function onAddToCart() {
        return _onAddToCart(item, 1);
      }
    });
  }))));
}

// ----------------------------------------------------
// CAMPAIGNS PAGE COMPONENT
// ----------------------------------------------------
function CampaignsPage(_ref3) {
  var campaigns = _ref3.campaigns,
    currentUser = _ref3.currentUser,
    _onDonate2 = _ref3.onDonate,
    onAddCampaign = _ref3.onAddCampaign,
    onEditCampaign = _ref3.onEditCampaign,
    onDeleteCampaign = _ref3.onDeleteCampaign;
  var _useState29 = useState(''),
    _useState30 = _slicedToArray(_useState29, 2),
    search = _useState30[0],
    setSearch = _useState30[1];
  var _useState31 = useState('All'),
    _useState32 = _slicedToArray(_useState31, 2),
    selectedCat = _useState32[0],
    setSelectedCat = _useState32[1];
  var categories = ['All', 'Medical', 'Education', 'Environment', 'Hunger', 'Animal Welfare'];
  var filteredCampaigns = useMemo(function () {
    return campaigns.filter(function (c) {
      var matchCat = selectedCat === 'All' || c.category.toLowerCase() === selectedCat.toLowerCase();
      var matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [campaigns, selectedCat, search]);
  var canManage = currentUser.role === 'Organizer' || currentUser.role === 'Admin';
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "Donation Campaigns"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Support verified grassroots initiatives and humanitarian missions around the globe.")), canManage && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onAddCampaign
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })), /*#__PURE__*/React.createElement("span", null, "Launch New Campaign"))), /*#__PURE__*/React.createElement("div", {
    className: "filter-bar-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-input-box"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Search campaigns by title, mission, or keyword...",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "category-pills"
  }, categories.map(function (cat) {
    return /*#__PURE__*/React.createElement("button", {
      key: cat,
      className: "cat-pill-btn ".concat(selectedCat === cat ? 'active' : ''),
      onClick: function onClick() {
        return setSelectedCat(cat);
      }
    }, cat);
  }))), filteredCampaigns.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "No campaigns found matching your filter"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      marginTop: '8px'
    }
  }, "Try clearing your search query or selecting a different category.")) : /*#__PURE__*/React.createElement("div", {
    className: "campaign-grid"
  }, filteredCampaigns.map(function (cmp) {
    return /*#__PURE__*/React.createElement(CampaignCard, {
      key: cmp.id,
      campaign: cmp,
      currentUser: currentUser,
      onDonate: function onDonate() {
        return _onDonate2(cmp);
      },
      onEdit: function onEdit() {
        return onEditCampaign(cmp);
      },
      onDelete: function onDelete() {
        return onDeleteCampaign(cmp.id);
      }
    });
  })));
}
function CampaignCard(_ref4) {
  var campaign = _ref4.campaign,
    currentUser = _ref4.currentUser,
    onDonate = _ref4.onDonate,
    onEdit = _ref4.onEdit,
    onDelete = _ref4.onDelete;
  var percent = Math.min(100, Math.round(campaign.raisedAmount / campaign.targetAmount * 100));
  var isOwnerOrAdmin = currentUser && (currentUser.role === 'Admin' || currentUser.id === campaign.organizerId);
  return /*#__PURE__*/React.createElement("div", {
    className: "campaign-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-img-wrapper"
  }, /*#__PURE__*/React.createElement("img", {
    src: campaign.image,
    alt: campaign.title,
    className: "card-img"
  }), /*#__PURE__*/React.createElement("span", {
    className: "card-category-badge"
  }, campaign.category), campaign.urgent && /*#__PURE__*/React.createElement("span", {
    className: "card-urgent-ribbon"
  }, "\uD83D\uDD25 Urgent Relief")), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-organizer-row"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })), /*#__PURE__*/React.createElement("span", null, campaign.organizerName)), /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, campaign.title), /*#__PURE__*/React.createElement("p", {
    className: "card-description"
  }, campaign.description), /*#__PURE__*/React.createElement("div", {
    className: "progress-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      width: "".concat(percent, "%")
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "progress-meta-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "progress-raised"
  }, "$", campaign.raisedAmount.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "progress-target"
  }, " / $", campaign.targetAmount.toLocaleString())), /*#__PURE__*/React.createElement("span", {
    className: "progress-donors"
  }, /*#__PURE__*/React.createElement("strong", null, percent, "%"), " (", campaign.donorsCount, " Donors)"))), /*#__PURE__*/React.createElement("div", {
    className: "card-actions-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1
    },
    onClick: onDonate
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  })), /*#__PURE__*/React.createElement("span", null, "Donate Now")), isOwnerOrAdmin && onEdit && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    title: "Edit Campaign",
    onClick: onEdit
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
  }))), isOwnerOrAdmin && onDelete && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-icon",
    title: "Delete Campaign",
    onClick: onDelete
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }))))));
}

// ----------------------------------------------------
// MARKETPLACE PAGE COMPONENT
// ----------------------------------------------------
function MarketplacePage(_ref5) {
  var marketplaceItems = _ref5.marketplaceItems,
    currentUser = _ref5.currentUser,
    _onAddToCart2 = _ref5.onAddToCart,
    onAddListing = _ref5.onAddListing,
    onEditListing = _ref5.onEditListing,
    onDeleteListing = _ref5.onDeleteListing;
  var _useState33 = useState(''),
    _useState34 = _slicedToArray(_useState33, 2),
    search = _useState34[0],
    setSearch = _useState34[1];
  var _useState35 = useState('All'),
    _useState36 = _slicedToArray(_useState35, 2),
    selectedCat = _useState36[0],
    setSelectedCat = _useState36[1];
  var categories = ['All', 'Medical Supplies', 'Tech & Devices', 'Clothing & Shelter', 'School Kits', 'Emergency Supplies'];
  var filteredItems = useMemo(function () {
    return marketplaceItems.filter(function (item) {
      var matchCat = selectedCat === 'All' || item.category.toLowerCase() === selectedCat.toLowerCase();
      var matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [marketplaceItems, selectedCat, search]);
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "In-Kind Goods Marketplace"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Claim essential tangible items donated by individuals and companies for community relief.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onAddListing
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })), /*#__PURE__*/React.createElement("span", null, "Donate & List Item"))), /*#__PURE__*/React.createElement("div", {
    className: "filter-bar-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-input-box"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Search items by keyword, specs, or category...",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "category-pills"
  }, categories.map(function (cat) {
    return /*#__PURE__*/React.createElement("button", {
      key: cat,
      className: "cat-pill-btn ".concat(selectedCat === cat ? 'active' : ''),
      onClick: function onClick() {
        return setSelectedCat(cat);
      }
    }, cat);
  }))), filteredItems.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "No marketplace items matching your search"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      marginTop: '8px'
    }
  }, "Try switching categories or clearing search filters.")) : /*#__PURE__*/React.createElement("div", {
    className: "marketplace-grid"
  }, filteredItems.map(function (item) {
    return /*#__PURE__*/React.createElement(MarketplaceCard, {
      key: item.id,
      item: item,
      currentUser: currentUser,
      onAddToCart: function onAddToCart() {
        return _onAddToCart2(item, 1);
      },
      onEdit: function onEdit() {
        return onEditListing(item);
      },
      onDelete: function onDelete() {
        return onDeleteListing(item.id);
      }
    });
  })));
}
function MarketplaceCard(_ref6) {
  var item = _ref6.item,
    currentUser = _ref6.currentUser,
    onAddToCart = _ref6.onAddToCart,
    onEdit = _ref6.onEdit,
    onDelete = _ref6.onDelete;
  var isOwnerOrAdmin = currentUser && (currentUser.role === 'Admin' || currentUser.id === item.donorId);
  var isOutOfStock = item.quantity <= 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "marketplace-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mkt-img-wrapper"
  }, /*#__PURE__*/React.createElement("img", {
    src: item.image,
    alt: item.title,
    className: "card-img"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mkt-condition-badge"
  }, item.condition), /*#__PURE__*/React.createElement("span", {
    className: "mkt-stock-badge ".concat(isOutOfStock ? 'out-of-stock' : '')
  }, isOutOfStock ? 'Out of Stock' : "".concat(item.quantity, " in Stock"))), /*#__PURE__*/React.createElement("div", {
    className: "mkt-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mkt-location-row"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })), /*#__PURE__*/React.createElement("span", null, item.location, " \u2022 Donated by ", item.donorName)), /*#__PURE__*/React.createElement("h3", {
    className: "mkt-title"
  }, item.title), /*#__PURE__*/React.createElement("p", {
    className: "card-description"
  }, item.description), /*#__PURE__*/React.createElement("div", {
    className: "mkt-value-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mkt-val-label"
  }, "Est. Value:"), /*#__PURE__*/React.createElement("div", {
    className: "mkt-unit-val"
  }, "$", item.estimatedValue, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      fontWeight: 400
    }
  }, "/ unit"))), /*#__PURE__*/React.createElement("span", {
    className: "brand-badge"
  }, "Free for Aid")), /*#__PURE__*/React.createElement("div", {
    className: "card-actions-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1
    },
    disabled: isOutOfStock,
    onClick: onAddToCart
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "21",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "21",
    r: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
  })), /*#__PURE__*/React.createElement("span", null, isOutOfStock ? 'Claimed' : 'Add to Request Cart')), isOwnerOrAdmin && onEdit && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    title: "Edit Listing",
    onClick: onEdit
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
  }))), isOwnerOrAdmin && onDelete && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-icon",
    title: "Delete Listing",
    onClick: onDelete
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }))))));
}

// ----------------------------------------------------
// CART PAGE COMPONENT
// ----------------------------------------------------
function CartPage(_ref7) {
  var cart = _ref7.cart,
    cartSummary = _ref7.cartSummary,
    onUpdateQty = _ref7.onUpdateQty,
    onRemove = _ref7.onRemove,
    onClear = _ref7.onClear,
    onCheckout = _ref7.onCheckout,
    onBrowse = _ref7.onBrowse;
  if (cart.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "container",
      style: {
        textAlign: 'center',
        padding: '80px 20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '80px',
        height: '80px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px auto'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "36",
      height: "36",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      style: {
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "8",
      cy: "21",
      r: "1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "19",
      cy: "21",
      r: "1"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
    }))), /*#__PURE__*/React.createElement("h2", null, "Your Supply Request Cart is Empty"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-secondary)',
        maxWidth: '480px',
        margin: '10px auto 26px auto'
      }
    }, "Explore our in-kind donation marketplace to request essential medical gear, tech hardware, and emergency supplies."), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-lg",
      onClick: onBrowse
    }, "Browse Goods Marketplace \u2192"));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "Supply Request Cart"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Review your requested items, configure quantities, and submit your distribution grant request.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: onClear
  }, "Clear Cart")), /*#__PURE__*/React.createElement("div", {
    className: "cart-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cart-items-card"
  }, cart.map(function (item) {
    var itemTotal = item.quantity * item.unitValue;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: "cart-item-row"
    }, /*#__PURE__*/React.createElement("img", {
      src: item.image,
      alt: item.title,
      className: "cart-item-thumb"
    }), /*#__PURE__*/React.createElement("div", {
      className: "cart-item-info"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "cart-item-name"
    }, item.title), /*#__PURE__*/React.createElement("div", {
      className: "cart-item-unit"
    }, "Est. Value: $", item.unitValue, " each \u2022 Max stock: ", item.maxStock)), /*#__PURE__*/React.createElement("div", {
      className: "qty-stepper"
    }, /*#__PURE__*/React.createElement("button", {
      className: "qty-btn",
      onClick: function onClick() {
        return onUpdateQty(item.id, -1);
      },
      disabled: item.quantity <= 1,
      title: "Decrease quantity"
    }, "-"), /*#__PURE__*/React.createElement("span", {
      className: "qty-display"
    }, item.quantity), /*#__PURE__*/React.createElement("button", {
      className: "qty-btn",
      onClick: function onClick() {
        return onUpdateQty(item.id, 1);
      },
      disabled: item.quantity >= item.maxStock,
      title: "Increase quantity"
    }, "+")), /*#__PURE__*/React.createElement("div", {
      className: "cart-item-total"
    }, "$", itemTotal.toLocaleString()), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger btn-icon",
      style: {
        width: '32px',
        height: '32px'
      },
      onClick: function onClick() {
        return onRemove(item.id);
      },
      title: "Remove item"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "cart-summary-box"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '18px',
      fontSize: '1.25rem'
    }
  }, "Request Summary"), /*#__PURE__*/React.createElement("div", {
    className: "summary-row"
  }, /*#__PURE__*/React.createElement("span", null, "Total Units Requested:"), /*#__PURE__*/React.createElement("strong", null, cartSummary.totalItems, " items")), /*#__PURE__*/React.createElement("div", {
    className: "summary-row"
  }, /*#__PURE__*/React.createElement("span", null, "Estimated Goods Value:"), /*#__PURE__*/React.createElement("strong", null, "$", cartSummary.totalEstimatedValue.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "summary-row"
  }, /*#__PURE__*/React.createElement("span", null, "Marketplace Grant Subsidy:"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary-light)',
      fontWeight: 700
    }
  }, "100% Free Grant")), /*#__PURE__*/React.createElement("div", {
    className: "summary-row"
  }, /*#__PURE__*/React.createElement("span", null, "Logistics & Handling:"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)',
      fontWeight: 700
    }
  }, "Covered by Donors")), /*#__PURE__*/React.createElement("div", {
    className: "summary-row highlight"
  }, /*#__PURE__*/React.createElement("span", null, "Impact Value:"), /*#__PURE__*/React.createElement("span", {
    className: "summary-total-val"
  }, "$", cartSummary.totalEstimatedValue.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '22px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      width: '100%',
      padding: '14px'
    },
    onClick: onCheckout
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), /*#__PURE__*/React.createElement("span", null, "Submit Supply Request"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: '14px'
    }
  }, "\u26A1 Verified NGOs & community organizers receive prioritized logistics dispatch within 48 hours."))));
}

// ----------------------------------------------------
// ORDERS PAGE COMPONENT
// ----------------------------------------------------
function OrdersPage(_ref8) {
  var orders = _ref8.orders,
    currentUser = _ref8.currentUser,
    onUpdateStatus = _ref8.onUpdateStatus,
    onBrowseMarket = _ref8.onBrowseMarket;
  var isOrganizerOrAdmin = currentUser.role === 'Organizer' || currentUser.role === 'Admin';
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "Marketplace Supply Orders & Requests"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Track status, item quantities, and distribution logs for all in-kind goods dispatched.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: onBrowseMarket
  }, "Request More Supplies")), orders.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "No supply requests recorded yet"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      marginTop: '8px'
    }
  }, "Place an order from our in-kind marketplace to track it here.")) : /*#__PURE__*/React.createElement("div", null, orders.map(function (order) {
    return /*#__PURE__*/React.createElement("div", {
      key: order.id,
      className: "order-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "order-header-row"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '1.2rem',
        fontFamily: 'var(--font-mono)'
      }
    }, order.orderNumber), /*#__PURE__*/React.createElement("span", {
      className: "order-badge-status status-".concat(order.status.toLowerCase())
    }, order.status)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.84rem',
        color: 'var(--text-muted)',
        marginTop: '4px'
      }
    }, "Requested by ", /*#__PURE__*/React.createElement("strong", null, order.userName), " \u2022 ", new Date(order.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }
    }, "Total Impact Value"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '1.3rem',
        fontWeight: 800,
        color: 'var(--cyan)',
        fontFamily: 'var(--font-heading)'
      }
    }, "$", order.totalEstimatedValue ? order.totalEstimatedValue.toLocaleString() : '0'))), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '14px 0',
        fontSize: '0.88rem',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDCCD Destination Address:"), " ", order.deliveryAddress, order.notes && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '4px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDCDD Mission Need:"), " ", order.notes)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(0,0,0,0.2)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        margin: '14px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.82rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: '8px'
      }
    }, "Requested Supplies (", order.totalItems, " total units):"), order.items.map(function (it, idx) {
      return /*#__PURE__*/React.createElement("div", {
        key: idx,
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '4px 0',
          fontSize: '0.9rem'
        }
      }, /*#__PURE__*/React.createElement("span", null, "\u2022 ", it.title, " ", /*#__PURE__*/React.createElement("strong", null, "(\xD7", it.quantity, ")")), /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--primary-light)',
          fontWeight: 600
        }
      }, "$", (it.totalValue || it.quantity * it.unitValue).toLocaleString()));
    })), isOrganizerOrAdmin && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '10px',
        marginTop: '14px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }
    }, "Update Status:"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary btn-sm",
      disabled: order.status === 'Submitted',
      onClick: function onClick() {
        return onUpdateStatus(order.id, 'Submitted');
      }
    }, "Submitted"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary btn-sm",
      disabled: order.status === 'Dispatched',
      onClick: function onClick() {
        return onUpdateStatus(order.id, 'Dispatched');
      }
    }, "Dispatched"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-sm",
      disabled: order.status === 'Delivered',
      onClick: function onClick() {
        return onUpdateStatus(order.id, 'Delivered');
      }
    }, "Delivered")));
  })));
}

// ----------------------------------------------------
// DONORS PAGE COMPONENT
// ----------------------------------------------------
function DonorsPage(_ref9) {
  var donors = _ref9.donors,
    currentUser = _ref9.currentUser,
    onAddDonor = _ref9.onAddDonor;
  var _useState37 = useState(''),
    _useState38 = _slicedToArray(_useState37, 2),
    search = _useState38[0],
    setSearch = _useState38[1];
  var _useState39 = useState(false),
    _useState40 = _slicedToArray(_useState39, 2),
    showAddModal = _useState40[0],
    setShowAddModal = _useState40[1];
  var _useState41 = useState({
      name: '',
      email: '',
      badge: 'Bronze Tier'
    }),
    _useState42 = _slicedToArray(_useState41, 2),
    newDonorForm = _useState42[0],
    setNewDonorForm = _useState42[1];
  var filtered = useMemo(function () {
    return donors.filter(function (d) {
      return d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase());
    });
  }, [donors, search]);
  var handleCreateDonor = function handleCreateDonor(e) {
    e.preventDefault();
    if (!newDonorForm.name || !newDonorForm.email) return;
    onAddDonor({
      id: "dnr-".concat(Date.now()),
      name: newDonorForm.name,
      email: newDonorForm.email,
      totalDonated: 0,
      donationsCount: 0,
      badge: newDonorForm.badge,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=".concat(encodeURIComponent(newDonorForm.name)),
      lastDonatedAt: new Date().toISOString()
    });
    setNewDonorForm({
      name: '',
      email: '',
      badge: 'Bronze Tier'
    });
    setShowAddModal(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "Donor Roster & Philanthropy Tiers"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Honoring our champions, benefactors, and community supporters making change possible.")), currentUser.role === 'Admin' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: function onClick() {
      return setShowAddModal(true);
    }
  }, "+ Add Donor Profile")), /*#__PURE__*/React.createElement("div", {
    className: "filter-bar-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-input-box",
    style: {
      maxWidth: '400px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Search donors by name or email...",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "data-table-card"
  }, /*#__PURE__*/React.createElement("table", {
    className: "custom-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Donor"), /*#__PURE__*/React.createElement("th", null, "Recognition Tier"), /*#__PURE__*/React.createElement("th", null, "Total Donated"), /*#__PURE__*/React.createElement("th", null, "Gifts Made"), /*#__PURE__*/React.createElement("th", null, "Last Contribution"))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(function (d) {
    var badgeClass = d.badge.toLowerCase().includes('champion') ? 'badge-champion' : d.badge.toLowerCase().includes('gold') ? 'badge-gold' : d.badge.toLowerCase().includes('silver') ? 'badge-silver' : 'badge-bronze';
    return /*#__PURE__*/React.createElement("tr", {
      key: d.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: d.avatar,
      alt: d.name,
      style: {
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700
      }
    }, d.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }
    }, d.email)))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "donor-badge-tag ".concat(badgeClass)
    }, "\u2605 ", d.badge)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--primary-light)',
        fontFamily: 'var(--font-heading)',
        fontSize: '1.05rem'
      }
    }, "$", d.totalDonated.toLocaleString())), /*#__PURE__*/React.createElement("td", null, d.donationsCount, " gifts"), /*#__PURE__*/React.createElement("td", {
      style: {
        color: 'var(--text-secondary)',
        fontSize: '0.85rem'
      }
    }, new Date(d.lastDonatedAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })));
  })))), showAddModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "modal-title"
  }, "Register New Donor"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    onClick: function onClick() {
      return setShowAddModal(false);
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleCreateDonor
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Full Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-control",
    value: newDonorForm.name,
    onChange: function onChange(e) {
      return setNewDonorForm(_objectSpread(_objectSpread({}, newDonorForm), {}, {
        name: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    className: "form-control",
    value: newDonorForm.email,
    onChange: function onChange(e) {
      return setNewDonorForm(_objectSpread(_objectSpread({}, newDonorForm), {}, {
        email: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Philanthropy Tier"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: newDonorForm.badge,
    onChange: function onChange(e) {
      return setNewDonorForm(_objectSpread(_objectSpread({}, newDonorForm), {}, {
        badge: e.target.value
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "Champion Donor"
  }, "Champion Donor ($10,000+)"), /*#__PURE__*/React.createElement("option", {
    value: "Gold Tier"
  }, "Gold Tier ($5,000+)"), /*#__PURE__*/React.createElement("option", {
    value: "Silver Tier"
  }, "Silver Tier ($2,000+)"), /*#__PURE__*/React.createElement("option", {
    value: "Bronze Tier"
  }, "Bronze Tier ($500+)")))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: function onClick() {
      return setShowAddModal(false);
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Save Donor"))))));
}

// ----------------------------------------------------
// DONATIONS PAGE COMPONENT
// ----------------------------------------------------
function DonationsPage(_ref10) {
  var donations = _ref10.donations,
    onViewReceipt = _ref10.onViewReceipt;
  var _useState43 = useState(''),
    _useState44 = _slicedToArray(_useState43, 2),
    search = _useState44[0],
    setSearch = _useState44[1];
  var filtered = useMemo(function () {
    return donations.filter(function (don) {
      return don.campaignTitle.toLowerCase().includes(search.toLowerCase()) || don.donorName.toLowerCase().includes(search.toLowerCase()) || don.receiptNumber.toLowerCase().includes(search.toLowerCase());
    });
  }, [donations, search]);
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "Financial Donations & Tax Records"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Transparent transaction ledger with downloadable and printable official tax receipts."))), /*#__PURE__*/React.createElement("div", {
    className: "filter-bar-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-input-box",
    style: {
      maxWidth: '420px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Search by receipt #, donor, or campaign...",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "data-table-card"
  }, /*#__PURE__*/React.createElement("table", {
    className: "custom-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Receipt #"), /*#__PURE__*/React.createElement("th", null, "Campaign"), /*#__PURE__*/React.createElement("th", null, "Donor"), /*#__PURE__*/React.createElement("th", null, "Amount"), /*#__PURE__*/React.createElement("th", null, "Payment Method"), /*#__PURE__*/React.createElement("th", null, "Date"), /*#__PURE__*/React.createElement("th", null, "Action"))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(function (don) {
    return /*#__PURE__*/React.createElement("tr", {
      key: don.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color: 'var(--cyan)'
      }
    }, don.receiptNumber)), /*#__PURE__*/React.createElement("td", {
      style: {
        maxWidth: '260px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, don.campaignTitle), don.message && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        fontStyle: 'italic'
      }
    }, "\"", don.message, "\"")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, don.donorName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.78rem',
        color: 'var(--text-muted)'
      }
    }, don.donorEmail)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--primary-light)',
        fontSize: '1.1rem',
        fontFamily: 'var(--font-heading)'
      }
    }, "$", don.amount.toLocaleString())), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "brand-badge",
      style: {
        background: 'rgba(255,255,255,0.06)'
      }
    }, don.paymentMethod)), /*#__PURE__*/React.createElement("td", {
      style: {
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }
    }, new Date(don.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-outline btn-sm",
      onClick: function onClick() {
        return onViewReceipt(don);
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "14 2 14 8 20 8"
    })), /*#__PURE__*/React.createElement("span", null, "Tax Receipt"))));
  })))));
}

// ----------------------------------------------------
// DASHBOARD PAGE COMPONENT
// ----------------------------------------------------
function DashboardPage(_ref11) {
  var currentUser = _ref11.currentUser,
    campaigns = _ref11.campaigns,
    donors = _ref11.donors,
    donations = _ref11.donations,
    orders = _ref11.orders,
    marketplaceItems = _ref11.marketplaceItems,
    onNavigate = _ref11.onNavigate,
    onAddCampaign = _ref11.onAddCampaign,
    onAddListing = _ref11.onAddListing,
    onApproveCampaign = _ref11.onApproveCampaign;
  var isDonor = currentUser.role === 'Donor';
  var isOrganizer = currentUser.role === 'Organizer';
  var isAdmin = currentUser.role === 'Admin';
  var totalFunds = useMemo(function () {
    return campaigns.reduce(function (sum, c) {
      return sum + c.raisedAmount;
    }, 0);
  }, [campaigns]);
  var totalItemsDistributed = useMemo(function () {
    return orders.reduce(function (sum, o) {
      return sum + o.totalItems;
    }, 0);
  }, [orders]);
  var myDonations = useMemo(function () {
    return donations.filter(function (d) {
      return d.donorEmail.toLowerCase() === currentUser.email.toLowerCase();
    });
  }, [donations, currentUser]);
  var myTotalGiven = useMemo(function () {
    return myDonations.reduce(function (sum, d) {
      return sum + d.amount;
    }, 0);
  }, [myDonations]);
  var myCampaigns = useMemo(function () {
    return campaigns.filter(function (c) {
      return c.organizerId === currentUser.id;
    });
  }, [campaigns, currentUser]);
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: currentUser.avatar,
    alt: currentUser.name,
    style: {
      width: '54px',
      height: '54px',
      borderRadius: '50%',
      border: '2px solid var(--primary)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, currentUser.role, " Control Center"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc"
  }, "Welcome back, ", currentUser.name, " \u2022 ", currentUser.organization || 'General Supporter'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, isOrganizer && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: onAddCampaign
  }, "+ New Campaign"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: onAddListing
  }, "+ List Goods")), isAdmin && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: onAddCampaign
  }, "+ Create Campaign"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: onAddListing
  }, "+ Add Inventory")), isDonor && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: function onClick() {
      return onNavigate('campaigns');
    }
  }, "Explore Campaigns"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats-grid",
    style: {
      marginBottom: '36px'
    }
  }, isDonor ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num text-gradient"
  }, "$", myTotalGiven.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "My Total Direct Donations")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, myDonations.length), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Campaigns Supported")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, "100%"), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Tax Deduction Eligible"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num text-gradient"
  }, "$", totalFunds.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Total Platform Funds Raised")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, totalItemsDistributed, " Units"), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Goods & Supplies Dispatched")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, campaigns.length), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Active Campaigns")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-num"
  }, donors.length), /*#__PURE__*/React.createElement("span", {
    className: "stat-label"
  }, "Verified Donors")))), (isOrganizer || isAdmin) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '40px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '16px',
      fontSize: '1.3rem'
    }
  }, isAdmin ? 'All Campaigns Moderation Ledger' : 'My Managed Campaigns'), /*#__PURE__*/React.createElement("div", {
    className: "data-table-card"
  }, /*#__PURE__*/React.createElement("table", {
    className: "custom-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Campaign Title"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Progress"), /*#__PURE__*/React.createElement("th", null, "Raised / Goal"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Action"))), /*#__PURE__*/React.createElement("tbody", null, (isAdmin ? campaigns : myCampaigns).map(function (c) {
    var pct = Math.round(c.raisedAmount / c.targetAmount * 100);
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 600
      }
    }, c.title), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "brand-badge"
    }, c.category)), /*#__PURE__*/React.createElement("td", {
      style: {
        minWidth: '120px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-track",
      style: {
        height: '6px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-fill",
      style: {
        width: "".concat(Math.min(100, pct), "%")
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }
    }, pct, "% funded")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, "$", c.raisedAmount.toLocaleString()), " / $", c.targetAmount.toLocaleString()), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "order-badge-status status-".concat(c.status.toLowerCase())
    }, c.status)), /*#__PURE__*/React.createElement("td", null, c.status !== 'Active' && isAdmin ? /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary btn-sm",
      onClick: function onClick() {
        return onApproveCampaign(c.id);
      }
    }, "Approve") : /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary btn-sm",
      onClick: function onClick() {
        return onNavigate('campaigns');
      }
    }, "View")));
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '16px',
      fontSize: '1.3rem'
    }
  }, isDonor ? 'My Donation Contribution History' : 'Recent Platform Activity'), /*#__PURE__*/React.createElement("div", {
    className: "data-table-card"
  }, /*#__PURE__*/React.createElement("table", {
    className: "custom-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Receipt ID"), /*#__PURE__*/React.createElement("th", null, "Campaign"), /*#__PURE__*/React.createElement("th", null, "Donor"), /*#__PURE__*/React.createElement("th", null, "Amount"), /*#__PURE__*/React.createElement("th", null, "Date"))), /*#__PURE__*/React.createElement("tbody", null, (isDonor ? myDonations : donations.slice(0, 5)).map(function (don) {
    return /*#__PURE__*/React.createElement("tr", {
      key: don.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--cyan)'
      }
    }, don.receiptNumber), /*#__PURE__*/React.createElement("td", {
      style: {
        fontWeight: 600
      }
    }, don.campaignTitle), /*#__PURE__*/React.createElement("td", null, don.donorName), /*#__PURE__*/React.createElement("td", {
      style: {
        color: 'var(--primary-light)',
        fontWeight: 700
      }
    }, "$", don.amount.toLocaleString()), /*#__PURE__*/React.createElement("td", {
      style: {
        color: 'var(--text-secondary)',
        fontSize: '0.85rem'
      }
    }, new Date(don.createdAt).toLocaleDateString()));
  }))))));
}

// ----------------------------------------------------
// DONATE MODAL COMPONENT
// ----------------------------------------------------
function DonateModal(_ref12) {
  var campaign = _ref12.campaign,
    currentUser = _ref12.currentUser,
    onClose = _ref12.onClose,
    onSubmit = _ref12.onSubmit;
  var _useState45 = useState('50'),
    _useState46 = _slicedToArray(_useState45, 2),
    amount = _useState46[0],
    setAmount = _useState46[1];
  var _useState47 = useState(''),
    _useState48 = _slicedToArray(_useState47, 2),
    customAmount = _useState48[0],
    setCustomAmount = _useState48[1];
  var _useState49 = useState(currentUser ? currentUser.name : ''),
    _useState50 = _slicedToArray(_useState49, 2),
    donorName = _useState50[0],
    setDonorName = _useState50[1];
  var _useState51 = useState(currentUser ? currentUser.email : ''),
    _useState52 = _slicedToArray(_useState51, 2),
    donorEmail = _useState52[0],
    setDonorEmail = _useState52[1];
  var _useState53 = useState('Credit Card'),
    _useState54 = _slicedToArray(_useState53, 2),
    paymentMethod = _useState54[0],
    setPaymentMethod = _useState54[1];
  var _useState55 = useState(false),
    _useState56 = _slicedToArray(_useState55, 2),
    isAnonymous = _useState56[0],
    setIsAnonymous = _useState56[1];
  var _useState57 = useState(''),
    _useState58 = _slicedToArray(_useState57, 2),
    message = _useState58[0],
    setMessage = _useState58[1];
  var presets = ['25', '50', '100', '250'];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var finalAmount = customAmount ? Number(customAmount) : Number(amount);
    if (!finalAmount || finalAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
    onSubmit({
      campaignId: campaign ? campaign.id : 'cmp-1',
      amount: finalAmount,
      donorName: donorName,
      donorEmail: donorEmail,
      paymentMethod: paymentMethod,
      isAnonymous: isAnonymous,
      message: message
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "modal-title"
  }, "Make a Donation"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }
  }, campaign ? campaign.title : 'General Relief Fund')), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Select Amount ($ USD)"), /*#__PURE__*/React.createElement("div", {
    className: "amount-preset-grid"
  }, presets.map(function (p) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: p,
      className: "amount-btn ".concat(amount === p && !customAmount ? 'active' : ''),
      onClick: function onClick() {
        setAmount(p);
        setCustomAmount('');
      }
    }, "$", p);
  })), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    placeholder: "Or enter custom amount ($ USD)",
    className: "form-control",
    value: customAmount,
    onChange: function onChange(e) {
      setCustomAmount(e.target.value);
      setAmount('');
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Donor Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: !isAnonymous,
    disabled: isAnonymous,
    className: "form-control",
    value: isAnonymous ? 'Anonymous' : donorName,
    onChange: function onChange(e) {
      return setDonorName(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email for Tax Receipt"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    className: "form-control",
    value: donorEmail,
    onChange: function onChange(e) {
      return setDonorEmail(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Payment Method"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: paymentMethod,
    onChange: function onChange(e) {
      return setPaymentMethod(e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "Credit Card"
  }, "Credit Card (Instant Visa / Mastercard)"), /*#__PURE__*/React.createElement("option", {
    value: "PayPal"
  }, "PayPal"), /*#__PURE__*/React.createElement("option", {
    value: "Crypto (ETH)"
  }, "Crypto (Ethereum / USDC)"), /*#__PURE__*/React.createElement("option", {
    value: "Bank Wire"
  }, "Bank Wire Transfer"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Encouraging Note / Message (Optional)"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-control",
    placeholder: "Write an uplifting message to the organizers and relief team...",
    value: message,
    onChange: function onChange(e) {
      return setMessage(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '10px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "anonCheck",
    checked: isAnonymous,
    onChange: function onChange(e) {
      return setIsAnonymous(e.target.checked);
    }
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "anonCheck",
    style: {
      fontSize: '0.88rem',
      cursor: 'pointer'
    }
  }, "Keep my donation anonymous on the public roster"))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Confirm & Donate $", customAmount || amount)))));
}

// ----------------------------------------------------
// ADD / EDIT CAMPAIGN MODAL
// ----------------------------------------------------
function AddEditCampaignModal(_ref13) {
  var initialData = _ref13.initialData,
    currentUser = _ref13.currentUser,
    onClose = _ref13.onClose,
    onSubmit = _ref13.onSubmit;
  var _useState59 = useState({
      title: initialData ? initialData.title : '',
      category: initialData ? initialData.category : 'Medical',
      targetAmount: initialData ? initialData.targetAmount : 25000,
      urgent: initialData ? initialData.urgent : false,
      endDate: initialData ? initialData.endDate : '2026-12-31',
      image: initialData ? initialData.image : 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=800&auto=format&fit=crop&q=80',
      description: initialData ? initialData.description : ''
    }),
    _useState60 = _slicedToArray(_useState59, 2),
    form = _useState60[0],
    setForm = _useState60[1];
  var categories = ['Medical', 'Education', 'Environment', 'Hunger', 'Animal Welfare', 'Disaster Relief'];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.targetAmount) return;
    onSubmit(form);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "modal-title"
  }, initialData ? 'Edit Campaign' : 'Launch New Fundraising Campaign'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Campaign Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-control",
    placeholder: "e.g. Emergency Surgical Relief for Flood Victims",
    value: form.title,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        title: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: form.category,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        category: e.target.value
      }));
    }
  }, categories.map(function (c) {
    return /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, c);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Target Funding Goal ($ USD)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    min: "100",
    className: "form-control",
    value: form.targetAmount,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        targetAmount: e.target.value
      }));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Cover Image URL"), /*#__PURE__*/React.createElement("input", {
    type: "url",
    required: true,
    className: "form-control",
    value: form.image,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        image: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Campaign Narrative & Mission"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    className: "form-control",
    style: {
      minHeight: '110px'
    },
    placeholder: "Describe who benefits from this campaign and how funds will be deployed...",
    value: form.description,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        description: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "urgentCheck",
    checked: form.urgent,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        urgent: e.target.checked
      }));
    }
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "urgentCheck",
    style: {
      fontSize: '0.88rem',
      cursor: 'pointer'
    }
  }, "Flag as \uD83D\uDEA8 Urgent Priority Relief"))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, initialData ? 'Save Changes' : 'Publish Campaign')))));
}

// ----------------------------------------------------
// ADD / EDIT LISTING MODAL
// ----------------------------------------------------
function AddEditListingModal(_ref14) {
  var initialData = _ref14.initialData,
    currentUser = _ref14.currentUser,
    onClose = _ref14.onClose,
    onSubmit = _ref14.onSubmit;
  var _useState61 = useState({
      title: initialData ? initialData.title : '',
      category: initialData ? initialData.category : 'Medical Supplies',
      quantity: initialData ? initialData.quantity : 10,
      estimatedValue: initialData ? initialData.estimatedValue : 50,
      condition: initialData ? initialData.condition : 'Brand New',
      location: initialData ? initialData.location : 'Chicago, IL',
      image: initialData ? initialData.image : 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
      description: initialData ? initialData.description : ''
    }),
    _useState62 = _slicedToArray(_useState61, 2),
    form = _useState62[0],
    setForm = _useState62[1];
  var categories = ['Medical Supplies', 'Tech & Devices', 'Clothing & Shelter', 'School Kits', 'Emergency Supplies', 'General Supplies'];
  var conditions = ['Brand New', 'Like New', 'Refurbished', 'Good'];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || form.quantity === undefined) return;
    onSubmit(form);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "modal-title"
  }, initialData ? 'Edit Item Listing' : 'Donate Supplies to Marketplace'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Item Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-control",
    placeholder: "e.g. Sterile First Aid Backpacks or Coding Laptops",
    value: form.title,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        title: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: form.category,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        category: e.target.value
      }));
    }
  }, categories.map(function (c) {
    return /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, c);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Condition"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: form.condition,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        condition: e.target.value
      }));
    }
  }, conditions.map(function (c) {
    return /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, c);
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Quantity Available"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    min: "1",
    className: "form-control",
    value: form.quantity,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        quantity: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Est. Unit Value ($ USD)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    min: "0",
    className: "form-control",
    value: form.estimatedValue,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        estimatedValue: e.target.value
      }));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Dispatch Location (City, State / Country)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-control",
    value: form.location,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        location: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Product Photo URL"), /*#__PURE__*/React.createElement("input", {
    type: "url",
    required: true,
    className: "form-control",
    value: form.image,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        image: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Item Specifications & Details"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    className: "form-control",
    placeholder: "Include model numbers, accessories included, and expiration dates if applicable...",
    value: form.description,
    onChange: function onChange(e) {
      return setForm(_objectSpread(_objectSpread({}, form), {}, {
        description: e.target.value
      }));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, initialData ? 'Save Changes' : 'List Item Now')))));
}

// ----------------------------------------------------
// CHECKOUT MODAL COMPONENT
// ----------------------------------------------------
function CheckoutModal(_ref15) {
  var cart = _ref15.cart,
    cartSummary = _ref15.cartSummary,
    currentUser = _ref15.currentUser,
    onClose = _ref15.onClose,
    onSubmit = _ref15.onSubmit;
  var _useState63 = useState('742 Evergreen Community Hub, Sector 4, Chicago IL'),
    _useState64 = _slicedToArray(_useState63, 2),
    deliveryAddress = _useState64[0],
    setDeliveryAddress = _useState64[1];
  var _useState65 = useState('Urgent distribution for displaced families.'),
    _useState66 = _slicedToArray(_useState65, 2),
    notes = _useState66[0],
    setNotes = _useState66[1];
  var _useState67 = useState('+1 (555) 382-9104'),
    _useState68 = _slicedToArray(_useState67, 2),
    contactPhone = _useState68[0],
    setContactPhone = _useState68[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (!deliveryAddress) return;
    onSubmit({
      deliveryAddress: deliveryAddress,
      notes: notes,
      contactPhone: contactPhone
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "modal-title"
  }, "Confirm Supply Distribution Request"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }
  }, cartSummary.totalItems, " units requested \u2022 $", cartSummary.totalEstimatedValue.toLocaleString(), " Value")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Requesting Organization / Beneficiary"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    disabled: true,
    className: "form-control",
    value: "".concat(currentUser.name, " (").concat(currentUser.organization || 'Verified Community Organizer', ")")
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Delivery / Logistics Address"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-control",
    placeholder: "Full street address, warehouse dock, or field distribution center",
    value: deliveryAddress,
    onChange: function onChange(e) {
      return setDeliveryAddress(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Contact Phone (for delivery dispatch)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-control",
    value: contactPhone,
    onChange: function onChange(e) {
      return setContactPhone(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Mission Justification & Need Statement"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    className: "form-control",
    placeholder: "Briefly state how these supplies will be utilized on the ground...",
    value: notes,
    onChange: function onChange(e) {
      return setNotes(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      marginBottom: '6px'
    }
  }, "Items in Request:"), cart.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.88rem',
        padding: '3px 0'
      }
    }, /*#__PURE__*/React.createElement("span", null, c.title, " (\xD7", c.quantity, ")"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--cyan)'
      }
    }, "$", (c.quantity * c.unitValue).toLocaleString()));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Confirm & Submit Order")))));
}

// ----------------------------------------------------
// TAX RECEIPT MODAL COMPONENT
// ----------------------------------------------------
function TaxReceiptModal(_ref16) {
  var receipt = _ref16.receipt,
    onClose = _ref16.onClose;
  var handlePrint = function handlePrint() {
    window.print();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "modal-title"
  }, "Official Tax-Deductible Donation Receipt"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: handlePrint
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "12",
    height: "8",
    x: "6",
    y: "14"
  })), /*#__PURE__*/React.createElement("span", null, "Print / PDF")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    onClick: onClose
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tax-receipt-container",
    id: "printableTaxReceipt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "receipt-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#0f172a',
      fontSize: '1.4rem'
    }
  }, "Donatify Global Aid Foundation"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.85rem',
      color: '#64748b'
    }
  }, "501(c)(3) Non-Profit Public Charity \u2022 EIN: 47-8829104"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: '#64748b'
    }
  }, "100 Hope Plaza, Suite 400, Chicago, IL 60601")), /*#__PURE__*/React.createElement("span", {
    className: "receipt-badge-status"
  }, "501(c)(3) VERIFIED")), /*#__PURE__*/React.createElement("div", {
    className: "receipt-amount-banner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.85rem',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, "Contribution Amount"), /*#__PURE__*/React.createElement("div", {
    className: "receipt-amount-val"
  }, "$", receipt.amount.toLocaleString(), " USD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: '#059669',
      fontWeight: 600
    }
  }, "100% Tax-Deductible \u2022 No Goods or Services Exchanged")), /*#__PURE__*/React.createElement("div", {
    className: "receipt-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#475569',
      fontSize: '0.8rem',
      textTransform: 'uppercase'
    }
  }, "Receipt Number:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'monospace',
      fontWeight: 700,
      fontSize: '1.05rem',
      color: '#0f172a'
    }
  }, receipt.receiptNumber)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#475569',
      fontSize: '0.8rem',
      textTransform: 'uppercase'
    }
  }, "Date of Transaction:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: '#0f172a'
    }
  }, new Date(receipt.createdAt).toLocaleString())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#475569',
      fontSize: '0.8rem',
      textTransform: 'uppercase'
    }
  }, "Donor Name:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: '#0f172a'
    }
  }, receipt.donorName)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#475569',
      fontSize: '0.8rem',
      textTransform: 'uppercase'
    }
  }, "Payment Method:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: '#0f172a'
    }
  }, receipt.paymentMethod, " (Processed)")), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span 2'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#475569',
      fontSize: '0.8rem',
      textTransform: 'uppercase'
    }
  }, "Designated Campaign:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: '#0f172a'
    }
  }, receipt.campaignTitle))), /*#__PURE__*/React.createElement("div", {
    className: "receipt-footer-seal"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Authorized Signature:"), " Dr. Sarah Jenkins, Chairperson"), /*#__PURE__*/React.createElement("div", null, "Security Hash: ", /*#__PURE__*/React.createElement("code", null, receipt.id, "-VERIFIED"))))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: onClose
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: handlePrint
  }, "Print Official Receipt"))));
}

// ----------------------------------------------------
// AUTH MODAL COMPONENT
// ----------------------------------------------------
function AuthModal(_ref17) {
  var users = _ref17.users,
    currentUser = _ref17.currentUser,
    onSelectUser = _ref17.onSelectUser,
    onRegister = _ref17.onRegister,
    onClose = _ref17.onClose;
  var _useState69 = useState('login'),
    _useState70 = _slicedToArray(_useState69, 2),
    tab = _useState70[0],
    setTab = _useState70[1];
  var _useState71 = useState({
      name: '',
      email: '',
      password: '',
      role: 'Donor',
      organization: ''
    }),
    _useState72 = _slicedToArray(_useState71, 2),
    regForm = _useState72[0],
    setRegForm = _useState72[1];
  var handleRegisterSubmit = function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!regForm.name || !regForm.email) return;
    onRegister({
      id: "usr-".concat(Date.now()),
      name: regForm.name,
      email: regForm.email,
      role: regForm.role,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=".concat(encodeURIComponent(regForm.name)),
      organization: regForm.organization || (regForm.role === 'Organizer' ? 'Community Relief Org' : 'Supporter')
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm ".concat(tab === 'login' ? 'btn-primary' : 'btn-secondary'),
    onClick: function onClick() {
      return setTab('login');
    }
  }, "Quick Demo Logins"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm ".concat(tab === 'register' ? 'btn-primary' : 'btn-secondary'),
    onClick: function onClick() {
      return setTab('register');
    }
  }, "Create New Account")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-icon",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, tab === 'login' ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.9rem',
      marginBottom: '18px'
    }
  }, "Select a pre-configured demo account to instantly explore role-specific permissions and dashboards:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, users.map(function (u) {
    return /*#__PURE__*/React.createElement("div", {
      key: u.id,
      onClick: function onClick() {
        return onSelectUser(u);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px',
        background: currentUser.id === u.id ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-input)',
        border: currentUser.id === u.id ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: u.avatar,
      alt: u.name,
      style: {
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, u.name), /*#__PURE__*/React.createElement("span", {
      className: "role-pill-badge role-".concat(u.role.toLowerCase())
    }, u.role)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }
    }, u.email, " \u2022 ", u.organization)), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-outline btn-sm"
    }, "Log In \u2192"));
  }))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: handleRegisterSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Full Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-control",
    placeholder: "e.g. Alex Morgan",
    value: regForm.name,
    onChange: function onChange(e) {
      return setRegForm(_objectSpread(_objectSpread({}, regForm), {}, {
        name: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    className: "form-control",
    placeholder: "alex@example.org",
    value: regForm.email,
    onChange: function onChange(e) {
      return setRegForm(_objectSpread(_objectSpread({}, regForm), {}, {
        email: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-control",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: regForm.password,
    onChange: function onChange(e) {
      return setRegForm(_objectSpread(_objectSpread({}, regForm), {}, {
        password: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Account Role"), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: regForm.role,
    onChange: function onChange(e) {
      return setRegForm(_objectSpread(_objectSpread({}, regForm), {}, {
        role: e.target.value
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "Donor"
  }, "Donor (Donate funds & browse supplies)"), /*#__PURE__*/React.createElement("option", {
    value: "Organizer"
  }, "Organizer (Launch campaigns & request goods)"), /*#__PURE__*/React.createElement("option", {
    value: "Admin"
  }, "Platform Administrator (Moderation & full control)"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Organization Name (Optional)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "e.g. Global Health Network or Independent",
    value: regForm.organization,
    onChange: function onChange(e) {
      return setRegForm(_objectSpread(_objectSpread({}, regForm), {}, {
        organization: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      width: '100%',
      marginTop: '10px'
    }
  }, "Register Account")))));
}

// ----------------------------------------------------
// MOUNT ROOT
// ----------------------------------------------------
var rootElement = document.getElementById('root');
if (rootElement) {
  var root = ReactDOM.createRoot(rootElement);
  root.render( /*#__PURE__*/React.createElement(App, null));
}