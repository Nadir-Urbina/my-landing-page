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

export interface Ministry {
  _id: string;
  title: string;
  role: string;
  description: string;
  icon: string;
  imageUrl?: string;
  learnMoreLink: string;
  order: number;
  registrationBadge?: {
    isActive: boolean;
    text: string;
  };
}

export interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  imageUrl: string
  mainImage?: {
    asset: {
      _ref: string
      _type: "reference"
    }
  }
  body?: any
}

export interface CalendarEvent {
  _id: string
  title: string
  startDate: string
  endDate?: string
  location: string
  description?: string
  eventType?: string
  registrationLink?: string
  image?: any
}

export interface HealingStreamsTestimonial {
  _id: string;
  name: string;
  location?: string;
  text: string;
  date?: string;
  imageUrl?: string;
  healingType?: 'physical' | 'emotional' | 'spiritual' | 'mental' | 'other';
}

export interface HealingStreamsEvent {
  _id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  imageUrl?: any;
  registrationLink?: string;
}

export interface Instructor {
  _id: string;
  name: string;
  title: string;
  image?: any;
  imageUrl?: string;
  bio?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructors: Instructor[] | string[];
  image?: any;
  imageUrl?: string;
  isAvailable: boolean;
  order: number;
  registrationLink?: string;
  startDate?: string;
  duration?: string;
}

export interface InterestForm {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  interests: string[];
  submittedAt: string;
  mailchimpStatus: 'pending' | 'subscribed' | 'failed';
  statusNotes?: string;
} 