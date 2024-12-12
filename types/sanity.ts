export interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  text: string;
  imageUrl?: string;
}

export interface Event {
  _id: string;
  title: string;
  date?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  learnMoreLink?: string;
  registrationLink?: string;
}

export interface Book {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

export interface Mission {
  _id: string;
  title: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  imageUrl?: string;
  cost?: number;
  status?: 'planning' | 'open' | 'full' | 'completed';
  registrationLink?: string;
} 