export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface GalleryItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

export interface Student {
  id: number;
  name: string;
  title: string;
  purpose: string;
  startYear: number;
  experience: string;
  success: string;
  specialties: string[];
  media: MediaItem[];
  bio: string;
  achievements: string[];
  gallery: GalleryItem[];
} 