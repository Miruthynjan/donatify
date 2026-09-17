// ==========================================================================
// DONATION MARKETPLACE - FULL REACT SINGLE PAGE APPLICATION
// Featuring Campaigns, In-Kind Marketplace, Cart Total Calculations, 
// Order History, Donor Management, Role-Based Dashboards & Tax Receipts.
// ==========================================================================

const { useState, useEffect, useMemo } = React;

// ----------------------------------------------------
// DEFAULT SEED DATA
// ----------------------------------------------------
const INITIAL_DATA = {
  users: [
    {
      id: 'usr-1',
      name: 'Elena Rostova',
      email: 'donor@hope.org',
      role: 'Donor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      organization: 'Individual Philanthropist'
    },
    {
      id: 'usr-2',
      name: 'Marcus Vance',
      email: 'organizer@care.org',
      role: 'Organizer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      organization: 'Care & Relief Global'
    },
    {
      id: 'usr-3',
      name: 'Dr. Sarah Jenkins',
      email: 'admin@marketplace.org',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      organization: 'Marketplace Oversight Foundation'
    }
  ],
  campaigns: [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ],
  marketplaceItems: [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ],
  donors: [
    {
      id: 'dnr-1',
      name: 'Elena Rostova',
      email: 'donor@hope.org',
      totalDonated: 12450,
      donationsCount: 14,
      badge: 'Champion Donor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: '2026-09-15T10:00:00Z'
    },
    {
      id: 'dnr-2',
      name: 'Jonathan Sterling',
      email: 'j.sterling@meridian.io',
      totalDonated: 8900,
      donationsCount: 8,
      badge: 'Gold Tier',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: '2026-09-12T14:30:00Z'
    },
    {
      id: 'dnr-3',
      name: 'Amina Al-Mansoor',
      email: 'amina.mansoor@oasis.org',
      totalDonated: 6200,
      donationsCount: 6,
      badge: 'Gold Tier',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: '2026-09-10T11:20:00Z'
    },
    {
      id: 'dnr-4',
      name: 'David & Clara Hughes',
      email: 'hughes.family@outlook.com',
      totalDonated: 3450,
      donationsCount: 5,
      badge: 'Silver Tier',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: '2026-09-05T09:00:00Z'
    },
    {
      id: 'dnr-5',
      name: 'Priya Narayanan',
      email: 'priya.n@techseed.in',
      totalDonated: 1850,
      donationsCount: 3,
      badge: 'Bronze Tier',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: '2026-08-30T16:00:00Z'
    }
  ],
  donations: [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
  ],
  orders: [
    {
      id: 'ord-1',
      orderNumber: 'REQ-2026-9041',
      userId: 'usr-2',
      userName: 'Marcus Vance (Care & Relief)',
      deliveryAddress: '742 Evergreen Community Hub, Sector 4, Chicago IL',
      notes: 'Urgent distribution for displaced community clinic.',
      status: 'Dispatched',
      totalItems: 4,
      totalEstimatedValue: 960,
      items: [
        {
          id: 'mkt-1',
          title: 'Pediatric Wheelchairs & Mobility Walkers',
          quantity: 2,
          unitValue: 240,
          totalValue: 480
        },
        {
          id: 'mkt-4',
          title: 'Sterile Surgical First Aid Backpacks',
          quantity: 2,
          unitValue: 240,
          totalValue: 480
        }
      ],
      createdAt: '2026-09-14T09:30:00Z'
    },
    {
      id: 'ord-2',
      orderNumber: 'REQ-2026-9035',
      userId: 'usr-1',
      userName: 'Elena Rostova',
      deliveryAddress: 'Rural Youth Center, 120 Mountain Road, Denver CO',
      notes: 'High school computer lab installation.',
      status: 'Delivered',
      totalItems: 5,
      totalEstimatedValue: 900,
      items: [
        {
          id: 'mkt-2',
          title: 'Refurbished ThinkPad Laptops (Core i5 / 16GB)',
          quantity: 5,
          unitValue: 180,
          totalValue: 900
        }
      ],
      createdAt: '2026-09-08T15:45:00Z'
    }
  ]
};

