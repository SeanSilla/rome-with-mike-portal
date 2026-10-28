import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Tour, Guide, ConciergeChat, ChannelConnection, OTASource, UserAccount } from '../types';
import { MOCK_TOURS, MOCK_GUIDES, INITIAL_BOOKINGS, MOCK_CHANNELS, MOCK_CHATS, MOCK_USERS } from '../mockData/mockData';

export type ThemeMode = 'light' | 'dark' | 'system';

interface TourManContextType {
  // Theme (Light, Dark, System)
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // Authentication & Guide Accounts
  users: UserAccount[];
  currentUser: UserAccount | null;
  login: (usernameOrEmail: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  switchUser: (userId: string) => void;
  updateUserProfile: (userId: string, updates: { displayName?: string; password?: string; phone?: string; languages?: string[] }) => void;
  createGuideAccount: (data: { name: string; email: string; password: string; role?: string; languages: string[]; baseRatePerTour: number; licenseNumber: string; phone?: string; bio?: string }) => Guide;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;

  // Navigation & Mode
  activeMode: 'landing' | 'app';
  setActiveMode: (mode: 'landing' | 'app') => void;
  currentAppTab: string;
  setCurrentAppTab: (tab: string) => void;
  selectedTourId: string;
  setSelectedTourId: (id: string) => void;

  // Data
  tours: Tour[];
  guides: Guide[];
  bookings: Booking[];
  channels: ChannelConnection[];
  chats: ConciergeChat[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;

  // Actions
  checkInBooking: (bookingId: string) => void;
  markNoShow: (bookingId: string) => void;
  resetBookingStatus: (bookingId: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  assignGuideToTour: (tourId: string, time: string, guideId: string) => void;
  autoAssignAllGuides: () => { assignedCount: number };
  sendChatMessage: (chatId: string, text: string, sender?: 'operator' | 'ai' | 'guest') => void;
  parseAndImportEmail: (rawEmail: string) => { success: boolean; booking?: Booking; error?: string };
  triggerSimulatedBooking: () => Booking;
  
  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // PWA & Modals
  showPwaModal: boolean;
  setShowPwaModal: (show: boolean) => void;
  showNewBookingModal: boolean;
  setShowNewBookingModal: (show: boolean) => void;
}

const TourManContext = createContext<TourManContextType | undefined>(undefined);

export const TourManProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeMode, setActiveMode] = useState<'landing' | 'app'>('landing');
  const [currentAppTab, setCurrentAppTab] = useState<string>('dashboard');
  const [selectedTourId, setSelectedTourId] = useState<string>('tour-1');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-28');

  // Users & Authentication State
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('rwm_users');
      return saved ? JSON.parse(saved) : MOCK_USERS;
    } catch {
      return MOCK_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('rwm_current_user');
      return saved ? JSON.parse(saved) : MOCK_USERS[0]; // Defaults to Mighty Mike (Admin)
    } catch {
      return MOCK_USERS[0];
    }
  });

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Core Data
  const [tours, setTours] = useState<Tour[]>(MOCK_TOURS);
  const [guides, setGuides] = useState<Guide[]>(() => {
    try {
      const saved = localStorage.getItem('rwm_guides');
      return saved ? JSON.parse(saved) : MOCK_GUIDES;
    } catch {
      return MOCK_GUIDES;
    }
  });
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [channels, setChannels] = useState<ChannelConnection[]>(MOCK_CHANNELS);
  const [chats, setChats] = useState<ConciergeChat[]>(MOCK_CHATS);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPwaModal, setShowPwaModal] = useState<boolean>(false);
  const [showNewBookingModal, setShowNewBookingModal] = useState<boolean>(false);

  // Theme Management (Light, Dark, System)
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('rwm_theme') as ThemeMode) || 'system';
  });

  const applyTheme = (t: ThemeMode) => {
    const root = document.documentElement;
    const isDarkSystem = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (t === 'system' && isDarkSystem)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('rwm_theme', t);
    applyTheme(t);
    showToast(`🎨 Theme set to ${t.toUpperCase()}`);
  };

  useEffect(() => {
    applyTheme(theme);
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Persist Users & Guides
  useEffect(() => {
    localStorage.setItem('rwm_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('rwm_guides', JSON.stringify(guides));
  }, [guides]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rwm_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rwm_current_user');
    }
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 4000);
  };

  // Auth Operations
  const login = (usernameOrEmail: string, pass: string) => {
    const trimmed = usernameOrEmail.trim().toLowerCase();
    const user = users.find(u => 
      u.email.toLowerCase() === trimmed || 
      u.username.toLowerCase() === trimmed
    );

    if (!user) {
      return { success: false, error: 'User account not found. Please check your username or email.' };
    }

    if (user.password !== pass) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(user);
    setShowLoginModal(false);
    showToast(`👋 Welcome back, ${user.displayName} (${user.role === 'admin' ? 'Master Admin' : 'Certified Guide'})!`);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setShowLoginModal(true);
    showToast('🔒 Signed out successfully.');
  };

  const switchUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      showToast(`🔄 Switched active session to ${user.displayName} (${user.role.toUpperCase()})`);
    }
  };

  const updateUserProfile = (userId: string, updates: { displayName?: string; password?: string; phone?: string; languages?: string[] }) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      const updated = {
        ...u,
        displayName: updates.displayName?.trim() || u.displayName,
        password: updates.password?.trim() || u.password,
        phone: updates.phone?.trim() || u.phone
      };

      // If current user is being updated, sync
      if (currentUser?.id === userId) {
        setCurrentUser(updated);
      }
      return updated;
    }));

    // If guide display name changed, sync in guide roster
    if (updates.displayName) {
      const targetUser = users.find(u => u.id === userId);
      const gId = targetUser?.guideId || userId;
      setGuides(prev => prev.map(g => g.id === gId ? { ...g, name: updates.displayName! } : g));
    }

    showToast('✅ Account credentials and profile updated successfully!');
  };

  const createGuideAccount = (data: { 
    name: string; 
    email: string; 
    password: string; 
    role?: string; 
    languages: string[]; 
    baseRatePerTour: number; 
    licenseNumber: string; 
    phone?: string; 
    bio?: string 
  }): Guide => {
    const newId = `usr_${data.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Math.floor(100 + Math.random() * 900)}`;
    const username = data.email.split('@')[0].toLowerCase();

    const newGuide: Guide = {
      id: newId,
      name: data.name,
      role: data.role || 'Certified Local Guide',
      email: data.email,
      phone: data.phone || '+39 06 1234 5678',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
      languages: data.languages.length > 0 ? data.languages : ['English', 'Italian'],
      rating: 5.0,
      reviewCount: 0,
      totalTours: 0,
      licenseNumber: data.licenseNumber || `RM-LIC-${Math.floor(100000 + Math.random() * 900000)}`,
      baseRatePerTour: data.baseRatePerTour || 95,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      status: 'available',
      bio: data.bio || `Certified Roman guide with official municipal badge.`
    };

    const newUser: UserAccount = {
      id: newId,
      username,
      email: data.email,
      password: data.password || 'guide123',
      displayName: data.name,
      role: 'guide',
      guideId: newId,
      avatar: newGuide.avatar,
      phone: newGuide.phone,
      licenseNumber: newGuide.licenseNumber
    };

    setGuides(prev => [newGuide, ...prev]);
    setUsers(prev => [newUser, ...prev]);

    showToast(`👤 Guide profile & login created for ${data.name}! Password: ${newUser.password}`);
    return newGuide;
  };

  // Booking & Operations Actions
  const checkInBooking = (bookingId: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'checked_in',
          checkInTime: timeStr
        };
      }
      return b;
    }));
    showToast(`✓ Guest checked in successfully.`);
  };

  const markNoShow = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'no_show'
        };
      }
      return b;
    }));
    showToast(`⚠️ Booking marked as No-Show.`);
  };

  const resetBookingStatus = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'confirmed',
          checkInTime: undefined
        };
      }
      return b;
    }));
    showToast(`Booking status reset to Confirmed.`);
  };

  const addBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...newBookingData,
      id: `b-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`🎉 Reservation ${newBooking.reference} created and synced!`);
    return newBooking;
  };

  const assignGuideToTour = (tourId: string, time: string, guideId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.tourId === tourId && b.date === selectedDate) {
        return {
          ...b,
          guideId: guideId || undefined
        };
      }
      return b;
    }));
    const guideName = guides.find(g => g.id === guideId)?.name || 'Unassigned';
    showToast(`📋 Tour scheduled with guide: ${guideName}`);
  };

  const autoAssignAllGuides = () => {
    let assigned = 0;
    const unassignedBookings = bookings.filter(b => !b.guideId && b.date === selectedDate);
    
    if (unassignedBookings.length === 0) {
      showToast(`All tours for ${selectedDate} already have assigned guides!`);
      return { assignedCount: 0 };
    }

    setBookings(prev => prev.map(b => {
      if (!b.guideId && b.date === selectedDate) {
        assigned++;
        // Smart matching logic
        const tour = tours.find(t => t.id === b.tourId);
        const reqLangs = tour?.languages || ['English'];
        
        // Find best guide matching language
        const matchedGuide = guides.find(g => 
          g.languages.some(l => reqLangs.includes(l)) && g.status === 'available'
        ) || guides[assigned % guides.length];

        return {
          ...b,
          guideId: matchedGuide?.id || guides[0].id
        };
      }
      return b;
    }));

    showToast(`⚡ AI Auto-assigned ${assigned} tours to certified guides!`);
    return { assignedCount: assigned };
  };

  const sendChatMessage = (chatId: string, text: string, sender: 'operator' | 'ai' | 'guest' = 'operator') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: text,
          timestamp: 'Just now',
          messages: [
            ...c.messages,
            {
              id: `msg-${Date.now()}`,
              sender,
              text,
              time: timeStr
            }
          ]
        };
      }
      return c;
    }));
  };

  const parseAndImportEmail = (rawEmail: string): { success: boolean; booking?: Booking; error?: string } => {
    if (!rawEmail || rawEmail.trim().length < 20) {
      return { success: false, error: 'Email text is too short or empty.' };
    }

    let source: OTASource = 'getyourguide';
    if (rawEmail.toLowerCase().includes('viator') || rawEmail.toLowerCase().includes('tripadvisor')) {
      source = 'viator';
    } else if (rawEmail.toLowerCase().includes('airbnb')) {
      source = 'airbnb';
    }

    // Name extraction
    let customerName = 'Guest Traveler';
    const nameMatch = rawEmail.match(/(?:Lead Traveler|Guest Name|Primary Traveler|Booked by):\s*([A-Za-z\s]+)/i);
    if (nameMatch && nameMatch[1]) {
      customerName = nameMatch[1].trim();
    } else {
      const names = ['Michael Brown', 'Sophia Wilson', 'Alexander Koch', 'Claire Dupont', 'David Chen'];
      customerName = names[Math.floor(Math.random() * names.length)];
    }

    // Reference extraction
    let reference = `${source.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const refMatch = rawEmail.match(/(?:Reference|Booking reference|Confirmation code|Code):\s*([A-Z0-9\-]+)/i);
    if (refMatch && refMatch[1]) {
      reference = refMatch[1].trim();
    }

    // Pax extraction
    let pax = 2;
    const paxMatch = rawEmail.match(/(?:Guests|Participants|Pax|Quantity|Tickets):\s*(\d+)/i);
    if (paxMatch && paxMatch[1]) {
      pax = parseInt(paxMatch[1], 10);
    }

    // Tour assignment
    let matchedTour = tours[0];
    if (rawEmail.toLowerCase().includes('vatican') || rawEmail.toLowerCase().includes('sistine')) {
      matchedTour = tours.find(t => t.id === 'tour-2') || tours[0];
    } else if (rawEmail.toLowerCase().includes('food') || rawEmail.toLowerCase().includes('trastevere') || rawEmail.toLowerCase().includes('wine')) {
      matchedTour = tours.find(t => t.id === 'tour-3') || tours[0];
    }

    const newBooking: Booking = {
      id: `b-parsed-${Date.now()}`,
      reference,
      source,
      customerName,
      customerEmail: `${customerName.toLowerCase().replace(/[^a-z]/g, '.')}@gmail.com`,
      customerPhone: '+1 555 ' + Math.floor(100 + Math.random() * 900) + ' ' + Math.floor(1000 + Math.random() * 9000),
      tourId: matchedTour.id,
      tourTitle: matchedTour.title,
      date: selectedDate,
      time: matchedTour.departureTimes[0] || '10:00 AM',
      pax,
      adults: pax,
      children: 0,
      language: 'English',
      amount: pax * matchedTour.pricePerPerson,
      currency: 'EUR',
      status: 'confirmed',
      paymentStatus: 'paid',
      guideId: matchedTour.id === 'tour-1' ? 'usr_alain_piredda' : matchedTour.id === 'tour-2' ? 'usr_amanda_karr' : undefined,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    showToast(`⚡ Ingested new reservation from ${source.toUpperCase()}: ${customerName} (${pax} Pax)!`);
    return { success: true, booking: newBooking };
  };

  const triggerSimulatedBooking = (): Booking => {
    const sources: OTASource[] = ['getyourguide', 'viator', 'airbnb', 'direct'];
    const names = [
      'Liam Gallagher',
      'Emma Watson',
      'Giovanni Rossi',
      'Isabella Garcia',
      'Oliver Schmidt',
      'Charlotte Dubois',
      'Lucas Silva'
    ];

    const randomTour = tours[Math.floor(Math.random() * tours.length)];
    const randomTime = randomTour.departureTimes[Math.floor(Math.random() * randomTour.departureTimes.length)];
    const chosenSource = sources[Math.floor(Math.random() * sources.length)];
    const chosenName = names[Math.floor(Math.random() * names.length)];
    const pax = Math.floor(Math.random() * 3) + 1;

    const newBooking: Booking = {
      id: `b-live-${Date.now()}`,
      reference: `${chosenSource.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      source: chosenSource,
      customerName: chosenName,
      customerEmail: `${chosenName.toLowerCase().replace(/[^a-z]/g, '.')}@example.com`,
      customerPhone: `+${Math.floor(10 + Math.random() * 89)} 3${Math.floor(10000000 + Math.random() * 90000000)}`,
      tourId: randomTour.id,
      tourTitle: randomTour.title,
      date: selectedDate,
      time: randomTime,
      pax,
      adults: pax,
      children: 0,
      language: 'English',
      amount: pax * randomTour.pricePerPerson,
      currency: 'EUR',
      status: 'confirmed',
      paymentStatus: 'paid',
      guideId: randomTour.id === 'tour-1' ? 'usr_alain_piredda' : randomTour.id === 'tour-2' ? 'usr_amanda_karr' : 'guide-1',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    showToast(`🔔 Real-Time OTA Ping: ${newBooking.customerName} booked ${newBooking.tourTitle} via ${newBooking.source.toUpperCase()}!`);
    return newBooking;
  };

  return (
    <TourManContext.Provider
      value={{
        activeMode,
        setActiveMode,
        currentAppTab,
        setCurrentAppTab,
        selectedTourId,
        setSelectedTourId,
        tours,
        guides,
        bookings,
        channels,
        chats,
        selectedDate,
        setSelectedDate,
        checkInBooking,
        markNoShow,
        resetBookingStatus,
        addBooking,
        assignGuideToTour,
        autoAssignAllGuides,
        sendChatMessage,
        parseAndImportEmail,
        triggerSimulatedBooking,
        toastMessage,
        showToast,
        theme,
        setTheme,
        showPwaModal,
        setShowPwaModal,
        showNewBookingModal,
        setShowNewBookingModal,
        users,
        currentUser,
        login,
        logout,
        switchUser,
        updateUserProfile,
        createGuideAccount,
        showLoginModal,
        setShowLoginModal,
        showProfileModal,
        setShowProfileModal
      }}
    >
      {children}
    </TourManContext.Provider>
  );
};

export const useTourMan = () => {
  const context = useContext(TourManContext);
  if (!context) {
    throw new Error('useTourMan must be used within a TourManProvider');
  }
  return context;
};
