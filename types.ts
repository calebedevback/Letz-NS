export interface User {
  uid: string;
  name: string;
  photoURL: string;
  friends: string[]; // Array of friend UIDs
  checkIn?: string; // Place ID
}

export enum PlaceType {
  CLUB = 'Balada',
  BAR = 'Bar',
  AFTER = 'After',
  PUB = 'Pub',
  OUTDOOR = 'Ao Ar Livre'
}

export interface Place {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  photo: string;
  type: PlaceType;
  vibeTags: string[];
  currentCount: number;
  friendCount: number;
  trending: boolean;
  growthRate?: number; // For "Exploding now" logic
}

export interface CheckIn {
  userId: string;
  placeId: string;
  timestamp: number;
}

export interface NavItem {
  label: string;
  icon: any;
  path: string;
}