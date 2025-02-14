export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
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
} 