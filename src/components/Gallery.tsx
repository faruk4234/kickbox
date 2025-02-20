import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export const galleryItems: GalleryItem[] = [
  // Grup Antrenmanı Category (5 items)
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed',
    title: 'Grup Antrenmanı',
    description: 'Haftalık grup antrenmanlarımızda sporcularımız teknik ve kondisyon çalışmaları yapıyor.',
    date: '15.03.2024',
    category: 'grup-antrenmani'
  },
  {
    id: 2,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
    title: 'Grup Antrenmanı Videosu',
    description: 'Muammer Hoca eşliğinde ileri seviye teknik antrenman seansı.',
    date: '12.03.2024',
    category: 'grup-antrenmani'
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    title: 'Sabah Antrenmanı',
    description: 'Sabah erken saatlerde yapılan grup antrenmanımızdan kareler.',
    date: '10.03.2024',
    category: 'grup-antrenmani'
  },
  {
    id: 4,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',
    title: 'Kondisyon Antrenmanı',
    description: 'Grup halinde yapılan kondisyon ve dayanıklılık çalışmaları.',
    date: '08.03.2024',
    category: 'grup-antrenmani'
  },
  {
    id: 5,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
    title: 'Teknik Antrenman',
    description: 'Grup teknik antrenman seansından özel anlar.',
    date: '05.03.2024',
    category: 'grup-antrenmani'
  },

  // Sparring Seansı Category (5 items)
  {
    id: 6,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Sparring Seansı 1',
    description: 'Yarışma hazırlık döneminde sporcularımızın sparring çalışması.',
    date: '03.03.2024',
    category: 'sparring-seansi'
  },
  {
    id: 7,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Sparring Videosu',
    description: 'Profesyonel sporcularımızın sparring antrenmanı.',
    date: '01.03.2024',
    category: 'sparring-seansi'
  },
  {
    id: 8,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
    title: 'Sparring Hazırlık',
    description: 'Sparring öncesi ısınma ve hazırlık çalışmaları.',
    date: '28.02.2024',
    category: 'sparring-seansi'
  },
  {
    id: 9,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Hafif Siklet Sparring',
    description: 'Hafif siklet sporcularımızın sparring çalışması.',
    date: '25.02.2024',
    category: 'sparring-seansi'
  },
  {
    id: 10,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Ağır Siklet Sparring',
    description: 'Ağır siklet sporcularımızın sparring seansı.',
    date: '22.02.2024',
    category: 'sparring-seansi'
  },

  // Ring Çalışması Category (5 items)
  {
    id: 11,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Ring Tekniği',
    description: 'Ring içi teknik çalışmalar ve pozisyon geliştirme.',
    date: '20.02.2024',
    category: 'ring-calismasi'
  },
  {
    id: 12,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Ring Antrenmanı',
    description: 'Ring çalışması ve kondisyon antrenmanı.',
    date: '18.02.2024',
    category: 'ring-calismasi'
  },
  {
    id: 13,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Ring Taktikleri',
    description: 'Ring içi taktik ve strateji geliştirme çalışmaları.',
    date: '15.02.2024',
    category: 'ring-calismasi'
  },
  {
    id: 14,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Ring Kondisyonu',
    description: 'Ring içi dayanıklılık ve kondisyon çalışmaları.',
    date: '12.02.2024',
    category: 'ring-calismasi'
  },
  {
    id: 15,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
    title: 'Ring Eğitimi',
    description: 'Yeni başlayan sporcular için ring eğitimi.',
    date: '10.02.2024',
    category: 'ring-calismasi'
  },

  // Şampiyon Sporcularımız Category (5 items)
  {
    id: 16,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
    title: 'Şampiyonlar',
    description: 'Kulübümüzün şampiyon sporcuları bir arada.',
    date: '08.02.2024',
    category: 'sampiyon-sporcular'
  },
  {
    id: 17,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
    title: 'Şampiyon Antrenmanı',
    description: 'Şampiyon sporcularımızın özel antrenman rutini.',
    date: '05.02.2024',
    category: 'sampiyon-sporcular'
  },
  {
    id: 18,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
    title: 'Madalya Töreni',
    description: 'Şampiyon sporcularımızın madalya töreni.',
    date: '02.02.2024',
    category: 'sampiyon-sporcular'
  },
  {
    id: 19,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
    title: 'Başarı Hikayesi',
    description: 'Şampiyon sporcumuzun başarı hikayesi.',
    date: '30.01.2024',
    category: 'sampiyon-sporcular'
  },
  {
    id: 20,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
    title: 'Şampiyon Röportajı',
    description: 'Şampiyon sporcumuzla özel röportaj.',
    date: '28.01.2024',
    category: 'sampiyon-sporcular'
  },

  // Teknik Eğitim Category (5 items)
  {
    id: 21,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
    title: 'Temel Teknikler',
    description: 'Boks sporunun temel teknikleri üzerine eğitim.',
    date: '25.01.2024',
    category: 'teknik-egitim'
  },
  {
    id: 22,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
    title: 'Ileri Teknikler',
    description: 'Ileri seviye boks teknikleri eğitimi.',
    date: '22.01.2024',
    category: 'teknik-egitim'
  },
  {
    id: 23,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
    title: 'Teknik Analiz',
    description: 'Sporcularımızın teknik analiz çalışması.',
    date: '20.01.2024',
    category: 'teknik-egitim'
  },
  {
    id: 24,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
    title: 'Özel Teknik Dersi',
    description: 'Birebir teknik eğitim seansı.',
    date: '18.01.2024',
    category: 'teknik-egitim'
  },
  {
    id: 25,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
    title: 'Teknik Geliştirme',
    description: 'Teknik geliştirme ve iyileştirme çalışmaları.',
    date: '15.01.2024',
    category: 'teknik-egitim'
  }
];

