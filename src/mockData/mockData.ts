import { Booking, Tour, Guide, ConciergeChat, ChannelConnection, UserAccount } from '../types';

export const MOCK_USERS: UserAccount[] = [
  {
    id: 'usr_mike',
    username: 'mike',
    email: 'mike@romewithmike.com',
    password: 'Mike2026!',
    displayName: 'Mighty Mike (The Boss)',
    role: 'admin',
    guideId: 'usr_mike',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    phone: '+39 06 9988 7766',
    licenseNumber: 'RM-ADMIN-001'
  },
  {
    id: 'usr_alain_piredda',
    username: 'alain.piredda',
    email: 'alain@romewithmike.com',
    password: 'guide123',
    displayName: 'Alain Piredda',
    role: 'guide',
    guideId: 'usr_alain_piredda',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    phone: '+39 347 112 3344',
    licenseNumber: 'RM-LIC-049281'
  },
  {
    id: 'usr_amanda_karr',
    username: 'amanda.karr',
    email: 'amanda@romewithmike.com',
    password: 'guide123',
    displayName: 'Amanda Karr',
    role: 'guide',
    guideId: 'usr_amanda_karr',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    phone: '+39 340 998 8776',
    licenseNumber: 'RM-LIC-088192'
  },
  {
    id: 'usr_divan_hattingh',
    username: 'divan.hattingh',
    email: 'divan@romewithmike.com',
    password: 'guide123',
    displayName: 'Divan Hattingh',
    role: 'guide',
    guideId: 'usr_divan_hattingh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    phone: '+39 338 445 5667',
    licenseNumber: 'RM-LIC-091100'
  },
  {
    id: 'guide-1',
    username: 'marco.rossi',
    email: 'marco@romewithmike.com',
    password: 'guide123',
    displayName: 'Marco Rossi',
    role: 'guide',
    guideId: 'guide-1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    phone: '+39 347 182 9941',
    licenseNumber: 'RM-LIC-049281'
  },
  {
    id: 'guide-2',
    username: 'elena.bianchi',
    email: 'elena@romewithmike.com',
    password: 'guide123',
    displayName: 'Elena Bianchi',
    role: 'guide',
    guideId: 'guide-2',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    phone: '+39 349 823 1102',
    licenseNumber: 'RM-LIC-088192'
  }
];

