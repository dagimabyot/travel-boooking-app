export interface User {
  id: number;
  email: string;
  name: string;
  frequent_flyer_no?: string;
  saved_payment_methods?: string;
}

export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  duration: string;
  class: string;
}

export interface Booking {
  id: number;
  user_id: number;
  flight_id: string;
  from_city: string;
  to_city: string;
  departure_time: string;
  arrival_time: string;
  airline: string;
  price: number;
  status: string;
  seat: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: 'booking' | 'reminder' | 'system';
}

export interface Package {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  included: string[];
  duration: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
}

export type Screen = 
  | 'splash' 
  | 'auth-welcome' | 'auth-email' | 'auth-password' | 'auth-signup' | 'auth-forgot' | 'auth-verify' 
  | 'home' | 'packages' | 'package-details' | 'flight-search' | 'flight-results' | 'flight-details' 
  | 'hotel-search' | 'hotel-results' | 'hotel-details' 
  | 'seat-selection' | 'check-availability' | 'payment' | 'confirmation' | 'ticket'
  | 'my-trips' | 'saved' | 'profile' | 'settings' | 'alerts';
