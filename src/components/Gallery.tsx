import React, { useState, useRef, useEffect } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Only show first 3 items in preview
  const previewItems = galleryItems.slice(0, 3);

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      if (sliderRef.current) {
        sliderRef.current.scrollTo({
          left: (currentSlide - 1) * sliderRef.current.offsetWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNext = () => {
    if (currentSlide < previewItems.length - 1) {
      setCurrentSlide(prev => prev + 1);
      if (sliderRef.current) {
        sliderRef.current.scrollTo({
          left: (currentSlide + 1) * sliderRef.current.offsetWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * sliderRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleViewAll = () => {
    navigate('/gallery');
  };

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleModalPrevious = () => {
    const currentIndex = galleryItems.findIndex(item => item.id === selectedItem?.id);
    const newIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    setSelectedItem(galleryItems[newIndex]);
  };

  const handleModalNext = () => {
    const currentIndex = galleryItems.findIndex(item => item.id === selectedItem?.id);
    const newIndex = currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    setSelectedItem(galleryItems[newIndex]);
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className={`gallery-container ${isVisible ? 'fade-in' : ''}`}>
        <h2 className="section-title">Galeri</h2>
        <div className="gallery-slider">
          <div className="slider-container" ref={sliderRef}>
            {previewItems.map((item, index) => (
              <div
                key={item.id}
                className={`slider-item ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <div className="item-image">
                  {item.type === 'video' ? (
                    <div className="video-thumbnail">
                      <img src={item.thumbnail || item.url} alt={item.title} loading="lazy" />
                      <div className="play-button">
                        <span>▶</span>
                      </div>
                    </div>
                  ) : (
                    <img src={item.url} alt={item.title} loading="lazy" />
                  )}
                </div>
                <div className="item-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button className="btn-secondary">Daha Fazla</button>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button 
              className="slider-button prev" 
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              aria-label="Önceki galeri"
            >
              ‹
            </button>
            <div className="slider-dots">
              {previewItems.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Galeri ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className="slider-button next" 
              onClick={handleNext}
              disabled={currentSlide === previewItems.length - 1}
              aria-label="Sonraki galeri"
            >
              ›
            </button>
          </div>
        </div>
        <div className="section-actions">
          <button className="btn-primary" onClick={handleViewAll}>
            Tüm Galeriyi Gör
          </button>
        </div>
      </div>

      {modalOpen && selectedItem && (
        <div className="gallery-modal-overlay" onClick={handleCloseModal}>
          <div className="gallery-modal" onClick={e => e.stopPropagation()}>
            <div className="gallery-modal-content">
              <div className="modal-media-section">
                <div className="modal-media-container">
                  {selectedItem.type === 'video' ? (
                    <video
                      className="gallery-modal-media"
                      src={selectedItem.url}
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      className="gallery-modal-media"
                      src={selectedItem.url}
                      alt={selectedItem.title}
                    />
                  )}
                </div>
                <button className="nav-button prev" onClick={handleModalPrevious}>
                  ‹
                </button>
                <button className="nav-button next" onClick={handleModalNext}>
                  ›
                </button>
              </div>
              <div className="modal-info-section">
                <div className="gallery-modal-info">
                  <div className="modal-header">
                    <h3>{selectedItem.title}</h3>
                    <span className="gallery-category">{selectedItem.category}</span>
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
            <button className="close-button" onClick={handleCloseModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};