export const MOCK_TOURS: Tour[] = [
  {
    id: 'tour-1',
    title: 'Colosseum Underground & Arena Floor VIP Access',
    shortCode: 'COLO-VIP',
    category: 'Historical & Archaeology',
    duration: '3.0 hours',
    meetingPoint: 'Arch of Constantine, North Face (near Colosseo Metro B)',
    meetingPointDetails: 'Look for the guide holding the navy blue TourMan / Roma Imperial flag.',
    meetingPointMapUrl: 'https://maps.google.com/?q=Arch+of+Constantine+Rome',
    maxCapacity: 24,
    pricePerPerson: 79,
    languages: ['English', 'Spanish', 'Italian'],
    departureTimes: ['09:30 AM', '11:00 AM', '02:30 PM'],
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    description: 'Exclusive skip-the-line access to the subterranean dungeons, gladiator arena floor, and 1st/2nd tiers.'
  },
  {
    id: 'tour-2',
    title: 'Vatican Museums, Sistine Chapel & St. Peter’s Basilica',
    shortCode: 'VAT-VIP',
    category: 'Art & Heritage',
    duration: '3.5 hours',
    meetingPoint: 'Caffè Vaticano, Viale Vaticano 100',
    meetingPointDetails: 'Opposite the Vatican Museums entrance. Guide holds official badge #849.',
    meetingPointMapUrl: 'https://maps.google.com/?q=Viale+Vaticano+100+Rome',
    maxCapacity: 20,
    pricePerPerson: 89,
    languages: ['English', 'French', 'German', 'Italian'],
    departureTimes: ['08:45 AM', '01:30 PM'],
    image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80',
    description: 'Immersive guided journey through the Gallery of Maps, Raphael Rooms, Michelangelo’s Sistine frescoes, and St. Peter’s.'
  },
  {
    id: 'tour-3',
    title: 'Trastevere Twilight Sunset Food & Wine Tasting',
    shortCode: 'TRAST-FOOD',
    category: 'Food, Wine & Culture',
    duration: '3.0 hours',
    meetingPoint: 'Piazza Santa Maria in Trastevere, by the fountain',
    meetingPointDetails: 'Guide wearing green apron with TourMan logo beside the central stone fountain.',
    meetingPointMapUrl: 'https://maps.google.com/?q=Piazza+Santa+Maria+in+Trastevere+Rome',
    maxCapacity: 14,
    pricePerPerson: 68,
    languages: ['English', 'Italian'],
    departureTimes: ['05:30 PM', '06:30 PM'],
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    description: '7 authentic culinary stops: fresh supplì, artisanal pecorino & prosciutto, homemade cacio e pepe pasta, organic Chianti wine, and gourmet gelato.'
  },
  {
    id: 'tour-4',
    title: 'Rome by Night Electric Bike & Panoramic Belvedere',
    shortCode: 'ROME-BIKE',
    category: 'Active & Panoramic',
    duration: '2.5 hours',
    meetingPoint: 'Via del Colosseo 31 (Bike Depot)',
    meetingPointDetails: 'Inside the courtyard. Helmets and Bosch e-bikes provided.',
    meetingPointMapUrl: 'https://maps.google.com/?q=Via+del+Colosseo+31+Rome',
    maxCapacity: 12,
    pricePerPerson: 55,
    languages: ['English', 'German'],
    departureTimes: ['07:00 PM'],
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&q=80',
    description: 'Effortless evening ride past the Trevi Fountain, Pantheon, and up to the Aventine Hill Orange Garden for sunset.'
  },
  {
    id: 'tour-5',
    title: 'Tuscan Hill Towns & Chianti Winery Day Excursion',
    shortCode: 'TUSC-DAY',
    category: 'Full-Day Excursion',
    duration: '9.0 hours',
    meetingPoint: 'Piazza dei Cinquecento (Termini Station, taxi stand)',
    meetingPointDetails: 'Mercedes Luxury Minivan waiting with driver Roberto.',
    meetingPointMapUrl: 'https://maps.google.com/?q=Piazza+dei+Cinquecento+Rome',
    maxCapacity: 16,
    pricePerPerson: 145,
    languages: ['English'],
    departureTimes: ['07:30 AM'],
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    description: 'Day trip to Montepulciano, Pienza, and private biodynamic estate cellar tour with 5 wine pairings and pecorino cheese luncheon.'
  },
  {
    id: 'tour-catacombs',
    title: 'Catacombs, Roman Crypts & Appian Way Subterranean Secrets',
    shortCode: 'CATA-CRYPTS',
    category: 'Subterranean & Catacombs',
    duration: '3.5 hours',
    meetingPoint: 'Piazza Barberini (Triton Fountain)',
    meetingPointDetails: 'Guide Alain holding Rome With Mike Catacombs clipboard near Triton Fountain.',
    meetingPointMapUrl: 'https://maps.google.com/?q=Piazza+Barberini+Rome',
    maxCapacity: 18,
    pricePerPerson: 75,
    languages: ['English'],
    departureTimes: ['10:00 AM', '02:00 PM'],
    image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80',
    description: 'Explore the ancient subterranean labyrinth of San Callisto Catacombs, Roman aqueducts, and Capuchin Crypts.'
  }
];

