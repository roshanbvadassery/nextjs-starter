export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  plusOnes: number;
  registeredAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Guestlist {
  id: string;
  name: string;
  eventName: string;
  eventDate: string;
  venue: string;
  description?: string;
  maxGuests?: number;
  createdBy: string;
  createdAt: string;
  guests: Guest[];
  isActive: boolean;
}

export interface Organizer {
  id: string;
  name: string;
  email: string;
  phone?: string;
} 