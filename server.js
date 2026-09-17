const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'donation_marketplace_secret_jwt_key_2026';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/donation_marketplace';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// In-Memory Database Store (Used directly or as fallback when MongoDB isn't connected)
let memoryStore = {
  users: [
    {
      id: 'usr-1',
      name: 'Elena Rostova',
      email: 'donor@hope.org',
      passwordHash: bcrypt.hashSync('donor123', 10),
      role: 'Donor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      organization: 'Individual Philanthropist',
      createdAt: new Date().toISOString()
    },
    {
      id: 'usr-2',
      name: 'Marcus Vance',
      email: 'organizer@care.org',
      passwordHash: bcrypt.hashSync('organizer123', 10),
      role: 'Organizer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      organization: 'Care & Relief Global',
      createdAt: new Date().toISOString()
    },
    {
      id: 'usr-3',
      name: 'Dr. Sarah Jenkins',
      email: 'admin@marketplace.org',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      organization: 'Marketplace Foundation Oversight',
      createdAt: new Date().toISOString()
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
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
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
      createdAt: new Date(Date.now() - 86400000 * 18).toISOString()
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
      createdAt: new Date(Date.now() - 86400000 * 25).toISOString()
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
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString()
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
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ],
  marketplaceItems: [
    {
      id: 'mkt-1',
      title: 'Pediatric Wheelchairs & Mobility Walkers',
      description: 'Set of 4 lightweight foldable adjustable pediatric wheelchairs in pristine condition.',
      category: 'Medical Supplies',
      quantity: 8,
      condition: 'Like New',
      estimatedValue: 240,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
      location: 'Chicago, IL',
      status: 'Available',
      donorName: 'Dr. Michael Chang',
      donorId: 'usr-1',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 'mkt-2',
      title: 'Refurbished ThinkPad Laptops (Core i5 / 16GB)',
      description: 'Tested and loaded with open-source educational software, chargers included. Ideal for high school learners.',
      category: 'Tech & Devices',
      quantity: 15,
      condition: 'Refurbished',
      estimatedValue: 180,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      location: 'Austin, TX',
      status: 'Available',
      donorName: 'TechForGood Corp',
      donorId: 'usr-1',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: 'mkt-3',
      title: 'High-Thermal Winter Blankets & Sleeping Pads',
      description: 'Durable, waterproof thermal fleece blankets suitable for shelter beds and emergency displaced families.',
      category: 'Clothing & Shelter',
      quantity: 45,
      condition: 'Brand New',
      estimatedValue: 25,
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
      location: 'Denver, CO',
      status: 'Available',
      donorName: 'Warmth Alliance',
      donorId: 'usr-1',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
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
      donorId: 'usr-1',
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
      id: 'mkt-5',
      title: 'Elementary Backpacks with Complete Stationery Sets',
      description: 'Heavy-duty student backpacks filled with notebooks, pens, colored pencils, rulers, and geometry kits.',
      category: 'School Kits',
      quantity: 30,
      condition: 'Brand New',
      estimatedValue: 35,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      location: 'Atlanta, GA',
      status: 'Available',
      donorName: 'Elena Rostova',
      donorId: 'usr-1',
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
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
      donorId: 'usr-1',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
    }
  ],
  donors: [
    {
      id: 'dnr-1',
      name: 'Elena Rostova',
      email: 'elena.rostova@gmail.com',
      totalDonated: 12450,
      donationsCount: 14,
      badge: 'Champion Donor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
      id: 'dnr-2',
      name: 'Jonathan Sterling',
      email: 'j.sterling@meridian.io',
      totalDonated: 8900,
      donationsCount: 8,
      badge: 'Gold Tier',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 'dnr-3',
      name: 'Amina Al-Mansoor',
      email: 'amina.mansoor@oasis.org',
      totalDonated: 6200,
      donationsCount: 6,
      badge: 'Gold Tier',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      id: 'dnr-4',
      name: 'David & Clara Hughes',
      email: 'hughes.family@outlook.com',
      totalDonated: 3450,
      donationsCount: 5,
      badge: 'Silver Tier',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: new Date(Date.now() - 86400000 * 8).toISOString()
    },
    {
      id: 'dnr-5',
      name: 'Priya Narayanan',
      email: 'priya.n@techseed.in',
      totalDonated: 1850,
      donationsCount: 3,
      badge: 'Bronze Tier',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
      lastDonatedAt: new Date(Date.now() - 86400000 * 12).toISOString()
    }
  ],
  donations: [
    {
      id: 'don-1',
      campaignId: 'cmp-1',
      campaignTitle: 'Emergency Medical Kits for Disaster Relief',
      donorName: 'Elena Rostova',
      donorEmail: 'elena.rostova@gmail.com',
      amount: 1500,
      paymentMethod: 'Credit Card',
      receiptNumber: 'RCPT-2026-8841',
      isAnonymous: false,
      message: 'Praying for swift relief for everyone on the ground.',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
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
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
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
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
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
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ],
  orders: [
    {
      id: 'ord-1',
      orderNumber: 'REQ-2026-9041',
      userId: 'usr-2',
      userName: 'Marcus Vance (Care & Relief)',
      deliveryAddress: '742 Evergreen Community Hub, Sector 4, Chicago IL',
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
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 'ord-2',
      orderNumber: 'REQ-2026-9035',
      userId: 'usr-1',
      userName: 'Elena Rostova',
      deliveryAddress: 'Rural Youth Center, 120 Mountain Road, Denver CO',
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
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
    }
  ]
};

// Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
      req.user = user;
      next();
    });
  } else {
    // For open sandbox demonstration, fallback to guest/donor if needed, but return 401 if strict
    next();
  }
};