export const Gallery = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const modalImageRef = useRef<HTMLImageElement>(null);

  const galleryItems: GalleryItem[] = [
    // Grup Antrenmanı Category (5 items)
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed',
      title: 'Grup Antrenmanı',
      description: 'Haftalık grup antrenmanlarımızda sporcularımız teknik ve kondisyon çalışmaları yapıyor.',
      date: '15.03.2024',
      category: 'grup-antrenmani'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
      title: 'Grup Antrenmanı Videosu',
      description: 'Muammer Hoca eşliğinde ileri seviye teknik antrenman seansı.',
      date: '12.03.2024',
      category: 'grup-antrenmani'
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      title: 'Sabah Antrenmanı',
      description: 'Sabah erken saatlerde yapılan grup antrenmanımızdan kareler.',
      date: '10.03.2024',
      category: 'grup-antrenmani'
    },
    {
      id: 4,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',
      title: 'Kondisyon Antrenmanı',
      description: 'Grup halinde yapılan kondisyon ve dayanıklılık çalışmaları.',
      date: '08.03.2024',
      category: 'grup-antrenmani'
    },
    {
      id: 5,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      title: 'Teknik Antrenman',
      description: 'Grup teknik antrenman seansından özel anlar.',
      date: '05.03.2024',
      category: 'grup-antrenmani'
    },

    // Sparring Seansı Category (5 items)
    {
      id: 6,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Sparring Seansı 1',
      description: 'Yarışma hazırlık döneminde sporcularımızın sparring çalışması.',
      date: '03.03.2024',
      category: 'sparring-seansi'
    },
    {
      id: 7,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Sparring Videosu',
      description: 'Profesyonel sporcularımızın sparring antrenmanı.',
      date: '01.03.2024',
      category: 'sparring-seansi'
    },
    {
      id: 8,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
      title: 'Sparring Hazırlık',
      description: 'Sparring öncesi ısınma ve hazırlık çalışmaları.',
      date: '28.02.2024',
      category: 'sparring-seansi'
    },
    {
      id: 9,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Hafif Siklet Sparring',
      description: 'Hafif siklet sporcularımızın sparring çalışması.',
      date: '25.02.2024',
      category: 'sparring-seansi'
    },
    {
      id: 10,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Ağır Siklet Sparring',
      description: 'Ağır siklet sporcularımızın sparring seansı.',
      date: '22.02.2024',
      category: 'sparring-seansi'
    },

    // Ring Çalışması Category (5 items)
    {
      id: 11,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Ring Tekniği',
      description: 'Ring içi teknik çalışmalar ve pozisyon geliştirme.',
      date: '20.02.2024',
      category: 'ring-calismasi'
    },
    {
      id: 12,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Ring Antrenmanı',
      description: 'Ring çalışması ve kondisyon antrenmanı.',
      date: '18.02.2024',
      category: 'ring-calismasi'
    },
    {
      id: 13,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Ring Taktikleri',
      description: 'Ring içi taktik ve strateji geliştirme çalışmaları.',
      date: '15.02.2024',
      category: 'ring-calismasi'
    },
    {
      id: 14,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Ring Kondisyonu',
      description: 'Ring içi dayanıklılık ve kondisyon çalışmaları.',
      date: '12.02.2024',
      category: 'ring-calismasi'
    },
    {
      id: 15,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Ring Eğitimi',
      description: 'Yeni başlayan sporcular için ring eğitimi.',
      date: '10.02.2024',
      category: 'ring-calismasi'
    },

    // Şampiyon Sporcularımız Category (5 items)
    {
      id: 16,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      title: 'Şampiyonlar',
      description: 'Kulübümüzün şampiyon sporcuları bir arada.',
      date: '08.02.2024',
      category: 'sampiyon-sporcular'
    },
    {
      id: 17,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      title: 'Şampiyon Antrenmanı',
      description: 'Şampiyon sporcularımızın özel antrenman rutini.',
      date: '05.02.2024',
      category: 'sampiyon-sporcular'
    },
    {
      id: 18,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      title: 'Madalya Töreni',
      description: 'Şampiyon sporcularımızın madalya töreni.',
      date: '02.02.2024',
      category: 'sampiyon-sporcular'
    },
    {
      id: 19,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      title: 'Başarı Hikayesi',
      description: 'Şampiyon sporcumuzun başarı hikayesi.',
      date: '30.01.2024',
      category: 'sampiyon-sporcular'
    },
    {
      id: 20,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      title: 'Şampiyon Röportajı',
      description: 'Şampiyon sporcumuzla özel röportaj.',
      date: '28.01.2024',
      category: 'sampiyon-sporcular'
    },

    // Teknik Eğitim Category (5 items)
    {
      id: 21,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
      title: 'Temel Teknikler',
      description: 'Boks sporunun temel teknikleri üzerine eğitim.',
      date: '25.01.2024',
      category: 'teknik-egitim'
    },
    {
      id: 22,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
      title: 'Ileri Teknikler',
      description: 'Ileri seviye boks teknikleri eğitimi.',
      date: '22.01.2024',
      category: 'teknik-egitim'
    },
    {
      id: 23,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
      title: 'Teknik Analiz',
      description: 'Sporcularımızın teknik analiz çalışması.',
      date: '20.01.2024',
      category: 'teknik-egitim'
    },
    {
      id: 24,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
      title: 'Özel Teknik Dersi',
      description: 'Birebir teknik eğitim seansı.',
      date: '18.01.2024',
      category: 'teknik-egitim'
    },
    {
      id: 25,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
      title: 'Teknik Geliştirme',
      description: 'Teknik geliştirme ve iyileştirme çalışmaları.',
      date: '15.01.2024',
      category: 'teknik-egitim'
    }
  ];

  const previewItems = galleryItems.slice(0, 3);

  const handleImageZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!selectedItem) return;
    
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed || !selectedItem) return;
    
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const getCategoryItems = (category: string) => {
    return galleryItems.filter(item => item.category === category);
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 6);
  };

  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % previewItems.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(previewItems[nextIndex]);
    setIsZoomed(false);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + previewItems.length) % previewItems.length;
    setCurrentIndex(prevIndex);
    setSelectedItem(previewItems[prevIndex]);
    setIsZoomed(false);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsZoomed(false);
  };

  const handleViewAll = () => {
    navigate('/gallery');
  };

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">Galeri</h2>
      <div className="gallery-container">
        {previewItems.map((item, index) => (
          <div
            key={item.id}
            className="gallery-item"
            onClick={() => handleItemClick(item, index)}
          >
            {item.type === 'video' ? (
              <div className="video-thumbnail">
                <img src={item.thumbnail || item.url} alt={item.title} />
                <div className="play-button"></div>
              </div>
            ) : (
              <img src={item.url} alt={item.title} />
            )}
            <div className="gallery-item-overlay">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery-actions">
        <button className="btn-primary" onClick={handleViewAll}>
          Tüm Galeriyi Gör
        </button>
      </div>

      {selectedItem && (
        <div className="gallery-modal-overlay" onClick={handleClose}>
          <div className="gallery-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>&times;</button>
            <div className="gallery-modal-content">
              <div className="modal-media-section">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.url}
                    controls
                    playsInline
                    className="gallery-modal-media"
                  />
                ) : (
                  <div 
                    className={`modal-media-container ${isZoomed ? 'zoomed' : ''}`}
                    style={isZoomed ? {
                      cursor: 'zoom-out',
                      backgroundImage: `url(${selectedItem.url})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
                    } : { cursor: 'zoom-in' }}
                  >
                    <img
                      ref={modalImageRef}
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="gallery-modal-media"
                      onClick={handleImageZoom}
                      onMouseMove={handleMouseMove}
                      style={{ opacity: isZoomed ? 0 : 1 }}
                    />
                  </div>
                )}
                <button className="nav-button prev" onClick={handlePrevious}>
                  &#10094;
                </button>
                <button className="nav-button next" onClick={handleNext}>
                  &#10095;
                </button>
                <div className="pagination-dots">
                  {previewItems.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${index === currentIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                        setSelectedItem(previewItems[index]);
                        setIsZoomed(false);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="modal-info-section">
                <div className="gallery-modal-info">
                  <div className="modal-header">
                    <h3>{selectedItem.title}</h3>
                  </div>
                  <div className="modal-description">
                    <p>{selectedItem.description}</p>
                  </div>
                  <div className="modal-footer">
                    <span className="gallery-date">{selectedItem.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 