export const MOCK_GUIDES: Guide[] = [
  {
    id: 'guide-1',
    name: 'Marco Rossi',
    role: 'Lead Archaeologist & Historian',
    email: 'marco.rossi@tourman-guide.it',
    phone: '+39 347 182 9941',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    languages: ['English', 'Italian', 'French'],
    rating: 4.98,
    reviewCount: 482,
    totalTours: 1420,
    licenseNumber: 'RM-LIC-049281',
    baseRatePerTour: 95,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    status: 'available',
    bio: 'Licensed Roman guide for 12 years with a degree in classical archaeology from La Sapienza. Passionate about bringing the Colosseum to life.'
  },
  {
    id: 'guide-2',
    name: 'Elena Bianchi',
    role: 'Vatican & Art Specialist',
    email: 'elena.bianchi@tourman-guide.it',
    phone: '+39 349 823 1102',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    languages: ['English', 'Italian', 'Spanish'],
    rating: 4.97,
    reviewCount: 394,
    totalTours: 980,
    licenseNumber: 'RM-LIC-088192',
    baseRatePerTour: 105,
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    status: 'on_tour',
    bio: 'Art historian trained at the Vatican Museums. Fluent in English, Spanish, and Italian. Known for engaging storytelling with families.'
  },
  {
    id: 'guide-3',
    name: 'Matteo Romano',
    role: 'Certified Sommelier & Gastronome',
    email: 'matteo.romano@tourman-guide.it',
    phone: '+39 338 901 4455',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    languages: ['English', 'Italian'],
    rating: 4.96,
    reviewCount: 260,
    totalTours: 640,
    licenseNumber: 'RM-SOM-1920',
    baseRatePerTour: 85,
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    status: 'available',
    bio: 'Level 3 AIS Sommelier born in Trastevere. Knows every hidden salumeria and historic family tavern owner in the neighborhood.'
  },
  {
    id: 'guide-4',
    name: 'Sophie Dubois',
    role: 'Multi-Lingual Culture Guide',
    email: 'sophie.dubois@tourman-guide.it',
    phone: '+39 340 776 2289',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    languages: ['French', 'English', 'Italian'],
    rating: 4.99,
    reviewCount: 310,
    totalTours: 820,
    licenseNumber: 'RM-LIC-039101',
    baseRatePerTour: 100,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat', 'Sun'],
    status: 'available',
    bio: 'Parisian-born Roman resident for 15 years. Specializes in VIP private tours and international delegations with 5-star acclaim.'
  },
  {
    id: 'guide-5',
    name: 'Luca Moretti',
    role: 'Outdoor Lead & E-Bike Specialist',
    email: 'luca.moretti@tourman-guide.it',
    phone: '+39 342 551 8830',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
    languages: ['English', 'Italian', 'German'],
    rating: 4.93,
    reviewCount: 185,
    totalTours: 490,
    licenseNumber: 'RM-LIC-077412',
    baseRatePerTour: 80,
    availableDays: ['Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    status: 'available',
    bio: 'Certified cycling guide and first-responder certified. Loves navigating Rome’s ancient alleys and panoramic sunset hilltops safely.'
  },
  {
    id: 'usr_alain_piredda',
    name: 'Alain Piredda',
    role: 'Catacombs & Subterranean Rome Specialist',
    email: 'alain@romewithmike.com',
    phone: '+39 347 112 3344',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    languages: ['English', 'Italian'],
    rating: 4.99,
    reviewCount: 340,
    totalTours: 780,
    licenseNumber: 'RM-LIC-049281',
    baseRatePerTour: 90,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'available',
    bio: 'Senior guide for Rome With Mike specializing in Catacombs, Hidden Rome, and Bones Express routes.'
  },
  {
    id: 'usr_amanda_karr',
    name: 'Amanda Karr',
    role: 'Art History & Food Tour Guide',
    email: 'amanda@romewithmike.com',
    phone: '+39 340 998 8776',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    languages: ['English', 'Italian', 'Spanish'],
    rating: 4.98,
    reviewCount: 295,
    totalTours: 610,
    licenseNumber: 'RM-LIC-088192',
    baseRatePerTour: 95,
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    status: 'available',
    bio: 'Enthusiastic food and cultural historian leading Eat Like the Romans Food Tours and Roman Landmarks.'
  },
  {
    id: 'usr_divan_hattingh',
    name: 'Divan Hattingh',
    role: 'Ostia & Combo Tours Specialist',
    email: 'divan@romewithmike.com',
    phone: '+39 338 445 5667',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    languages: ['English', 'Afrikaans', 'Italian'],
    rating: 4.97,
    reviewCount: 215,
    totalTours: 520,
    licenseNumber: 'RM-LIC-091100',
    baseRatePerTour: 95,
    availableDays: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    status: 'available',
    bio: 'Archaeologist known for the Divan/Mike Combo and Ostia Antica expeditions.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-101',
    reference: 'GYG-994821',
    source: 'getyourguide',
    customerName: 'James & Sarah Miller',
    customerEmail: 'james.miller92@gmail.com',
    customerPhone: '+1 415 882 9104',
    tourId: 'tour-1',
    tourTitle: 'Colosseum Underground & Arena Floor VIP Access',
    date: '2026-10-28',
    time: '09:30 AM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'English',
    amount: 158,
    currency: 'EUR',
    status: 'checked_in',
    paymentStatus: 'paid',
    specialRequirements: 'Anniversary trip, requested arena floor photo',
    guideId: 'guide-1',
    checkInTime: '09:18 AM',
    notes: 'Arrived early at Constantine Arch. Friendly couple from San Francisco.',
    createdAt: '2026-10-25T14:20:00Z'
  },
  {
    id: 'b-102',
    reference: 'VIA-784102',
    source: 'viator',
    customerName: 'Liam O’Connor',
    customerEmail: 'loconnor.dublin@outlook.ie',
    customerPhone: '+353 87 291 0441',
    tourId: 'tour-1',
    tourTitle: 'Colosseum Underground & Arena Floor VIP Access',
    date: '2026-10-28',
    time: '09:30 AM',
    pax: 3,
    adults: 2,
    children: 1,
    language: 'English',
    amount: 237,
    currency: 'EUR',
    status: 'checked_in',
    paymentStatus: 'paid',
    specialRequirements: '10 year old boy interested in Roman shields',
    guideId: 'guide-1',
    checkInTime: '09:22 AM',
    notes: 'Checked in by guide Marco.',
    createdAt: '2026-10-26T09:12:00Z'
  },
  {
    id: 'b-103',
    reference: 'AIR-330192',
    source: 'airbnb',
    customerName: 'Hiroshi & Aoi Tanaka',
    customerEmail: 'htanaka.tokyo@yahoo.co.jp',
    customerPhone: '+81 90 4491 8821',
    tourId: 'tour-1',
    tourTitle: 'Colosseum Underground & Arena Floor VIP Access',
    date: '2026-10-28',
    time: '09:30 AM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'English',
    amount: 158,
    currency: 'EUR',
    status: 'checked_in',
    paymentStatus: 'paid',
    guideId: 'guide-1',
    checkInTime: '09:25 AM',
    createdAt: '2026-10-24T18:40:00Z'
  },
  {
    id: 'b-104',
    reference: 'GW-661029',
    source: 'guruwalk',
    customerName: 'Sofia Morales',
    customerEmail: 'sofia.morales@terra.es',
    customerPhone: '+34 612 904 883',
    tourId: 'tour-1',
    tourTitle: 'Colosseum Underground & Arena Floor VIP Access',
    date: '2026-10-28',
    time: '09:30 AM',
    pax: 1,
    adults: 1,
    children: 0,
    language: 'Spanish',
    amount: 79,
    currency: 'EUR',
    status: 'confirmed',
    paymentStatus: 'paid',
    guideId: 'guide-1',
    notes: 'Messaged on WhatsApp: running 4 minutes behind due to Colosseo metro crowds.',
    createdAt: '2026-10-27T11:05:00Z'
  },
  {
    id: 'b-105',
    reference: 'DIR-88201',
    source: 'direct',
    customerName: 'David & Emma Watson',
    customerEmail: 'dwatson.uk@btinternet.com',
    customerPhone: '+44 7700 900821',
    tourId: 'tour-1',
    tourTitle: 'Colosseum Underground & Arena Floor VIP Access',
    date: '2026-10-28',
    time: '09:30 AM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'English',
    amount: 158,
    currency: 'EUR',
    status: 'checked_in',
    paymentStatus: 'paid',
    specialRequirements: 'Saved 20% by booking directly on website',
    guideId: 'guide-1',
    checkInTime: '09:15 AM',
    createdAt: '2026-10-23T16:15:00Z'
  },
  {
    id: 'b-106',
    reference: 'GYG-995104',
    source: 'getyourguide',
    customerName: 'François Dupont',
    customerEmail: 'fdupont.lyon@free.fr',
    customerPhone: '+33 6 49 10 28 33',
    tourId: 'tour-2',
    tourTitle: 'Vatican Museums, Sistine Chapel & St. Peter’s Basilica',
    date: '2026-10-28',
    time: '08:45 AM',
    pax: 4,
    adults: 3,
    children: 1,
    language: 'French',
    amount: 356,
    currency: 'EUR',
    status: 'checked_in',
    paymentStatus: 'paid',
    guideId: 'guide-4',
    checkInTime: '08:35 AM',
    notes: 'French group conducted by guide Sophie.',
    createdAt: '2026-10-26T20:10:00Z'
  },
  {
    id: 'b-107',
    reference: 'VIA-882194',
    source: 'viator',
    customerName: 'Klaus & Helga Weber',
    customerEmail: 'klaus.weber.muc@gmx.de',
    customerPhone: '+49 171 8820194',
    tourId: 'tour-2',
    tourTitle: 'Vatican Museums, Sistine Chapel & St. Peter’s Basilica',
    date: '2026-10-28',
    time: '08:45 AM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'German',
    amount: 178,
    currency: 'EUR',
    status: 'checked_in',
    paymentStatus: 'paid',
    guideId: 'guide-2',
    checkInTime: '08:40 AM',
    createdAt: '2026-10-25T11:22:00Z'
  },
  {
    id: 'b-108',
    reference: 'EXP-491028',
    source: 'expedia',
    customerName: 'Arthur Pendelton',
    customerEmail: 'apendelton.boston@gmail.com',
    customerPhone: '+1 617 992 1450',
    tourId: 'tour-2',
    tourTitle: 'Vatican Museums, Sistine Chapel & St. Peter’s Basilica',
    date: '2026-10-28',
    time: '08:45 AM',
    pax: 1,
    adults: 1,
    children: 0,
    language: 'English',
    amount: 89,
    currency: 'EUR',
    status: 'no_show',
    paymentStatus: 'paid',
    notes: 'Did not answer phone call or WhatsApp message at 08:50 AM.',
    createdAt: '2026-10-27T08:14:00Z'
  },
  {
    id: 'b-109',
    reference: 'AIR-441920',
    source: 'airbnb',
    customerName: 'Matteo & Giulia Rossi',
    customerEmail: 'giulia.rossi.milano@gmail.com',
    customerPhone: '+39 347 992 1044',
    tourId: 'tour-3',
    tourTitle: 'Trastevere Twilight Sunset Food & Wine Tasting',
    date: '2026-10-28',
    time: '05:30 PM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'Italian',
    amount: 136,
    currency: 'EUR',
    status: 'confirmed',
    paymentStatus: 'paid',
    specialRequirements: 'Vegetarian tasting options requested for Giulia',
    guideId: 'guide-3',
    createdAt: '2026-10-26T15:30:00Z'
  },
  {
    id: 'b-110',
    reference: 'GYG-998822',
    source: 'getyourguide',
    customerName: 'Alexander Hamilton & Guest',
    customerEmail: 'ahamilton.ny@law.columbia.edu',
    customerPhone: '+1 212 994 0012',
    tourId: 'tour-3',
    tourTitle: 'Trastevere Twilight Sunset Food & Wine Tasting',
    date: '2026-10-28',
    time: '05:30 PM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'English',
    amount: 136,
    currency: 'EUR',
    status: 'confirmed',
    paymentStatus: 'paid',
    guideId: 'guide-3',
    createdAt: '2026-10-27T17:45:00Z'
  },
  {
    id: 'b-111',
    reference: 'BOK-110293',
    source: 'bokun',
    customerName: 'Carlos & Mariana Mendoza',
    customerEmail: 'cmendoza.bogota@correo.com',
    customerPhone: '+57 310 882 1944',
    tourId: 'tour-4',
    tourTitle: 'Rome by Night Electric Bike & Panoramic Belvedere',
    date: '2026-10-28',
    time: '07:00 PM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'English',
    amount: 110,
    currency: 'EUR',
    status: 'confirmed',
    paymentStatus: 'paid',
    guideId: 'guide-5',
    createdAt: '2026-10-27T19:00:00Z'
  },
  {
    id: 'b-112',
    reference: 'VIA-994411',
    source: 'viator',
    customerName: 'Marcus & Anna Lindqvist',
    customerEmail: 'lindqvist.marcus@telia.se',
    customerPhone: '+46 70 812 9401',
    tourId: 'tour-4',
    tourTitle: 'Rome by Night Electric Bike & Panoramic Belvedere',
    date: '2026-10-28',
    time: '07:00 PM',
    pax: 4,
    adults: 4,
    children: 0,
    language: 'English',
    amount: 220,
    currency: 'EUR',
    status: 'confirmed',
    paymentStatus: 'paid',
    guideId: 'guide-5',
    specialRequirements: 'Need 2 tall bike frames (185cm+)',
    createdAt: '2026-10-26T12:00:00Z'
  },
  {
    id: 'b-113',
    reference: 'RWM-CATA-01',
    source: 'direct',
    customerName: 'Robert & Clara Sterling',
    customerEmail: 'rsterling@chicago.law',
    customerPhone: '+1 312 990 4410',
    tourId: 'tour-catacombs',
    tourTitle: 'Catacombs, Roman Crypts & Appian Way Subterranean Secrets',
    date: '2026-10-28',
    time: '10:00 AM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'English',
    amount: 150,
    currency: 'EUR',
    status: 'checked_in',
    paymentStatus: 'paid',
    guideId: 'usr_alain_piredda',
    checkInTime: '09:48 AM',
    specialRequirements: 'Direct Rome With Mike reservation. Met at Triton fountain.',
    notes: 'Guests very interested in early Christian iconography.',
    createdAt: '2026-10-26T10:00:00Z'
  },
  {
    id: 'b-114',
    reference: 'GYG-998811',
    source: 'getyourguide',
    customerName: 'Ethan & Maya Hawke-Ward',
    customerEmail: 'm.hawkeward@gmail.com',
    customerPhone: '+44 7911 123456',
    tourId: 'tour-catacombs',
    tourTitle: 'Catacombs, Roman Crypts & Appian Way Subterranean Secrets',
    date: '2026-10-28',
    time: '10:00 AM',
    pax: 3,
    adults: 2,
    children: 1,
    language: 'English',
    amount: 225,
    currency: 'EUR',
    status: 'confirmed',
    paymentStatus: 'paid',
    guideId: 'usr_alain_piredda',
    specialRequirements: '12 year old boy loves Roman archaeology',
    createdAt: '2026-10-27T08:30:00Z'
  },
  {
    id: 'b-115',
    reference: 'VIA-991144',
    source: 'viator',
    customerName: 'Lucas & Mia Jansen',
    customerEmail: 'l.jansen@amsterdam.nl',
    customerPhone: '+31 6 1234 5678',
    tourId: 'tour-catacombs',
    tourTitle: 'Catacombs, Roman Crypts & Appian Way Subterranean Secrets',
    date: '2026-10-28',
    time: '10:00 AM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'English',
    amount: 150,
    currency: 'EUR',
    status: 'confirmed',
    paymentStatus: 'paid',
    guideId: 'usr_alain_piredda',
    createdAt: '2026-10-27T09:15:00Z'
  },
  {
    id: 'b-116',
    reference: 'AIR-882200',
    source: 'airbnb',
    customerName: 'Isabella & Mateo Gomez',
    customerEmail: 'igomez@madrid.es',
    customerPhone: '+34 655 432 109',
    tourId: 'tour-3',
    tourTitle: 'Trastevere Twilight Sunset Food & Wine Tasting',
    date: '2026-10-28',
    time: '05:30 PM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'Spanish',
    amount: 136,
    currency: 'EUR',
    status: 'confirmed',
    paymentStatus: 'paid',
    guideId: 'usr_amanda_karr',
    specialRequirements: 'Celiac traveler — gluten free tastings coordinated with Amanda',
    createdAt: '2026-10-26T14:10:00Z'
  },
  {
    id: 'b-117',
    reference: 'EXP-992211',
    source: 'expedia',
    customerName: 'Hans & Gretel Schmidt',
    customerEmail: 'schmidt.hans@berlin.de',
    customerPhone: '+49 170 9988776',
    tourId: 'tour-5',
    tourTitle: 'Tuscan Hill Towns & Chianti Winery Day Excursion',
    date: '2026-10-28',
    time: '07:30 AM',
    pax: 2,
    adults: 2,
    children: 0,
    language: 'English',
    amount: 290,
    currency: 'EUR',
    status: 'checked_in',
    paymentStatus: 'paid',
    guideId: 'usr_divan_hattingh',
    checkInTime: '07:18 AM',
    createdAt: '2026-10-25T16:00:00Z'
  }
];

export const MOCK_CHANNELS: ChannelConnection[] = [
  {
    id: 'viator',
    name: 'Viator / TripAdvisor',
    logo: '🟢',
    color: '#00aa6c',
    status: 'connected',
    lastSync: '2 minutes ago',
    syncMethod: 'Email Forwarding',
    activeBookingsCount: 38,
    forwardingAddress: 'sync-viator@romewithmike.tourman.app'
  },
  {
    id: 'getyourguide',
    name: 'GetYourGuide',
    logo: '🟠',
    color: '#ff5533',
    status: 'connected',
    lastSync: 'Just now',
    syncMethod: 'Email Forwarding',
    activeBookingsCount: 44,
    forwardingAddress: 'sync-gyg@romewithmike.tourman.app'
  },
  {
    id: 'airbnb',
    name: 'Airbnb Experiences',
    logo: '🔴',
    color: '#ff385c',
    status: 'connected',
    lastSync: '14 minutes ago',
    syncMethod: 'Email Forwarding',
    activeBookingsCount: 19,
    forwardingAddress: 'sync-airbnb@romewithmike.tourman.app'
  },
  {
    id: 'guruwalk',
    name: 'GuruWalk',
    logo: '🟡',
    color: '#f59e0b',
    status: 'connected',
    lastSync: '32 minutes ago',
    syncMethod: 'Email Forwarding',
    activeBookingsCount: 11,
    forwardingAddress: 'sync-guruwalk@romewithmike.tourman.app'
  },
  {
    id: 'expedia',
    name: 'Expedia Local Expert',
    logo: '🔵',
    color: '#00355f',
    status: 'connected',
    lastSync: '1 hour ago',
    syncMethod: 'Direct API',
    activeBookingsCount: 15
  },
  {
    id: 'bokun',
    name: 'Bókun / Direct Engine',
    logo: '🟣',
    color: '#7c3aed',
    status: 'connected',
    lastSync: '5 minutes ago',
    syncMethod: 'iCal / Webhook',
    activeBookingsCount: 22
  },
  {
    id: 'direct',
    name: 'Rome With Mike Direct Engine',
    logo: '⭐',
    color: '#2563eb',
    status: 'connected',
    lastSync: 'Instant Real-time',
    syncMethod: 'Direct API',
    activeBookingsCount: 29
  }
];

export const MOCK_CHATS: ConciergeChat[] = [
  {
    id: 'chat-1',
    guestName: 'James Miller',
    guestPhone: '+1 415 882 9104',
    tourTitle: 'Colosseum Underground VIP',
    bookingRef: 'GYG-994821',
    lastMessage: 'Awesome! We see Marco right next to the Arch with the flag!',
    timestamp: '09:20 AM',
    unread: false,
    status: 'ai_handled',
    messages: [
      {
        id: 'm-1',
        sender: 'guest',
        text: 'Hi! We just arrived at Colosseo Metro station. Where is the meeting point exactly?',
        time: '09:12 AM'
      },
      {
        id: 'm-2',
        sender: 'ai',
        text: 'Buongiorno James! 🏛️ Welcome to Rome! Exit the metro and walk 50 meters toward the Arch of Constantine (North face). Guide Marco is holding our navy blue TourMan / Roma Imperial flag. Here is your direct Google Maps pin: https://maps.google.com/?q=Arch+of+Constantine+Rome',
        time: '09:12 AM',
        meta: 'AI Concierge (Auto-matched booking GYG-994821)'
      },
      {
        id: 'm-3',
        sender: 'guest',
        text: 'Awesome! We see Marco right next to the Arch with the flag!',
        time: '09:14 AM'
      },
      {
        id: 'm-4',
        sender: 'ai',
        text: 'Fantastic! Marco has your headsets ready. Enjoy this once-in-a-lifetime tour of the arena! 🌟',
        time: '09:15 AM'
      }
    ]
  },
  {
    id: 'chat-2',
    guestName: 'François Dupont',
    guestPhone: '+33 6 49 10 28 33',
    tourTitle: 'Vatican Museums & Sistine',
    bookingRef: 'GYG-995104',
    lastMessage: 'Merci beaucoup! Nous arrivons avec la poussette pliable.',
    timestamp: '08:24 AM',
    unread: false,
    status: 'ai_handled',
    messages: [
      {
        id: 'm-5',
        sender: 'guest',
        text: 'Bonjour, est-ce que nous pouvons apporter notre poussette pliable dans les musées du Vatican ?',
        time: '08:20 AM'
      },
      {
        id: 'm-6',
        sender: 'ai',
        text: 'Bonjour François ! Oui, les poussettes sont autorisées dans les musées du Vatican. Cependant, pour la Chapelle Sixtine et la Basilique, la guide Sophie vous guidera vers la consigne gratuite officielle avant d\'entrer. À tout de suite au Caffè Vaticano ! ☕',
        time: '08:21 AM',
        meta: 'AI Concierge (French Language Detected)'
      },
      {
        id: 'm-7',
        sender: 'guest',
        text: 'Merci beaucoup ! Nous arrivons avec la poussette pliable.',
        time: '08:23 AM'
      }
    ]
  },
  {
    id: 'chat-3',
    guestName: 'Giulia Rossi',
    guestPhone: '+39 347 992 1044',
    tourTitle: 'Trastevere Sunset Food Tour',
    bookingRef: 'AIR-441920',
    lastMessage: 'Perfetto, confermato menu 100% vegetariano per me!',
    timestamp: 'Yesterday',
    unread: false,
    status: 'resolved',
    messages: [
      {
        id: 'm-8',
        sender: 'guest',
        text: 'Ciao! Ho prenotato per stasera. Volevo assicurarmi che il supplì e la pasta abbiano un\'opzione vegetariana.',
        time: 'Yesterday 16:10'
      },
      {
        id: 'm-9',
        sender: 'ai',
        text: 'Ciao Giulia! Assolutamente sì 🌱 Matteo, il nostro sommelier e guida gastronomica, ha già avvisato le nostre 7 osterie partner di Trastevere: avrai supplì ai formaggi freschi e pasta cacio e pepe tradizionale senza carne. Ci vediamo alle 17:30 alla fontana!',
        time: 'Yesterday 16:11',
        meta: 'AI Concierge (Dietary Flag Saved to Manifest)'
      },
      {
        id: 'm-10',
        sender: 'guest',
        text: 'Perfetto, confermato menu 100% vegetariano per me!',
        time: 'Yesterday 16:14'
      }
    ]
  }
];

export const RAW_EMAIL_SAMPLES = {
  getyourguide: `From: bookings@getyourguide.com
Subject: New Booking Confirmed: Colosseum Underground & Arena Floor VIP Access (GYG-771920)
Date: Wed, 28 Oct 2026 07:15:30 +0200
To: sync-gyg@roma-imperial.tourman.app

Dear Roma Imperial Tours,

You have received a new booking from GetYourGuide!

Booking Reference: GYG-771920
Activity: Colosseum Underground & Arena Floor VIP Access
Option: English Tour (Subterranean & Arena)
Date: 28 October 2026
Time: 11:00 AM
Lead Customer: Sarah Jenkins
Customer Email: s.jenkins@cambridge.ac.uk
Customer Mobile: +44 7911 123456
Number of Participants: 2 Adults
Total Payout: 142.20 EUR (Gross: 158.00 EUR - Commission: 15.80 EUR)
Meeting Point: Arch of Constantine, Rome

Special requests: None. Customer selected English language audio device.`,

  viator: `From: automation@viator.com
Subject: Confirmed Booking Notification - BR-90218844 - Vatican Museums & Sistine
Date: Wed, 28 Oct 2026 06:40:12 +0200
To: sync-viator@roma-imperial.tourman.app

BOOKING DETAILS - VIATOR & TRIPADVISOR

Booking Reference: VIA-90218844
Product Title: Vatican Museums, Sistine Chapel & St. Peter's Basilica VIP
Travel Date: 28-Oct-2026
Departure Time: 01:30 PM
Lead Traveler: Michael Chang
Contact: mchang.bayarea@gmail.com / +1 (408) 555-0199
Pax Count: 3 Travelers (2 Adults, 1 Youth)
Language: English
Total Paid by Guest: 267.00 EUR
Tour Operator Net Settlement: 213.60 EUR
Meeting Location: Caffè Vaticano, Viale Vaticano 100, Rome`,

  airbnb: `From: automated@airbnb.com
Subject: Reservation Confirmed for Trastevere Twilight Sunset Food & Wine Tasting
Date: Tue, 27 Oct 2026 21:05:00 +0200
To: sync-airbnb@roma-imperial.tourman.app

Airbnb Experience Reservation:
Confirmation Code: AIR-883901
Experience: Trastevere Twilight Sunset Food & Wine Tasting
Host: Roma Imperial Tours
Date: Wednesday, October 28, 2026
Time: 5:30 PM CEST
Guest: Charlotte Dupont
Guests: 2 Guests
Total Host Payout: 136.00 EUR
Guest Phone: +33 6 12 34 56 78
Dietary info from guest: "No shellfish please, excited for Italian red wines!"`
};
