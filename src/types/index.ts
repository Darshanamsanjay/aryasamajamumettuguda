export interface Branch {
  id: string;
  slug: string;
  name: string;
  address: string;
  mapEmbedUrl: string;
  callPhone: string;
  whatsappPhone: string;
  email: string;
  officeHours: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  overview: string;
  eligibility: string; // Split by newline in display
  documents: string;   // Split by newline in display
  benefits: string;    // Split by newline in display
  steps: string;       // Split by newline in display
  price?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Slot {
  id: string;
  branchSlug: string;
  date: string;
  time: string;
  available: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Booking {
  id: string;
  bookingCode: string;
  branchSlug: string;
  marriageType: string;
  date: string;
  timeSlot: string;
  brideName: string;
  groomName: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  guestCount: number;
  documentUrl?: string | null;
  specialNotes?: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  paymentId?: string | null;
  invoiceId?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  googleVerified: boolean;
  createdAt?: string | Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  createdAt?: string | Date;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  createdAt?: string | Date;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchSlug?: string | null;
  message: string;
  status: 'PENDING' | 'RESOLVED';
  createdAt?: string | Date;
}
