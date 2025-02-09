import React from 'react';
import './Gallery.css';

export const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed',
      title: 'Grup Antrenmanı'
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
      title: 'Teknik Çalışma'
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1615117972428-28de87252486',
      title: 'Sparring Seansı'
    },
    {
      id: 4,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517438322307-e67111335449',
      title: 'Salon Ekipmanları'
    },
    {
      id: 5,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff',
      title: 'Şampiyon Sporcularımız'
    },
    {
      id: 6,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1590056764472-cd39d6c54f32',
      title: 'Teknik Eğitim'
    }
  ];

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">Galeri</h2>
      <div className="gallery-container">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-item">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.title} />
            ) : (
              <div className="video-thumbnail">
                <img src={item.thumbnail} alt={item.title} />
                <div className="play-button">▶</div>
              </div>
            )}
            <div className="gallery-overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}; 