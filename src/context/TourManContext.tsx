import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Tour, Guide, ConciergeChat, ChannelConnection, OTASource } from '../types';
import { MOCK_TOURS, MOCK_GUIDES, INITIAL_BOOKINGS, MOCK_CHANNELS, MOCK_CHATS } from '../mockData/mockData';

export type ThemeMode = 'light' | 'dark' | 'system';

interface TourManContextType {
  // Theme (Light, Dark, System)
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

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

  // PWA Modal
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

  const [tours, setTours] = useState<Tour[]>(MOCK_TOURS);
  const [guides, setGuides] = useState<Guide[]>(MOCK_GUIDES);
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 4000);
  };

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
    showToast(`✅ Guest checked in successfully!`);
  };

  const markNoShow = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'no_show' };
      }
      return b;
    }));
    showToast(`⚠️ Marked as No-Show.`);
  };

  const resetBookingStatus = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'confirmed', checkInTime: undefined };
      }
      return b;
    }));
    showToast(`🔄 Status reset to Confirmed.`);
  };

  const addBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...newBookingData,
      id: `b-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`🎉 New booking added: ${newBooking.customerName} (${newBooking.pax} pax)`);
    return newBooking;
  };

  const assignGuideToTour = (tourId: string, time: string, guideId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.tourId === tourId && b.time === time) {
        return { ...b, guideId };
      }
      return b;
    }));
    const guideName = guides.find(g => g.id === guideId)?.name || 'Guide';
    showToast(`👤 Assigned ${guideName} to ${time} tour.`);
  };

  const autoAssignAllGuides = () => {
    let assigned = 0;
    // Map tour requirements to guide strengths
    const mapping: Record<string, string> = {
      'tour-1': 'guide-1', // Marco Rossi (Colosseum Archaeology)
      'tour-2': 'guide-2', // Elena Bianchi (Vatican Art)
      'tour-3': 'guide-3', // Matteo Romano (Trastevere Food)
      'tour-4': 'guide-5', // Luca Moretti (E-Bike)
      'tour-5': 'guide-4'  // Sophie Dubois (Tuscan Day Trip)
    };

    setBookings(prev => prev.map(b => {
      if (!b.guideId && mapping[b.tourId]) {
        assigned++;
        return { ...b, guideId: mapping[b.tourId] };
      }
      return b;
    }));

    showToast(`⚡ Smart Auto-Assignment completed! ${assigned > 0 ? `${assigned} tours assigned.` : 'All active tours already staffed!'}`);
    return { assignedCount: assigned };
  };

  const sendChatMessage = (chatId: string, text: string, sender: 'operator' | 'ai' | 'guest' = 'operator') => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      time: timeStr
    };

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: text,
          timestamp: timeStr,
          status: sender === 'ai' ? 'ai_handled' : 'resolved',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
  };

  const parseAndImportEmail = (rawEmail: string): { success: boolean; booking?: Booking; error?: string } => {
    try {
      let source: OTASource = 'direct';
      let ref = `IMP-${Math.floor(100000 + Math.random() * 900000)}`;
      let guestName = 'Valued Guest';
      let email = 'guest@sync.tourman.app';
      let phone = '+39 06 6988 2000';
      let tourId = 'tour-1';
      let tourTitle = 'Colosseum Underground & Arena Floor VIP Access';
      let time = '11:00 AM';
      let date = '2026-10-28';
      let pax = 2;
      let amount = 158;
      let language = 'English';
      let specialRequirements = '';

      const lower = rawEmail.toLowerCase();
      if (lower.includes('getyourguide')) {
        source = 'getyourguide';
        const refMatch = rawEmail.match(/GYG-\d+/i) || rawEmail.match(/Reference:\s*([A-Z0-9-]+)/i);
        if (refMatch) ref = refMatch[0].toUpperCase();
        
        const guestMatch = rawEmail.match(/Lead Customer:\s*([^\r\n]+)/i);
        if (guestMatch) guestName = guestMatch[1].trim();

        const emailMatch = rawEmail.match(/Customer Email:\s*([^\r\n]+)/i);
        if (emailMatch) email = emailMatch[1].trim();

        const phoneMatch = rawEmail.match(/Customer Mobile:\s*([^\r\n]+)/i);
        if (phoneMatch) phone = phoneMatch[1].trim();

        const paxMatch = rawEmail.match(/(\d+)\s*Adults?/i);
        if (paxMatch) {
          pax = parseInt(paxMatch[1]);
          amount = pax * 79;
        }

        if (lower.includes('vatican')) {
          tourId = 'tour-2';
          tourTitle = 'Vatican Museums, Sistine Chapel & St. Peter’s Basilica';
          amount = pax * 89;
        } else if (lower.includes('trastevere') || lower.includes('food')) {
          tourId = 'tour-3';
          tourTitle = 'Trastevere Twilight Sunset Food & Wine Tasting';
          amount = pax * 68;
        }
      } else if (lower.includes('viator') || lower.includes('tripadvisor')) {
        source = 'viator';
        const refMatch = rawEmail.match(/VIA-[A-Z0-9]+/i) || rawEmail.match(/BR-[A-Z0-9]+/i);
        if (refMatch) ref = refMatch[0];

        const guestMatch = rawEmail.match(/Lead Traveler:\s*([^\r\n]+)/i);
        if (guestMatch) guestName = guestMatch[1].trim();

        const contactMatch = rawEmail.match(/Contact:\s*([^\s\/]+)\s*\/\s*([^\r\n]+)/i);
        if (contactMatch) {
          email = contactMatch[1].trim();
          phone = contactMatch[2].trim();
        }

        const paxMatch = rawEmail.match(/(\d+)\s*Travelers?/i);
        if (paxMatch) {
          pax = parseInt(paxMatch[1]);
        }

        if (lower.includes('vatican')) {
          tourId = 'tour-2';
          tourTitle = 'Vatican Museums, Sistine Chapel & St. Peter’s Basilica';
          time = '01:30 PM';
          amount = pax * 89;
        }
      } else if (lower.includes('airbnb')) {
        source = 'airbnb';
        const refMatch = rawEmail.match(/AIR-[A-Z0-9]+/i) || rawEmail.match(/Code:\s*([A-Z0-9-]+)/i);
        if (refMatch) ref = refMatch[1] ? `AIR-${refMatch[1]}` : refMatch[0];

        const guestMatch = rawEmail.match(/Guest:\s*([^\r\n]+)/i);
        if (guestMatch) guestName = guestMatch[1].trim();

        const paxMatch = rawEmail.match(/(\d+)\s*Guests?/i);
        if (paxMatch) {
          pax = parseInt(paxMatch[1]);
          amount = pax * 68;
        }

        tourId = 'tour-3';
        tourTitle = 'Trastevere Twilight Sunset Food & Wine Tasting';
        time = '05:30 PM';

        const dietaryMatch = rawEmail.match(/Dietary[^:]*:\s*"([^"]+)"/i);
        if (dietaryMatch) specialRequirements = dietaryMatch[1];
      }

      const importedBooking: Booking = {
        id: `b-sync-${Date.now()}`,
        reference: ref,
        source,
        customerName: guestName,
        customerEmail: email,
        customerPhone: phone,
        tourId,
        tourTitle,
        date,
        time,
        pax,
        adults: pax,
        children: 0,
        language,
        amount,
        currency: 'EUR',
        status: 'confirmed',
        paymentStatus: 'paid',
        specialRequirements: specialRequirements || undefined,
        guideId: tourId === 'tour-1' ? 'guide-1' : tourId === 'tour-2' ? 'guide-2' : 'guide-3',
        createdAt: new Date().toISOString()
      };

      setBookings(prev => [importedBooking, ...prev]);
      showToast(`⚡ Parsed and synced booking ${importedBooking.reference} (${importedBooking.source.toUpperCase()})!`);
      return { success: true, booking: importedBooking };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to parse confirmation email format.' };
    }
  };

  const triggerSimulatedBooking = (): Booking => {
    const randomGuestNames = [
      'Sebastian Müller', 'Eleanor Vance', 'Matteo Colombo', 'Camille Laurent', 
      'Alejandro Gomez', 'Emily Thorne', 'David Sterling', 'Yuki Takahashi'
    ];
    const chosenName = randomGuestNames[Math.floor(Math.random() * randomGuestNames.length)];
    const sources: OTASource[] = ['getyourguide', 'viator', 'airbnb', 'direct', 'guruwalk'];
    const chosenSource = sources[Math.floor(Math.random() * sources.length)];
    const randomTour = tours[Math.floor(Math.random() * tours.length)];
    const randomTime = randomTour.departureTimes[Math.floor(Math.random() * randomTour.departureTimes.length)];
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
      guideId: randomTour.id === 'tour-1' ? 'guide-1' : randomTour.id === 'tour-2' ? 'guide-2' : undefined,
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
        setShowNewBookingModal
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
