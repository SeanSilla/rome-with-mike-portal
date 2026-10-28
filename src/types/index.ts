export type OTASource = 
  | 'getyourguide' 
  | 'viator' 
  | 'airbnb' 
  | 'guruwalk' 
  | 'expedia' 
  | 'bokun' 
  | 'direct';

export type BookingStatus = 'confirmed' | 'checked_in' | 'no_show' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface Booking {
  id: string;
  reference: string;
  source: OTASource;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourId: string;
  tourTitle: string;
  date: string;
  time: string;
  pax: number;
  adults: number;
  children: number;
  language: string;
  amount: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequirements?: string;
  pickupLocation?: string;
  guideId?: string;
  checkInTime?: string;
  notes?: string;
  createdAt: string;
}

export interface Tour {
  id: string;
  title: string;
  shortCode: string;
  category: string;
  duration: string;
  meetingPoint: string;
  meetingPointDetails: string;
  meetingPointMapUrl: string;
  maxCapacity: number;
  pricePerPerson: number;
  languages: string[];
  departureTimes: string[];
  image: string;
  description: string;
}

export interface Guide {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  totalTours: number;
  licenseNumber: string;
  baseRatePerTour: number;
  availableDays: string[];
  status: 'available' | 'on_tour' | 'off_duty';
  bio: string;
}

export interface ShiftAssignment {
  id: string;
  tourId: string;
  guideId: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending_guide' | 'completed' | 'cancelled';
  payoutAmount: number;
}

export interface ConciergeChat {
  id: string;
  guestName: string;
  guestPhone: string;
  tourTitle: string;
  bookingRef: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  status: 'ai_handled' | 'needs_operator' | 'resolved';
  messages: {
    id: string;
    sender: 'guest' | 'ai' | 'operator';
    text: string;
    time: string;
    meta?: string;
  }[];
}

export interface ChannelConnection {
  id: OTASource;
  name: string;
  logo: string;
  color: string;
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSync: string;
  syncMethod: 'Email Forwarding' | 'Direct API' | 'iCal / Webhook';
  activeBookingsCount: number;
  forwardingAddress?: string;
}
