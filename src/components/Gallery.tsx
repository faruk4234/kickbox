import React, { useState } from 'react';
import './Gallery.css';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  date: string;
}

export const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [visibleItems, setVisibleItems] = useState(6);
  const [showAllGallery, setShowAllGallery] = useState(false);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed',
      title: 'Grup Antrenmanı',
      description: 'Haftalık grup antrenmanlarımızda sporcularımız teknik ve kondisyon çalışmaları yapıyor.',
      date: '15.03.2024'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
      title: 'Teknik Çalışma',
      description: 'Muammer Hoca eşliğinde ileri seviye teknik antrenman seansı.',
      date: '12.03.2024'
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Sparring Seansı',
      description: 'Yarışma hazırlık döneminde sporcularımızın sparring çalışması.',
      date: '10.03.2024'
    },
    {
      id: 4,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Ring Çalışması',
      description: 'Ring çalışması, sparring seansından sonra yapılan kondisyon ve teknik çalışmalarını içerir.',
      date: '08.03.2024'
    },
    {
      id: 5,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      title: 'Şampiyon Sporcularımız',
      description: 'Şampiyon sporcularımızın güçlü ve teknik yetenekleriyle ilgili bir açıklama.',
      date: '05.03.2024'
    },
    {
      id: 6,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438984742-1262db08379e',
      title: 'Teknik Eğitim',
      description: 'Teknik eğitim, sporcularımızın teknik yeteneklerini geliştirmeleri için yapılan eğitimlerdir.',
      date: '03.03.2024'
    },
    {
      id: 7,
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
      thumbnail: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
      title: 'Antrenman Videosu',
      description: 'Antrenman videosu, sporcularımızın antrenmanlarını izlemek için hazırlanmış bir video.',
      date: '01.03.2024'
    },
  ];

  const handleLoadMore = () => {
    setShowAllGallery(true);
  };

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleCloseGallery = () => {
    setShowAllGallery(false);
  };

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">Galeri</h2>
      <div className="gallery-container">
        {galleryItems.slice(0, visibleItems).map((item) => (
          <div 
            key={item.id} 
            className="gallery-item"
            onClick={() => handleItemClick(item)}
          >
            {item.type === 'image' ? (
              <img src={item.url} alt={item.title} loading="lazy" />
            ) : (
              <div className="video-thumbnail">
                <img src={item.thumbnail} alt={item.title} loading="lazy" />
                <div className="play-button">▶</div>
              </div>
            )}
            <div className="gallery-overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more">
        <button className="btn-primary" onClick={handleLoadMore}>
          Daha Fazla
        </button>
      </div>

      {showAllGallery && (
        <div className="gallery-modal" onClick={handleCloseGallery}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <h2>Tüm Galeri</h2>
            <div className="gallery-grid">
              {galleryItems.map((item) => (
                <div key={item.id} className="gallery-modal-item">
                  <div className="gallery-modal-media" onClick={() => handleItemClick(item)}>
                    {item.type === 'image' ? (
                      <img src={item.url} alt={item.title} loading="lazy" />
                    ) : (
                      <div className="video-thumbnail">
                        <img src={item.thumbnail} alt={item.title} loading="lazy" />
                        <div className="play-button">▶</div>
                      </div>
                    )}
                    <div className="gallery-overlay">
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={handleCloseGallery}>×</button>
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-media">
              {selectedItem.type === 'image' ? (
                <img src={selectedItem.url} alt={selectedItem.title} />
              ) : (
                <video controls autoPlay>
                  <source src={selectedItem.url} type="video/mp4" />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              )}
            </div>
            <div className="modal-info">
              <h3>{selectedItem.title}</h3>
              <span className="modal-date">{selectedItem.date}</span>
              <p className="modal-description">{selectedItem.description}</p>
            </div>
            <button className="close-button" onClick={handleClose}>×</button>
          </div>
        </div>
      )}
    </section>
  );
}; 