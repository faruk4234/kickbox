export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

export interface Teacher {
  id: number;
  name: string;
  title: string;
  media: MediaItem[];
  description: string;
  specialties: string[];
  achievements?: string[];
  experience?: string;
  education?: string;
  gallery?: MediaItem[];
} 