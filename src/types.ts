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

export type Screen = 'splash' | 'auth' | 'search' | 'results' | 'details' | 'payment' | 'confirmation' | 'history' | 'profile' | 'alerts';
