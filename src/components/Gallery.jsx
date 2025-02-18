import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const media = [
    {
      id: 1,
      src: '/images/gallery/gallery1.jpg',
      title: 'Sabah Antrenmanı',
      description: 'Sporcularımız sabah antrenmanında teknik ve kondisyon çalışmaları yapıyor. Her gün düzenli olarak yapılan bu antrenmanlar, sporcularımızın fiziksel ve mental gelişimini destekliyor.',
      date: '15.03.2024',
      type: 'image',
      category: 'Antrenman'
    },
    {
      id: 2,
      src: '/images/gallery/gallery2.jpg',
      title: 'Sparring Seansı',
      description: 'İleri seviye sporcularımız kontrollü sparring maçları yaparak gerçek müsabaka deneyimi kazanıyor. Güvenli ve profesyonel bir ortamda gerçekleşen bu seanslar, teknik ve taktik gelişimi destekliyor.',
      date: '12.03.2024',
      type: 'image',
      category: 'Sparring'
    },
    {
      id: 3,
      src: '/images/gallery/gallery3.jpg',
      title: 'Teknik Gösterimi',
      description: 'Muammer hocamız temel ve ileri seviye teknikleri göstererek sporcularımıza detaylı eğitim veriyor. Doğru form ve teknik, başarılı bir kickboks kariyeri için temel oluşturuyor.',
      date: '10.03.2024',
      type: 'video',
      category: 'Eğitim'
    },
    {
      id: 4,
      src: '/images/gallery/gallery4.jpg',
      title: 'Grup Çalışması',
      description: 'Sporcularımız grup halinde çalışarak hem motivasyonlarını yükseltiyor hem de birbirlerinden öğreniyorlar. Takım ruhu ve dayanışma, salonumuzun temel değerlerinden.',
      date: '08.03.2024',
      type: 'image',
      category: 'Antrenman'
    }
  ];

  const handleMediaClick = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
    setCurrentIndex(0);
    document.body.style.overflow = 'auto';
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex === 0 ? media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedMedia(media[newIndex]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex === media.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedMedia(media[newIndex]);
  };

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">Galeri</h2>
      <div className="gallery-container">
        {media.map((item, index) => (
          <div
            key={item.id}
            className="gallery-item"
            onClick={() => handleMediaClick(item, index)}
          >
            {item.type === 'video' ? (
              <div className="video-thumbnail">
                <img src={item.src} alt={item.title} className="gallery-img" />
                <div className="play-button"></div>
              </div>
            ) : (
              <img src={item.src} alt={item.title} className="gallery-img" />
            )}
            <div className="gallery-item-overlay">
              <h3>{item.title}</h3>
              <span className="category-tag">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className="instagram-modal-overlay" onClick={handleCloseModal}>
          <div className="instagram-modal" onClick={(e) => e.stopPropagation()}>
            <div className="instagram-modal-content">
              <div className="instagram-modal-media">
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.src}
                    controls
                    className="modal-media"
                    playsInline
                  />
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="modal-media"
                  />
                )}
              </div>
              <div className="instagram-modal-sidebar">
                <div className="instagram-modal-header">
                  <div className="instagram-modal-user">
                    <div className="user-avatar">
                      <img src="/images/logo.png" alt="Muammer Hoca" />
                    </div>
                    <div className="user-info">
                      <h4>Muammer Hoca</h4>
                      <span className="category-tag">{selectedMedia.category}</span>
                    </div>
                  </div>
                </div>
                <div className="instagram-modal-description">
                  <p className="title-text">
                    <strong>{selectedMedia.title}</strong>
                  </p>
                  <p className="description-text">{selectedMedia.description}</p>
                  <span className="post-date">{selectedMedia.date}</span>
                </div>
              </div>
            </div>
            <button className="nav-button prev" onClick={handlePrevious}>❮</button>
            <button className="nav-button next" onClick={handleNext}>❯</button>
            <button className="instagram-close-button" onClick={handleCloseModal}>×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 