// ----------------------------------------------------
// AUTHENTICATION ROUTES
// ----------------------------------------------------
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, organization } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existing = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: 'User already exists with this email address.' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    role: role || 'Donor',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    organization: organization || 'Community Member',
    createdAt: new Date().toISOString()
  };

  memoryStore.users.push(newUser);

  // If registering as a Donor, also register in the donor roster
  if (newUser.role === 'Donor') {
    memoryStore.donors.push({
      id: `dnr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      totalDonated: 0,
      donationsCount: 0,
      badge: 'New Donor',
      avatar: newUser.avatar,
      lastDonatedAt: new Date().toISOString()
    });
  }

  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
  const { passwordHash, ...userSafe } = newUser;
  res.status(201).json({ token, user: userSafe });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials. User not found.' });
  }

  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password. Please check your credentials.' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  const { passwordHash, ...userSafe } = user;
  res.json({ token, user: userSafe });
});

app.get('/api/auth/me', authenticateJWT, (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const user = memoryStore.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { passwordHash, ...userSafe } = user;
  res.json(userSafe);
});

// ----------------------------------------------------
// CAMPAIGN MANAGEMENT ROUTES (/api/donationcampaign & /api/campaign)
// ----------------------------------------------------
const handleGetCampaigns = (req, res) => {
  const { search, category, status } = req.query;
  let list = [...memoryStore.campaigns];

  if (search) {
    const s = search.toLowerCase();
    list = list.filter(c => c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s));
  }
  if (category && category !== 'All') {
    list = list.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }
  if (status && status !== 'All') {
    list = list.filter(c => c.status.toLowerCase() === status.toLowerCase());
  }

  res.json(list);
};

const handleCreateCampaign = (req, res) => {
  const { title, description, category, targetAmount, image, organizerName, urgent, endDate } = req.body;
  if (!title || !targetAmount) {
    return res.status(400).json({ message: 'Campaign title and target amount are required.' });
  }

  const newCampaign = {
    id: `cmp-${Date.now()}`,
    title,
    description: description || '',
    category: category || 'General',
    targetAmount: Number(targetAmount),
    raisedAmount: 0,
    organizerId: req.user ? req.user.id : 'usr-2',
    organizerName: organizerName || (req.user ? req.user.name : 'Care Global'),
    image: image || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=800&auto=format&fit=crop&q=80',
    status: 'Active',
    urgent: Boolean(urgent),
    donorsCount: 0,
    endDate: endDate || '2026-12-31',
    createdAt: new Date().toISOString()
  };

  memoryStore.campaigns.unshift(newCampaign);
  res.status(201).json(newCampaign);
};

const handleUpdateCampaign = (req, res) => {
  const { id } = req.params;
  const index = memoryStore.campaigns.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Campaign not found' });

  memoryStore.campaigns[index] = {
    ...memoryStore.campaigns[index],
    ...req.body,
    targetAmount: req.body.targetAmount ? Number(req.body.targetAmount) : memoryStore.campaigns[index].targetAmount
  };

  res.json(memoryStore.campaigns[index]);
};

const handleDeleteCampaign = (req, res) => {
  const { id } = req.params;
  const index = memoryStore.campaigns.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Campaign not found' });

  const deleted = memoryStore.campaigns.splice(index, 1)[0];
  res.json({ message: 'Campaign deleted successfully', deleted });
};

// Register endpoints for both `/api/donationcampaign` and `/api/campaign`
app.get('/api/donationcampaign', handleGetCampaigns);
app.post('/api/donationcampaign', handleCreateCampaign);
app.put('/api/donationcampaign/:id', handleUpdateCampaign);
app.delete('/api/donationcampaign/:id', handleDeleteCampaign);

app.get('/api/campaign', handleGetCampaigns);
app.post('/api/campaign', handleCreateCampaign);
app.put('/api/campaign/:id', handleUpdateCampaign);
app.delete('/api/campaign/:id', handleDeleteCampaign);

// ----------------------------------------------------
// MARKETPLACE LISTINGS ROUTES (/api/marketplace)
// ----------------------------------------------------
app.get('/api/marketplace', (req, res) => {
  const { category, search, condition } = req.query;
  let items = [...memoryStore.marketplaceItems];

  if (search) {
    const s = search.toLowerCase();
    items = items.filter(i => i.title.toLowerCase().includes(s) || i.description.toLowerCase().includes(s));
  }
  if (category && category !== 'All') {
    items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }
  if (condition && condition !== 'All') {
    items = items.filter(i => i.condition.toLowerCase() === condition.toLowerCase());
  }

  res.json(items);
});

app.post('/api/marketplace', (req, res) => {
  const { title, description, category, quantity, condition, estimatedValue, image, location } = req.body;
  if (!title || quantity === undefined) {
    return res.status(400).json({ message: 'Title and quantity are required.' });
  }

  const newItem = {
    id: `mkt-${Date.now()}`,
    title,
    description: description || '',
    category: category || 'General Supplies',
    quantity: Number(quantity) || 1,
    condition: condition || 'Good',
    estimatedValue: Number(estimatedValue) || 0,
    image: image || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
    location: location || 'National Logistics Hub',
    status: 'Available',
    donorName: req.user ? req.user.name : 'Generous Contributor',
    donorId: req.user ? req.user.id : 'usr-1',
    createdAt: new Date().toISOString()
  };

  memoryStore.marketplaceItems.unshift(newItem);
  res.status(201).json(newItem);
});

app.put('/api/marketplace/:id', (req, res) => {
  const { id } = req.params;
  const index = memoryStore.marketplaceItems.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Marketplace item not found' });

  memoryStore.marketplaceItems[index] = {
    ...memoryStore.marketplaceItems[index],
    ...req.body,
    quantity: req.body.quantity !== undefined ? Number(req.body.quantity) : memoryStore.marketplaceItems[index].quantity,
    estimatedValue: req.body.estimatedValue !== undefined ? Number(req.body.estimatedValue) : memoryStore.marketplaceItems[index].estimatedValue
  };

  res.json(memoryStore.marketplaceItems[index]);
});

app.delete('/api/marketplace/:id', (req, res) => {
  const { id } = req.params;
  const index = memoryStore.marketplaceItems.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Marketplace item not found' });

  const deleted = memoryStore.marketplaceItems.splice(index, 1)[0];
  res.json({ message: 'Item deleted successfully', deleted });
});

// ----------------------------------------------------
// DONOR MANAGEMENT ROUTES (/api/donors)
// ----------------------------------------------------
app.get('/api/donors', (req, res) => {
  const { search } = req.query;
  let list = [...memoryStore.donors];
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(d => d.name.toLowerCase().includes(s) || d.email.toLowerCase().includes(s));
  }
  res.json(list);
});

app.post('/api/donors', (req, res) => {
  const { name, email, badge, avatar } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Donor name and email are required.' });

  const newDonor = {
    id: `dnr-${Date.now()}`,
    name,
    email,
    totalDonated: 0,
    donationsCount: 0,
    badge: badge || 'Bronze Tier',
    avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    lastDonatedAt: new Date().toISOString()
  };

  memoryStore.donors.unshift(newDonor);
  res.status(201).json(newDonor);
});

app.put('/api/donors/:id', (req, res) => {
  const { id } = req.params;
  const index = memoryStore.donors.findIndex(d => d.id === id);
  if (index === -1) return res.status(404).json({ message: 'Donor not found' });

  memoryStore.donors[index] = { ...memoryStore.donors[index], ...req.body };
  res.json(memoryStore.donors[index]);
});

app.delete('/api/donors/:id', (req, res) => {
  const { id } = req.params;
  const index = memoryStore.donors.findIndex(d => d.id === id);
  if (index === -1) return res.status(404).json({ message: 'Donor not found' });

  const deleted = memoryStore.donors.splice(index, 1)[0];
  res.json({ message: 'Donor removed', deleted });
});

// ----------------------------------------------------
// DONATION TRANSACTIONS ROUTES (/api/donations)
// ----------------------------------------------------
app.get('/api/donations', (req, res) => {
  res.json(memoryStore.donations);
});

app.post('/api/donations', (req, res) => {
  const { campaignId, amount, donorName, donorEmail, paymentMethod, isAnonymous, message } = req.body;
  if (!campaignId || !amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Campaign ID and valid donation amount are required.' });
  }

  const campaign = memoryStore.campaigns.find(c => c.id === campaignId);
  const campaignTitle = campaign ? campaign.title : 'General Relief Fund';
  const numAmount = Number(amount);

  const receiptNumber = `RCPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newDonation = {
    id: `don-${Date.now()}`,
    campaignId,
    campaignTitle,
    donorName: isAnonymous ? 'Anonymous Donor' : (donorName || 'Generous Supporter'),
    donorEmail: donorEmail || 'supporter@hope.org',
    amount: numAmount,
    paymentMethod: paymentMethod || 'Credit Card',
    receiptNumber,
    isAnonymous: Boolean(isAnonymous),
    message: message || '',
    createdAt: new Date().toISOString()
  };

  memoryStore.donations.unshift(newDonation);

  // Update campaign stats
  if (campaign) {
    campaign.raisedAmount += numAmount;
    campaign.donorsCount += 1;
  }

  // Update donor profile stats
  if (!isAnonymous && donorEmail) {
    let donor = memoryStore.donors.find(d => d.email.toLowerCase() === donorEmail.toLowerCase());
    if (donor) {
      donor.totalDonated += numAmount;
      donor.donationsCount += 1;
      donor.lastDonatedAt = new Date().toISOString();
      if (donor.totalDonated >= 10000) donor.badge = 'Champion Donor';
      else if (donor.totalDonated >= 5000) donor.badge = 'Gold Tier';
      else if (donor.totalDonated >= 2000) donor.badge = 'Silver Tier';
    } else {
      memoryStore.donors.push({
        id: `dnr-${Date.now()}`,
        name: donorName || 'Supporter',
        email: donorEmail,
        totalDonated: numAmount,
        donationsCount: 1,
        badge: numAmount >= 2000 ? 'Silver Tier' : 'Bronze Tier',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(donorName || 'User')}`,
        lastDonatedAt: new Date().toISOString()
      });
    }
  }

  res.status(201).json(newDonation);
});

app.delete('/api/donations/:id', (req, res) => {
  const { id } = req.params;
  const index = memoryStore.donations.findIndex(d => d.id === id);
  if (index === -1) return res.status(404).json({ message: 'Donation record not found' });

  const deleted = memoryStore.donations.splice(index, 1)[0];
  res.json({ message: 'Donation record removed', deleted });
});

// ----------------------------------------------------
// ORDERS & REQUESTS ROUTES (/api/orders)
// ----------------------------------------------------
app.get('/api/orders', (req, res) => {
  res.json(memoryStore.orders);
});

app.post('/api/orders', (req, res) => {
  const { items, deliveryAddress, userName, userId, notes } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ message: 'Cart items are required to place an order.' });
  }

  const orderNumber = `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  let totalItemsCount = 0;
  let totalEstimatedValue = 0;

  // Process items & update stock quantities in marketplace
  const processedItems = items.map(item => {
    const qty = Number(item.quantity) || 1;
    const unitVal = Number(item.estimatedValue || item.unitValue || 0);
    totalItemsCount += qty;
    totalEstimatedValue += qty * unitVal;

    // Deduct quantity from inventory
    const mktItem = memoryStore.marketplaceItems.find(i => i.id === item.id);
    if (mktItem) {
      mktItem.quantity = Math.max(0, mktItem.quantity - qty);
      if (mktItem.quantity === 0) {
        mktItem.status = 'Claimed';
      }
    }

    return {
      id: item.id,
      title: item.title,
      quantity: qty,
      unitValue: unitVal,
      totalValue: qty * unitVal
    };
  });

  const newOrder = {
    id: `ord-${Date.now()}`,
    orderNumber,
    userId: userId || 'usr-1',
    userName: userName || 'Requesting Organization',
    deliveryAddress: deliveryAddress || 'Standard Dispatch Destination',
    notes: notes || '',
    status: 'Submitted',
    totalItems: totalItemsCount,
    totalEstimatedValue,
    items: processedItems,
    createdAt: new Date().toISOString()
  };

  memoryStore.orders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const index = memoryStore.orders.findIndex(o => o.id === id);
  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  memoryStore.orders[index] = { ...memoryStore.orders[index], ...req.body };
  res.json(memoryStore.orders[index]);
});

// ----------------------------------------------------
// PLATFORM STATISTICS & ANALYTICS (/api/stats)
// ----------------------------------------------------
app.get('/api/stats', (req, res) => {
  const totalRaised = memoryStore.campaigns.reduce((acc, c) => acc + (c.raisedAmount || 0), 0);
  const totalTarget = memoryStore.campaigns.reduce((acc, c) => acc + (c.targetAmount || 0), 0);
  const totalDonations = memoryStore.donations.length;
  const totalDonors = memoryStore.donors.length;
  const totalCampaigns = memoryStore.campaigns.length;
  const totalMarketplaceItems = memoryStore.marketplaceItems.length;
  const totalOrders = memoryStore.orders.length;
  const totalGoodsDistributedValue = memoryStore.orders.reduce((acc, o) => acc + (o.totalEstimatedValue || 0), 0);

  res.json({
    totalRaised,
    totalTarget,
    totalDonations,
    totalDonors,
    totalCampaigns,
    totalMarketplaceItems,
    totalOrders,
    totalGoodsDistributedValue,
    activeCampaigns: memoryStore.campaigns.filter(c => c.status === 'Active').length,
    urgentCampaigns: memoryStore.campaigns.filter(c => c.urgent).length
  });
});

// Attempt optional MongoDB connection if available
if (process.env.MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB database successfully.'))
    .catch(err => console.log('MongoDB not connected; using high-speed In-Memory store with mock resilience.'));
}

// Start Server
app.listen(PORT, () => {
  console.log(`Donation Marketplace API Server running on port ${PORT}`);
  console.log(`Endpoints available: /api/auth, /api/campaign, /api/donationcampaign, /api/marketplace, /api/donors, /api/donations, /api/orders, /api/stats`);
});