// Storage helper functions
const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(`donatemarket_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredData = (key, value) => {
  try {
    localStorage.setItem(`donatemarket_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

// ==========================================================================
// MAIN ROOT COMPONENT
// ==========================================================================
function App() {
  // Navigation View State: 'home', 'campaigns', 'marketplace', 'cart', 'orders', 'donors', 'donations', 'dashboard'
  const [currentView, setCurrentView] = useState('home');

  // Global App States
  const [users, setUsers] = useState(() => getStoredData('users', INITIAL_DATA.users));
  const [currentUser, setCurrentUser] = useState(() => getStoredData('currentUser', INITIAL_DATA.users[0]));
  const [campaigns, setCampaigns] = useState(() => getStoredData('campaigns', INITIAL_DATA.campaigns));
  const [marketplaceItems, setMarketplaceItems] = useState(() => getStoredData('marketplaceItems', INITIAL_DATA.marketplaceItems));
  const [donors, setDonors] = useState(() => getStoredData('donors', INITIAL_DATA.donors));
  const [donations, setDonations] = useState(() => getStoredData('donations', INITIAL_DATA.donations));
  const [orders, setOrders] = useState(() => getStoredData('orders', INITIAL_DATA.orders));
  const [cart, setCart] = useState(() => getStoredData('cart', []));

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'donate', 'addCampaign', 'addListing', 'checkout', 'receipt', 'auth'
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Persist State Changes
  useEffect(() => setStoredData('users', users), [users]);
  useEffect(() => setStoredData('currentUser', currentUser), [currentUser]);
  useEffect(() => setStoredData('campaigns', campaigns), [campaigns]);
  useEffect(() => setStoredData('marketplaceItems', marketplaceItems), [marketplaceItems]);
  useEffect(() => setStoredData('donors', donors), [donors]);
  useEffect(() => setStoredData('donations', donations), [donations]);
  useEffect(() => setStoredData('orders', orders), [orders]);
  useEffect(() => setStoredData('cart', cart), [cart]);

  // Toast Notification Trigger
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Switch Active User / Role
  const handleSwitchUser = (userId) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      showToast(`Switched active profile to ${found.name} (${found.role})`, 'info');
    }
  };

  // ----------------------------------------------------
  // CART CALCULATIONS & ACTIONS
  // ----------------------------------------------------
  const addToCart = (item, requestedQty = 1) => {
    const existingIndex = cart.findIndex(c => c.id === item.id);
    const availableStock = item.quantity;

    if (availableStock <= 0) {
      showToast('Sorry, this item is currently out of stock.', 'error');
      return;
    }

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      const newQty = updatedCart[existingIndex].quantity + requestedQty;
      if (newQty > availableStock) {
        showToast(`Cannot add more than ${availableStock} units available in stock.`, 'error');
        return;
      }
      updatedCart[existingIndex].quantity = newQty;
      setCart(updatedCart);
    } else {
      setCart(prev => [...prev, {
        id: item.id,
        title: item.title,
        unitValue: item.estimatedValue || 0,
        image: item.image,
        category: item.category,
        maxStock: availableStock,
        quantity: Math.min(requestedQty, availableStock)
      }]);
    }
    showToast(`Added "${item.title}" to request cart.`, 'success');
  };

  const updateCartQuantity = (itemId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          if (newQty < 1) return item;
          if (newQty > item.maxStock) {
            showToast(`Maximum available stock reached (${item.maxStock}).`, 'error');
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Real-Time Total Calculations
  const cartSummary = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalEstimatedValue = cart.reduce((sum, item) => sum + (item.quantity * item.unitValue), 0);
    return { totalItems, totalEstimatedValue };
  }, [cart]);

  // ----------------------------------------------------
  // DONATION & CAMPAIGN ACTIONS
  // ----------------------------------------------------
  const handleMakeDonation = (donationData) => {
    const { campaignId, amount, donorName, donorEmail, paymentMethod, isAnonymous, message } = donationData;
    const numAmount = Number(amount);
    const receiptNum = `RCPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newDonation = {
      id: `don-${Date.now()}`,
      campaignId,
      campaignTitle: selectedCampaign ? selectedCampaign.title : 'General Relief Fund',
      donorName: isAnonymous ? 'Anonymous Donor' : (donorName || currentUser.name),
      donorEmail: isAnonymous ? 'anonymous@hope.org' : (donorEmail || currentUser.email),
      amount: numAmount,
      paymentMethod: paymentMethod || 'Credit Card',
      receiptNumber: receiptNum,
      isAnonymous: Boolean(isAnonymous),
      message: message || '',
      createdAt: new Date().toISOString()
    };

    setDonations(prev => [newDonation, ...prev]);

    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          raisedAmount: c.raisedAmount + numAmount,
          donorsCount: c.donorsCount + 1
        };
      }
      return c;
    }));

    if (!isAnonymous) {
      setDonors(prev => {
        const email = donorEmail || currentUser.email;
        const existing = prev.find(d => d.email.toLowerCase() === email.toLowerCase());
        if (existing) {
          const newTotal = existing.totalDonated + numAmount;
          let badge = 'Bronze Tier';
          if (newTotal >= 10000) badge = 'Champion Donor';
          else if (newTotal >= 5000) badge = 'Gold Tier';
          else if (newTotal >= 2000) badge = 'Silver Tier';

          return prev.map(d => d.id === existing.id ? {
            ...d,
            totalDonated: newTotal,
            donationsCount: d.donationsCount + 1,
            badge,
            lastDonatedAt: new Date().toISOString()
          } : d);
        } else {
          return [{
            id: `dnr-${Date.now()}`,
            name: donorName || currentUser.name,
            email: email,
            totalDonated: numAmount,
            donationsCount: 1,
            badge: numAmount >= 2000 ? 'Silver Tier' : 'Bronze Tier',
            avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            lastDonatedAt: new Date().toISOString()
          }, ...prev];
        }
      });
    }

    setActiveModal(null);
    setSelectedReceipt(newDonation);
    setActiveModal('receipt');
    showToast(`Thank you! Your donation of $${numAmount.toLocaleString()} has been processed.`, 'success');
  };

  // ----------------------------------------------------
  // ORDER CHECKOUT ACTION
  // ----------------------------------------------------
  const handleCheckoutSubmit = (formData) => {
    if (cart.length === 0) return;

    const orderNumber = `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const processedItems = cart.map(item => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      unitValue: item.unitValue,
      totalValue: item.quantity * item.unitValue
    }));

    setMarketplaceItems(prev => prev.map(mkt => {
      const cartItem = cart.find(c => c.id === mkt.id);
      if (cartItem) {
        const newStock = Math.max(0, mkt.quantity - cartItem.quantity);
        return {
          ...mkt,
          quantity: newStock,
          status: newStock === 0 ? 'Claimed' : 'Available'
        };
      }
      return mkt;
    }));

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: currentUser.id,
      userName: `${currentUser.name} (${currentUser.organization || 'Community'})`,
      deliveryAddress: formData.deliveryAddress,
      notes: formData.notes || '',
      status: 'Submitted',
      totalItems: cartSummary.totalItems,
      totalEstimatedValue: cartSummary.totalEstimatedValue,
      items: processedItems,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setActiveModal(null);
    setCurrentView('orders');
    showToast(`Request #${orderNumber} submitted successfully!`, 'success');
  };

  // Save / Edit Campaign
  const handleSaveCampaign = (campaignData) => {
    if (editingItem && editingItem.id) {
      setCampaigns(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...campaignData, targetAmount: Number(campaignData.targetAmount) } : c));
      showToast('Campaign details updated successfully.', 'success');
    } else {
      const newCmp = {
        id: `cmp-${Date.now()}`,
        ...campaignData,
        targetAmount: Number(campaignData.targetAmount),
        raisedAmount: 0,
        organizerId: currentUser.id,
        organizerName: currentUser.organization || currentUser.name,
        donorsCount: 0,
        status: 'Active',
        createdAt: new Date().toISOString()
      };
      setCampaigns(prev => [newCmp, ...prev]);
      showToast('New fundraising campaign launched!', 'success');
    }
    setActiveModal(null);
    setEditingItem(null);
  };

  // Save / Edit Marketplace Listing
  const handleSaveListing = (listingData) => {
    if (editingItem && editingItem.id) {
      setMarketplaceItems(prev => prev.map(item => item.id === editingItem.id ? {
        ...item,
        ...listingData,
        quantity: Number(listingData.quantity),
        estimatedValue: Number(listingData.estimatedValue)
      } : item));
      showToast('Marketplace listing updated.', 'success');
    } else {
      const newItem = {
        id: `mkt-${Date.now()}`,
        ...listingData,
        quantity: Number(listingData.quantity),
        estimatedValue: Number(listingData.estimatedValue),
        donorName: currentUser.name,
        donorId: currentUser.id,
        status: 'Available',
        createdAt: new Date().toISOString()
      };
      setMarketplaceItems(prev => [newItem, ...prev]);
      showToast('Item listed successfully in Donation Marketplace!', 'success');
    }
    setActiveModal(null);
    setEditingItem(null);
  };

  const handleDeleteCampaign = (id) => {
    if (window.confirm('Are you sure you want to remove this campaign?')) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      showToast('Campaign deleted.', 'info');
    }
  };

  const handleDeleteListing = (id) => {
    if (window.confirm('Are you sure you want to remove this item listing?')) {
      setMarketplaceItems(prev => prev.filter(i => i.id !== id));
      showToast('Listing removed.', 'info');
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order status updated to "${newStatus}".`, 'success');
  };

  return (
    <div className="app-wrapper">
      <div className="ambient-container" aria-hidden="true">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        users={users}
        onSwitchUser={handleSwitchUser}
        cartCount={cartSummary.totalItems}
        onOpenAuth={() => setActiveModal('auth')}
      />

      <main className="main-content">
        {currentView === 'home' && (
          <HomePage
            campaigns={campaigns}
            marketplaceItems={marketplaceItems}
            onNavigate={setCurrentView}
            onDonate={(cmp) => { setSelectedCampaign(cmp); setActiveModal('donate'); }}
            onAddToCart={addToCart}
          />
        )}

        {currentView === 'campaigns' && (
          <CampaignsPage
            campaigns={campaigns}
            currentUser={currentUser}
            onDonate={(cmp) => { setSelectedCampaign(cmp); setActiveModal('donate'); }}
            onAddCampaign={() => { setEditingItem(null); setActiveModal('addCampaign'); }}
            onEditCampaign={(cmp) => { setEditingItem(cmp); setActiveModal('addCampaign'); }}
            onDeleteCampaign={handleDeleteCampaign}
          />
        )}

        {currentView === 'marketplace' && (
          <MarketplacePage
            marketplaceItems={marketplaceItems}
            currentUser={currentUser}
            onAddToCart={addToCart}
            onAddListing={() => { setEditingItem(null); setActiveModal('addListing'); }}
            onEditListing={(item) => { setEditingItem(item); setActiveModal('addListing'); }}
            onDeleteListing={handleDeleteListing}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            cart={cart}
            cartSummary={cartSummary}
            onUpdateQty={updateCartQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
            onCheckout={() => setActiveModal('checkout')}
            onBrowse={() => setCurrentView('marketplace')}
          />
        )}

        {currentView === 'orders' && (
          <OrdersPage
            orders={orders}
            currentUser={currentUser}
            onUpdateStatus={handleUpdateOrderStatus}
            onBrowseMarket={() => setCurrentView('marketplace')}
          />
        )}

        {currentView === 'donors' && (
          <DonorsPage
            donors={donors}
            currentUser={currentUser}
            onAddDonor={(donor) => {
              setDonors(prev => [donor, ...prev]);
              showToast('Donor profile added to roster.', 'success');
            }}
          />
        )}

        {currentView === 'donations' && (
          <DonationsPage
            donations={donations}
            onViewReceipt={(don) => { setSelectedReceipt(don); setActiveModal('receipt'); }}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            currentUser={currentUser}
            campaigns={campaigns}
            donors={donors}
            donations={donations}
            orders={orders}
            marketplaceItems={marketplaceItems}
            onNavigate={setCurrentView}
            onAddCampaign={() => { setEditingItem(null); setActiveModal('addCampaign'); }}
            onAddListing={() => { setEditingItem(null); setActiveModal('addListing'); }}
            onApproveCampaign={(id) => {
              setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'Active' } : c));
              showToast('Campaign approved and marked live!', 'success');
            }}
          />
        )}
      </main>

      {/* MODALS */}
      {activeModal === 'donate' && (
        <DonateModal
          campaign={selectedCampaign}
          currentUser={currentUser}
          onClose={() => setActiveModal(null)}
          onSubmit={handleMakeDonation}
        />
      )}

      {activeModal === 'addCampaign' && (
        <AddEditCampaignModal
          initialData={editingItem}
          currentUser={currentUser}
          onClose={() => { setActiveModal(null); setEditingItem(null); }}
          onSubmit={handleSaveCampaign}
        />
      )}

      {activeModal === 'addListing' && (
        <AddEditListingModal
          initialData={editingItem}
          currentUser={currentUser}
          onClose={() => { setActiveModal(null); setEditingItem(null); }}
          onSubmit={handleSaveListing}
        />
      )}

      {activeModal === 'checkout' && (
        <CheckoutModal
          cart={cart}
          cartSummary={cartSummary}
          currentUser={currentUser}
          onClose={() => setActiveModal(null)}
          onSubmit={handleCheckoutSubmit}
        />
      )}

      {activeModal === 'receipt' && selectedReceipt && (
        <TaxReceiptModal
          receipt={selectedReceipt}
          onClose={() => { setActiveModal(null); setSelectedReceipt(null); }}
        />
      )}

      {activeModal === 'auth' && (
        <AuthModal
          users={users}
          currentUser={currentUser}
          onSelectUser={(u) => { setCurrentUser(u); setActiveModal(null); showToast(`Welcome back, ${u.name}!`); }}
          onRegister={(newUser) => {
            setUsers(prev => [...prev, newUser]);
            setCurrentUser(newUser);
            setActiveModal(null);
            showToast(`Account created! Welcome, ${newUser.name}.`);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-item toast-${toast.type}`}>
            <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// NAVBAR COMPONENT
// ----------------------------------------------------
function Navbar({ currentView, setCurrentView, currentUser, users, onSwitchUser, cartCount, onOpenAuth }) {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand-logo" onClick={() => setCurrentView('home')}>
          <div className="logo-symbol">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
          <div className="brand-title">
            <span>Donatify</span>
            <span className="brand-badge">MARKETPLACE</span>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <button className={`nav-item-btn ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>
              Home
            </button>
          </li>
          <li>
            <button className={`nav-item-btn ${currentView === 'campaigns' ? 'active' : ''}`} onClick={() => setCurrentView('campaigns')}>
              Campaigns
            </button>
          </li>
          <li>
            <button className={`nav-item-btn ${currentView === 'marketplace' ? 'active' : ''}`} onClick={() => setCurrentView('marketplace')}>
              Marketplace
            </button>
          </li>
          <li>
            <button className={`nav-item-btn ${currentView === 'orders' ? 'active' : ''}`} onClick={() => setCurrentView('orders')}>
              Request Orders
            </button>
          </li>
          <li>
            <button className={`nav-item-btn ${currentView === 'donors' ? 'active' : ''}`} onClick={() => setCurrentView('donors')}>
              Donors
            </button>
          </li>
          <li>
            <button className={`nav-item-btn ${currentView === 'donations' ? 'active' : ''}`} onClick={() => setCurrentView('donations')}>
              Donations
            </button>
          </li>
          <li>
            <button className={`nav-item-btn ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
              Dashboard
            </button>
          </li>
        </ul>

        <div className="nav-right-actions">
          <button className="cart-nav-btn" title="View Request Cart" onClick={() => setCurrentView('cart')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            {cartCount > 0 && <span className="cart-badge-pill">{cartCount}</span>}
          </button>

          <div className="user-menu-wrapper">
            <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar-img" />
            <div className="user-meta-info">
              <span className="user-name-text">{currentUser.name.split(' ')[0]}</span>
              <span className={`role-pill-badge role-${currentUser.role.toLowerCase()}`}>{currentUser.role}</span>
            </div>

            <select
              className="quick-role-select"
              value={currentUser.id}
              onChange={(e) => onSwitchUser(e.target.value)}
              title="Switch Demo Role"
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.role}: {u.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={onOpenAuth}>
            Auth
          </button>
        </div>
      </div>
    </header>
  );
}

// ----------------------------------------------------
// HOME PAGE COMPONENT
// ----------------------------------------------------
function HomePage({ campaigns, marketplaceItems, onNavigate, onDonate, onAddToCart }) {
  const featuredCampaigns = useMemo(() => campaigns.slice(0, 3), [campaigns]);
  const featuredMarket = useMemo(() => marketplaceItems.slice(0, 4), [marketplaceItems]);

  return (
    <div className="container">
      <section className="hero-section">
        <div className="hero-pill-tag">
          <span>✨</span>
          <span>Next-Generation Charitable Crowdfunding & In-Kind Marketplace</span>
        </div>
        <h1 className="hero-title">
          Direct Giving. Verified Aid. <br />
          <span className="text-gradient">Real-Time Impact.</span>
        </h1>
        <p className="hero-subtitle">
          Empowering donors to fund critical relief campaigns and dispatch essential in-kind supplies directly to verified organizers on the frontlines.
        </p>

        <div className="hero-cta-group">
          <button className="btn btn-primary btn-lg" onClick={() => onNavigate('campaigns')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span>Explore Campaigns</span>
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('marketplace')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            <span>Goods Marketplace</span>
          </button>
        </div>

        <div className="hero-stats-grid">
          <div className="stat-item">
            <span className="stat-num">$142,500+</span>
            <span className="stat-label">Total Relief Funds Raised</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">1,840+</span>
            <span className="stat-label">Supplies Distributed</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">980+</span>
            <span className="stat-label">Verified Donors & NGOs</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">100%</span>
            <span className="stat-label">Tax-Deductible Receipts</span>
          </div>
        </div>
      </section>

      <section style={{ margin: '60px 0' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Urgent Fundraising Campaigns</h2>
            <p className="section-desc">Critical initiatives requiring immediate support to save lives and empower communities.</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => onNavigate('campaigns')}>
            View All Campaigns →
          </button>
        </div>

        <div className="campaign-grid">
          {featuredCampaigns.map(cmp => (
            <CampaignCard key={cmp.id} campaign={cmp} onDonate={() => onDonate(cmp)} />
          ))}
        </div>
      </section>

      <section style={{ margin: '60px 0' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">In-Kind Goods Marketplace</h2>
            <p className="section-desc">Medical equipment, educational tech, and emergency blankets ready for organizer request.</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => onNavigate('marketplace')}>
            Browse Full Marketplace →
          </button>
        </div>

        <div className="marketplace-grid">
          {featuredMarket.map(item => (
            <MarketplaceCard key={item.id} item={item} onAddToCart={() => onAddToCart(item, 1)} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------
// CAMPAIGNS PAGE COMPONENT
// ----------------------------------------------------
function CampaignsPage({ campaigns, currentUser, onDonate, onAddCampaign, onEditCampaign, onDeleteCampaign }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Medical', 'Education', 'Environment', 'Hunger', 'Animal Welfare'];

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      const matchCat = selectedCat === 'All' || c.category.toLowerCase() === selectedCat.toLowerCase();
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [campaigns, selectedCat, search]);

  const canManage = currentUser.role === 'Organizer' || currentUser.role === 'Admin';

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Donation Campaigns</h1>
          <p className="section-desc">Support verified grassroots initiatives and humanitarian missions around the globe.</p>
        </div>

        {canManage && (
          <button className="btn btn-primary" onClick={onAddCampaign}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>Launch New Campaign</span>
          </button>
        )}
      </div>

      <div className="filter-bar-wrapper">
        <div className="search-input-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search campaigns by title, mission, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill-btn ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          <h3>No campaigns found matching your filter</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Try clearing your search query or selecting a different category.</p>
        </div>
      ) : (
        <div className="campaign-grid">
          {filteredCampaigns.map(cmp => (
            <CampaignCard
              key={cmp.id}
              campaign={cmp}
              currentUser={currentUser}
              onDonate={() => onDonate(cmp)}
              onEdit={() => onEditCampaign(cmp)}
              onDelete={() => onDeleteCampaign(cmp.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CampaignCard({ campaign, currentUser, onDonate, onEdit, onDelete }) {
  const percent = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));
  const isOwnerOrAdmin = currentUser && (currentUser.role === 'Admin' || currentUser.id === campaign.organizerId);

  return (
    <div className="campaign-card">
      <div className="card-img-wrapper">
        <img src={campaign.image} alt={campaign.title} className="card-img" />
        <span className="card-category-badge">{campaign.category}</span>
        {campaign.urgent && <span className="card-urgent-ribbon">🔥 Urgent Relief</span>}
      </div>

      <div className="card-body">
        <div className="card-organizer-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>{campaign.organizerName}</span>
        </div>

        <h3 className="card-title">{campaign.title}</h3>
        <p className="card-description">{campaign.description}</p>

        <div className="progress-container">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percent}%` }}></div>
          </div>
          <div className="progress-meta-row">
            <div>
              <span className="progress-raised">${campaign.raisedAmount.toLocaleString()}</span>
              <span className="progress-target"> / ${campaign.targetAmount.toLocaleString()}</span>
            </div>
            <span className="progress-donors">
              <strong>{percent}%</strong> ({campaign.donorsCount} Donors)
            </span>
          </div>
        </div>

        <div className="card-actions-row">
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onDonate}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span>Donate Now</span>
          </button>

          {isOwnerOrAdmin && onEdit && (
            <button className="btn btn-secondary btn-icon" title="Edit Campaign" onClick={onEdit}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
          )}
          {isOwnerOrAdmin && onDelete && (
            <button className="btn btn-danger btn-icon" title="Delete Campaign" onClick={onDelete}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MARKETPLACE PAGE COMPONENT
// ----------------------------------------------------
function MarketplacePage({ marketplaceItems, currentUser, onAddToCart, onAddListing, onEditListing, onDeleteListing }) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Medical Supplies', 'Tech & Devices', 'Clothing & Shelter', 'School Kits', 'Emergency Supplies'];

  const filteredItems = useMemo(() => {
    return marketplaceItems.filter(item => {
      const matchCat = selectedCat === 'All' || item.category.toLowerCase() === selectedCat.toLowerCase();
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [marketplaceItems, selectedCat, search]);

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <h1 className="section-title">In-Kind Goods Marketplace</h1>
          <p className="section-desc">Claim essential tangible items donated by individuals and companies for community relief.</p>
        </div>

        <button className="btn btn-primary" onClick={onAddListing}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Donate & List Item</span>
        </button>
      </div>

      <div className="filter-bar-wrapper">
        <div className="search-input-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search items by keyword, specs, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill-btn ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          <h3>No marketplace items matching your search</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Try switching categories or clearing search filters.</p>
        </div>
      ) : (
        <div className="marketplace-grid">
          {filteredItems.map(item => (
            <MarketplaceCard
              key={item.id}
              item={item}
              currentUser={currentUser}
              onAddToCart={() => onAddToCart(item, 1)}
              onEdit={() => onEditListing(item)}
              onDelete={() => onDeleteListing(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MarketplaceCard({ item, currentUser, onAddToCart, onEdit, onDelete }) {
  const isOwnerOrAdmin = currentUser && (currentUser.role === 'Admin' || currentUser.id === item.donorId);
  const isOutOfStock = item.quantity <= 0;

  return (
    <div className="marketplace-card">
      <div className="mkt-img-wrapper">
        <img src={item.image} alt={item.title} className="card-img" />
        <span className="mkt-condition-badge">{item.condition}</span>
        <span className={`mkt-stock-badge ${isOutOfStock ? 'out-of-stock' : ''}`}>
          {isOutOfStock ? 'Out of Stock' : `${item.quantity} in Stock`}
        </span>
      </div>

      <div className="mkt-body">
        <div className="mkt-location-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{item.location} • Donated by {item.donorName}</span>
        </div>

        <h3 className="mkt-title">{item.title}</h3>
        <p className="card-description">{item.description}</p>

        <div className="mkt-value-row">
          <div>
            <span className="mkt-val-label">Est. Value:</span>
            <div className="mkt-unit-val">${item.estimatedValue} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ unit</span></div>
          </div>
          <span className="brand-badge">Free for Aid</span>
        </div>

        <div className="card-actions-row">
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={isOutOfStock}
            onClick={onAddToCart}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span>{isOutOfStock ? 'Claimed' : 'Add to Request Cart'}</span>
          </button>

          {isOwnerOrAdmin && onEdit && (
            <button className="btn btn-secondary btn-icon" title="Edit Listing" onClick={onEdit}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
          )}
          {isOwnerOrAdmin && onDelete && (
            <button className="btn btn-danger btn-icon" title="Delete Listing" onClick={onDelete}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CART PAGE COMPONENT
// ----------------------------------------------------
function CartPage({ cart, cartSummary, onUpdateQty, onRemove, onClear, onCheckout, onBrowse }) {
  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <h2>Your Supply Request Cart is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '10px auto 26px auto' }}>
          Explore our in-kind donation marketplace to request essential medical gear, tech hardware, and emergency supplies.
        </p>
        <button className="btn btn-primary btn-lg" onClick={onBrowse}>
          Browse Goods Marketplace →
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Supply Request Cart</h1>
          <p className="section-desc">Review your requested items, configure quantities, and submit your distribution grant request.</p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={onClear}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-card">
          {cart.map(item => {
            const itemTotal = item.quantity * item.unitValue;
            return (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.title} className="cart-item-thumb" />

                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.title}</h4>
                  <div className="cart-item-unit">
                    Est. Value: ${item.unitValue} each • Max stock: {item.maxStock}
                  </div>
                </div>

                <div className="qty-stepper">
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(item.id, -1)}
                    disabled={item.quantity <= 1}
                    title="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(item.id, 1)}
                    disabled={item.quantity >= item.maxStock}
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ${itemTotal.toLocaleString()}
                </div>

                <button
                  className="btn btn-danger btn-icon"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => onRemove(item.id)}
                  title="Remove item"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary-box">
          <h3 style={{ marginBottom: '18px', fontSize: '1.25rem' }}>Request Summary</h3>

          <div className="summary-row">
            <span>Total Units Requested:</span>
            <strong>{cartSummary.totalItems} items</strong>
          </div>

          <div className="summary-row">
            <span>Estimated Goods Value:</span>
            <strong>${cartSummary.totalEstimatedValue.toLocaleString()}</strong>
          </div>

          <div className="summary-row">
            <span>Marketplace Grant Subsidy:</span>
            <span style={{ color: 'var(--primary-light)', fontWeight: 700 }}>100% Free Grant</span>
          </div>

          <div className="summary-row">
            <span>Logistics & Handling:</span>
            <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>Covered by Donors</span>
          </div>

          <div className="summary-row highlight">
            <span>Impact Value:</span>
            <span className="summary-total-val">${cartSummary.totalEstimatedValue.toLocaleString()}</span>
          </div>

          <div style={{ marginTop: '22px' }}>
            <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }} onClick={onCheckout}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Submit Supply Request</span>
            </button>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '14px' }}>
            ⚡ Verified NGOs & community organizers receive prioritized logistics dispatch within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ORDERS PAGE COMPONENT
// ----------------------------------------------------
function OrdersPage({ orders, currentUser, onUpdateStatus, onBrowseMarket }) {
  const isOrganizerOrAdmin = currentUser.role === 'Organizer' || currentUser.role === 'Admin';

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Marketplace Supply Orders & Requests</h1>
          <p className="section-desc">Track status, item quantities, and distribution logs for all in-kind goods dispatched.</p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onBrowseMarket}>
          Request More Supplies
        </button>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          <h3>No supply requests recorded yet</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Place an order from our in-kind marketplace to track it here.</p>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header-row">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>{order.orderNumber}</h3>
                    <span className={`order-badge-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Requested by <strong>{order.userName}</strong> • {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Impact Value</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--cyan)', fontFamily: 'var(--font-heading)' }}>
                    ${order.totalEstimatedValue ? order.totalEstimatedValue.toLocaleString() : '0'}
                  </div>
                </div>
              </div>

              <div style={{ margin: '14px 0', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>📍 Destination Address:</strong> {order.deliveryAddress}
                {order.notes && <div style={{ marginTop: '4px' }}><strong>📝 Mission Need:</strong> {order.notes}</div>}
              </div>

              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', padding: '12px 16px', margin: '14px 0' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Requested Supplies ({order.totalItems} total units):
                </div>
                {order.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.9rem' }}>
                    <span>• {it.title} <strong>(×{it.quantity})</strong></span>
                    <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>${(it.totalValue || (it.quantity * it.unitValue)).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {isOrganizerOrAdmin && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Update Status:</span>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={order.status === 'Submitted'}
                    onClick={() => onUpdateStatus(order.id, 'Submitted')}
                  >
                    Submitted
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={order.status === 'Dispatched'}
                    onClick={() => onUpdateStatus(order.id, 'Dispatched')}
                  >
                    Dispatched
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={order.status === 'Delivered'}
                    onClick={() => onUpdateStatus(order.id, 'Delivered')}
                  >
                    Delivered
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// DONORS PAGE COMPONENT
// ----------------------------------------------------
function DonorsPage({ donors, currentUser, onAddDonor }) {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDonorForm, setNewDonorForm] = useState({ name: '', email: '', badge: 'Bronze Tier' });

  const filtered = useMemo(() => {
    return donors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase()));
  }, [donors, search]);

  const handleCreateDonor = (e) => {
    e.preventDefault();
    if (!newDonorForm.name || !newDonorForm.email) return;
    onAddDonor({
      id: `dnr-${Date.now()}`,
      name: newDonorForm.name,
      email: newDonorForm.email,
      totalDonated: 0,
      donationsCount: 0,
      badge: newDonorForm.badge,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newDonorForm.name)}`,
      lastDonatedAt: new Date().toISOString()
    });
    setNewDonorForm({ name: '', email: '', badge: 'Bronze Tier' });
    setShowAddModal(false);
  };

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Donor Roster & Philanthropy Tiers</h1>
          <p className="section-desc">Honoring our champions, benefactors, and community supporters making change possible.</p>
        </div>

        {currentUser.role === 'Admin' && (
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
            + Add Donor Profile
          </button>
        )}
      </div>

      <div className="filter-bar-wrapper">
        <div className="search-input-box" style={{ maxWidth: '400px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search donors by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="data-table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Recognition Tier</th>
              <th>Total Donated</th>
              <th>Gifts Made</th>
              <th>Last Contribution</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => {
              const badgeClass = d.badge.toLowerCase().includes('champion') ? 'badge-champion' : d.badge.toLowerCase().includes('gold') ? 'badge-gold' : d.badge.toLowerCase().includes('silver') ? 'badge-silver' : 'badge-bronze';
              return (
                <tr key={d.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={d.avatar} alt={d.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>{d.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`donor-badge-tag ${badgeClass}`}>
                      ★ {d.badge}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--primary-light)', fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
                      ${d.totalDonated.toLocaleString()}
                    </strong>
                  </td>
                  <td>{d.donationsCount} gifts</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {new Date(d.lastDonatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3 className="modal-title">Register New Donor</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateDonor}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={newDonorForm.name}
                    onChange={(e) => setNewDonorForm({ ...newDonorForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    value={newDonorForm.email}
                    onChange={(e) => setNewDonorForm({ ...newDonorForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Philanthropy Tier</label>
                  <select
                    className="form-control"
                    value={newDonorForm.badge}
                    onChange={(e) => setNewDonorForm({ ...newDonorForm, badge: e.target.value })}
                  >
                    <option value="Champion Donor">Champion Donor ($10,000+)</option>
                    <option value="Gold Tier">Gold Tier ($5,000+)</option>
                    <option value="Silver Tier">Silver Tier ($2,000+)</option>
                    <option value="Bronze Tier">Bronze Tier ($500+)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Donor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// DONATIONS PAGE COMPONENT
// ----------------------------------------------------
function DonationsPage({ donations, onViewReceipt }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return donations.filter(don => {
      return don.campaignTitle.toLowerCase().includes(search.toLowerCase()) ||
        don.donorName.toLowerCase().includes(search.toLowerCase()) ||
        don.receiptNumber.toLowerCase().includes(search.toLowerCase());
    });
  }, [donations, search]);

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Financial Donations & Tax Records</h1>
          <p className="section-desc">Transparent transaction ledger with downloadable and printable official tax receipts.</p>
        </div>
      </div>

      <div className="filter-bar-wrapper">
        <div className="search-input-box" style={{ maxWidth: '420px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by receipt #, donor, or campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="data-table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Receipt #</th>
              <th>Campaign</th>
              <th>Donor</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(don => (
              <tr key={don.id}>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cyan)' }}>
                    {don.receiptNumber}
                  </span>
                </td>
                <td style={{ maxWidth: '260px' }}>
                  <div style={{ fontWeight: 600 }}>{don.campaignTitle}</div>
                  {don.message && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{don.message}"</div>}
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{don.donorName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{don.donorEmail}</div>
                </td>
                <td>
                  <strong style={{ color: 'var(--primary-light)', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
                    ${don.amount.toLocaleString()}
                  </strong>
                </td>
                <td>
                  <span className="brand-badge" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {don.paymentMethod}
                  </span>
                </td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {new Date(don.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => onViewReceipt(don)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span>Tax Receipt</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// DASHBOARD PAGE COMPONENT
// ----------------------------------------------------
function DashboardPage({ currentUser, campaigns, donors, donations, orders, marketplaceItems, onNavigate, onAddCampaign, onAddListing, onApproveCampaign }) {
  const isDonor = currentUser.role === 'Donor';
  const isOrganizer = currentUser.role === 'Organizer';
  const isAdmin = currentUser.role === 'Admin';

  const totalFunds = useMemo(() => campaigns.reduce((sum, c) => sum + c.raisedAmount, 0), [campaigns]);
  const totalItemsDistributed = useMemo(() => orders.reduce((sum, o) => sum + o.totalItems, 0), [orders]);

  const myDonations = useMemo(() => donations.filter(d => d.donorEmail.toLowerCase() === currentUser.email.toLowerCase()), [donations, currentUser]);
  const myTotalGiven = useMemo(() => myDonations.reduce((sum, d) => sum + d.amount, 0), [myDonations]);
  const myCampaigns = useMemo(() => campaigns.filter(c => c.organizerId === currentUser.id), [campaigns, currentUser]);

  return (
    <div className="container">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '54px', height: '54px', borderRadius: '50%', border: '2px solid var(--primary)' }} />
          <div>
            <h1 className="section-title">
              {currentUser.role} Control Center
            </h1>
            <p className="section-desc">Welcome back, {currentUser.name} • {currentUser.organization || 'General Supporter'}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {isOrganizer && (
            <>
              <button className="btn btn-primary btn-sm" onClick={onAddCampaign}>+ New Campaign</button>
              <button className="btn btn-secondary btn-sm" onClick={onAddListing}>+ List Goods</button>
            </>
          )}
          {isAdmin && (
            <>
              <button className="btn btn-primary btn-sm" onClick={onAddCampaign}>+ Create Campaign</button>
              <button className="btn btn-secondary btn-sm" onClick={onAddListing}>+ Add Inventory</button>
            </>
          )}
          {isDonor && (
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('campaigns')}>Explore Campaigns</button>
          )}
        </div>
      </div>

      <div className="hero-stats-grid" style={{ marginBottom: '36px' }}>
        {isDonor ? (
          <>
            <div className="stat-item">
              <span className="stat-num text-gradient">${myTotalGiven.toLocaleString()}</span>
              <span className="stat-label">My Total Direct Donations</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{myDonations.length}</span>
              <span className="stat-label">Campaigns Supported</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Tax Deduction Eligible</span>
            </div>
          </>
        ) : (
          <>
            <div className="stat-item">
              <span className="stat-num text-gradient">${totalFunds.toLocaleString()}</span>
              <span className="stat-label">Total Platform Funds Raised</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{totalItemsDistributed} Units</span>
              <span className="stat-label">Goods & Supplies Dispatched</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{campaigns.length}</span>
              <span className="stat-label">Active Campaigns</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{donors.length}</span>
              <span className="stat-label">Verified Donors</span>
            </div>
          </>
        )}
      </div>

      {(isOrganizer || isAdmin) && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.3rem' }}>
            {isAdmin ? 'All Campaigns Moderation Ledger' : 'My Managed Campaigns'}
          </h3>
          <div className="data-table-card">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Campaign Title</th>
                  <th>Category</th>
                  <th>Progress</th>
                  <th>Raised / Goal</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(isAdmin ? campaigns : myCampaigns).map(c => {
                  const pct = Math.round((c.raisedAmount / c.targetAmount) * 100);
                  return (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.title}</td>
                      <td><span className="brand-badge">{c.category}</span></td>
                      <td style={{ minWidth: '120px' }}>
                        <div className="progress-track" style={{ height: '6px' }}>
                          <div className="progress-fill" style={{ width: `${Math.min(100, pct)}%` }}></div>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pct}% funded</span>
                      </td>
                      <td>
                        <strong>${c.raisedAmount.toLocaleString()}</strong> / ${c.targetAmount.toLocaleString()}
                      </td>
                      <td>
                        <span className={`order-badge-status status-${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        {c.status !== 'Active' && isAdmin ? (
                          <button className="btn btn-primary btn-sm" onClick={() => onApproveCampaign(c.id)}>
                            Approve
                          </button>
                        ) : (
                          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('campaigns')}>
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '1.3rem' }}>
          {isDonor ? 'My Donation Contribution History' : 'Recent Platform Activity'}
        </h3>
        <div className="data-table-card">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Campaign</th>
                <th>Donor</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {(isDonor ? myDonations : donations.slice(0, 5)).map(don => (
                <tr key={don.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{don.receiptNumber}</td>
                  <td style={{ fontWeight: 600 }}>{don.campaignTitle}</td>
                  <td>{don.donorName}</td>
                  <td style={{ color: 'var(--primary-light)', fontWeight: 700 }}>${don.amount.toLocaleString()}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {new Date(don.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// DONATE MODAL COMPONENT
// ----------------------------------------------------
function DonateModal({ campaign, currentUser, onClose, onSubmit }) {
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState(currentUser ? currentUser.name : '');
  const [donorEmail, setDonorEmail] = useState(currentUser ? currentUser.email : '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');

  const presets = ['25', '50', '100', '250'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : Number(amount);
    if (!finalAmount || finalAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    onSubmit({
      campaignId: campaign ? campaign.id : 'cmp-1',
      amount: finalAmount,
      donorName,
      donorEmail,
      paymentMethod,
      isAnonymous,
      message
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Make a Donation</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{campaign ? campaign.title : 'General Relief Fund'}</p>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Select Amount ($ USD)</label>
              <div className="amount-preset-grid">
                {presets.map(p => (
                  <button
                    type="button"
                    key={p}
                    className={`amount-btn ${amount === p && !customAmount ? 'active' : ''}`}
                    onClick={() => { setAmount(p); setCustomAmount(''); }}
                  >
                    ${p}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                placeholder="Or enter custom amount ($ USD)"
                className="form-control"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Donor Name</label>
              <input
                type="text"
                required={!isAnonymous}
                disabled={isAnonymous}
                className="form-control"
                value={isAnonymous ? 'Anonymous' : donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email for Tax Receipt</label>
              <input
                type="email"
                required
                className="form-control"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="Credit Card">Credit Card (Instant Visa / Mastercard)</option>
                <option value="PayPal">PayPal</option>
                <option value="Crypto (ETH)">Crypto (Ethereum / USDC)</option>
                <option value="Bank Wire">Bank Wire Transfer</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Encouraging Note / Message (Optional)</label>
              <textarea
                className="form-control"
                placeholder="Write an uplifting message to the organizers and relief team..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
              <input
                type="checkbox"
                id="anonCheck"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <label htmlFor="anonCheck" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                Keep my donation anonymous on the public roster
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              Confirm & Donate ${customAmount || amount}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ADD / EDIT CAMPAIGN MODAL
// ----------------------------------------------------
function AddEditCampaignModal({ initialData, currentUser, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData ? initialData.title : '',
    category: initialData ? initialData.category : 'Medical',
    targetAmount: initialData ? initialData.targetAmount : 25000,
    urgent: initialData ? initialData.urgent : false,
    endDate: initialData ? initialData.endDate : '2026-12-31',
    image: initialData ? initialData.image : 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=800&auto=format&fit=crop&q=80',
    description: initialData ? initialData.description : ''
  });

  const categories = ['Medical', 'Education', 'Environment', 'Hunger', 'Animal Welfare', 'Disaster Relief'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.targetAmount) return;
    onSubmit(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">{initialData ? 'Edit Campaign' : 'Launch New Fundraising Campaign'}</h3>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Campaign Title</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Emergency Surgical Relief for Flood Victims"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Funding Goal ($ USD)</label>
                <input
                  type="number"
                  required
                  min="100"
                  className="form-control"
                  value={form.targetAmount}
                  onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Cover Image URL</label>
              <input
                type="url"
                required
                className="form-control"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Campaign Narrative & Mission</label>
              <textarea
                required
                className="form-control"
                style={{ minHeight: '110px' }}
                placeholder="Describe who benefits from this campaign and how funds will be deployed..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="urgentCheck"
                checked={form.urgent}
                onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
              />
              <label htmlFor="urgentCheck" style={{ fontSize: '0.88rem', cursor: 'pointer' }}>
                Flag as 🚨 Urgent Priority Relief
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Save Changes' : 'Publish Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ADD / EDIT LISTING MODAL
// ----------------------------------------------------
function AddEditListingModal({ initialData, currentUser, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData ? initialData.title : '',
    category: initialData ? initialData.category : 'Medical Supplies',
    quantity: initialData ? initialData.quantity : 10,
    estimatedValue: initialData ? initialData.estimatedValue : 50,
    condition: initialData ? initialData.condition : 'Brand New',
    location: initialData ? initialData.location : 'Chicago, IL',
    image: initialData ? initialData.image : 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
    description: initialData ? initialData.description : ''
  });

  const categories = ['Medical Supplies', 'Tech & Devices', 'Clothing & Shelter', 'School Kits', 'Emergency Supplies', 'General Supplies'];
  const conditions = ['Brand New', 'Like New', 'Refurbished', 'Good'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || form.quantity === undefined) return;
    onSubmit(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">{initialData ? 'Edit Item Listing' : 'Donate Supplies to Marketplace'}</h3>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Item Title</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Sterile First Aid Backpacks or Coding Laptops"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Condition</label>
                <select className="form-control" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
                  {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Quantity Available</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="form-control"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Est. Unit Value ($ USD)</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="form-control"
                  value={form.estimatedValue}
                  onChange={(e) => setForm({ ...form, estimatedValue: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Dispatch Location (City, State / Country)</label>
              <input
                type="text"
                required
                className="form-control"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Product Photo URL</label>
              <input
                type="url"
                required
                className="form-control"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Item Specifications & Details</label>
              <textarea
                required
                className="form-control"
                placeholder="Include model numbers, accessories included, and expiration dates if applicable..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Save Changes' : 'List Item Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CHECKOUT MODAL COMPONENT
// ----------------------------------------------------
function CheckoutModal({ cart, cartSummary, currentUser, onClose, onSubmit }) {
  const [deliveryAddress, setDeliveryAddress] = useState('742 Evergreen Community Hub, Sector 4, Chicago IL');
  const [notes, setNotes] = useState('Urgent distribution for displaced families.');
  const [contactPhone, setContactPhone] = useState('+1 (555) 382-9104');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deliveryAddress) return;
    onSubmit({ deliveryAddress, notes, contactPhone });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Confirm Supply Distribution Request</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cartSummary.totalItems} units requested • ${cartSummary.totalEstimatedValue.toLocaleString()} Value</p>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Requesting Organization / Beneficiary</label>
              <input
                type="text"
                disabled
                className="form-control"
                value={`${currentUser.name} (${currentUser.organization || 'Verified Community Organizer'})`}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Delivery / Logistics Address</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Full street address, warehouse dock, or field distribution center"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Phone (for delivery dispatch)</label>
              <input
                type="text"
                required
                className="form-control"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mission Justification & Need Statement</label>
              <textarea
                required
                className="form-control"
                placeholder="Briefly state how these supplies will be utilized on the ground..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '12px 16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Items in Request:
              </div>
              {cart.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', padding: '3px 0' }}>
                  <span>{c.title} (×{c.quantity})</span>
                  <span style={{ color: 'var(--cyan)' }}>${(c.quantity * c.unitValue).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              Confirm & Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TAX RECEIPT MODAL COMPONENT
// ----------------------------------------------------
function TaxReceiptModal({ receipt, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog lg">
        <div className="modal-header">
          <h3 className="modal-title">Official Tax-Deductible Donation Receipt</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              <span>Print / PDF</span>
            </button>
            <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-body">
          <div className="tax-receipt-container" id="printableTaxReceipt">
            <div className="receipt-header">
              <div>
                <h2 style={{ color: '#0f172a', fontSize: '1.4rem' }}>Donatify Global Aid Foundation</h2>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>501(c)(3) Non-Profit Public Charity • EIN: 47-8829104</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>100 Hope Plaza, Suite 400, Chicago, IL 60601</div>
              </div>
              <span className="receipt-badge-status">501(c)(3) VERIFIED</span>
            </div>

            <div className="receipt-amount-banner">
              <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contribution Amount</div>
              <div className="receipt-amount-val">${receipt.amount.toLocaleString()} USD</div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>100% Tax-Deductible • No Goods or Services Exchanged</div>
            </div>

            <div className="receipt-grid">
              <div>
                <strong style={{ color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Receipt Number:</strong>
                <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>{receipt.receiptNumber}</div>
              </div>
              <div>
                <strong style={{ color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Date of Transaction:</strong>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{new Date(receipt.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <strong style={{ color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Donor Name:</strong>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{receipt.donorName}</div>
              </div>
              <div>
                <strong style={{ color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Payment Method:</strong>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{receipt.paymentMethod} (Processed)</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>Designated Campaign:</strong>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{receipt.campaignTitle}</div>
              </div>
            </div>

            <div className="receipt-footer-seal">
              <div>
                <strong>Authorized Signature:</strong> Dr. Sarah Jenkins, Chairperson
              </div>
              <div>
                Security Hash: <code>{receipt.id}-VERIFIED</code>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handlePrint}>Print Official Receipt</button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// AUTH MODAL COMPONENT
// ----------------------------------------------------
function AuthModal({ users, currentUser, onSelectUser, onRegister, onClose }) {
  const [tab, setTab] = useState('login');
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', role: 'Donor', organization: '' });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email) return;
    onRegister({
      id: `usr-${Date.now()}`,
      name: regForm.name,
      email: regForm.email,
      role: regForm.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(regForm.name)}`,
      organization: regForm.organization || (regForm.role === 'Organizer' ? 'Community Relief Org' : 'Supporter')
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={`btn btn-sm ${tab === 'login' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('login')}>
              Quick Demo Logins
            </button>
            <button className={`btn btn-sm ${tab === 'register' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('register')}>
              Create New Account
            </button>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {tab === 'login' ? (
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '18px' }}>
                Select a pre-configured demo account to instantly explore role-specific permissions and dashboards:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {users.map(u => (
                  <div
                    key={u.id}
                    onClick={() => onSelectUser(u)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px',
                      background: currentUser.id === u.id ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-input)',
                      border: currentUser.id === u.id ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={u.avatar} alt={u.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong>{u.name}</strong>
                        <span className={`role-pill-badge role-${u.role.toLowerCase()}`}>{u.role}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email} • {u.organization}</div>
                    </div>
                    <button className="btn btn-outline btn-sm">Log In →</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Alex Morgan"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="alex@example.org"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="••••••••"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select className="form-control" value={regForm.role} onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}>
                  <option value="Donor">Donor (Donate funds & browse supplies)</option>
                  <option value="Organizer">Organizer (Launch campaigns & request goods)</option>
                  <option value="Admin">Platform Administrator (Moderation & full control)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Organization Name (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Global Health Network or Independent"
                  value={regForm.organization}
                  onChange={(e) => setRegForm({ ...regForm, organization: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Register Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MOUNT ROOT
// ----------------------------------------------------
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
