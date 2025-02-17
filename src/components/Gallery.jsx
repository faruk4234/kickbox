import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const media = [
    {
      id: 1,
      src: '/images/gallery/gallery1.jpg',
      title: 'Morning Training Session',
      description: 'Students practicing their techniques during our morning class.',
      date: '15.03.2024'
    },
    {
      id: 2,
      src: '/images/gallery/gallery2.jpg',
      title: 'Sparring Practice',
      description: 'Advanced students engaging in controlled sparring matches.',
      date: '12.03.2024'
    },
    {
      id: 3,
      src: '/images/gallery/gallery3.jpg',
      title: 'Technique Demonstration',
      description: 'Our instructor demonstrating proper form and technique.',
      date: '10.03.2024'
    },
    {
      id: 4,
      src: '/images/gallery/gallery4.jpg',
      title: 'Group Training',
      description: 'Students working together to improve their skills.',
      date: '08.03.2024'
    }
  ];

  const handleMediaClick = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
    setCurrentIndex(0);
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
            <img src={item.src} alt={item.title} className="gallery-img" />
            <div className="gallery-item-overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className="media-modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedMedia.src}
              alt={selectedMedia.title}
              className="modal-media"
            />
            <div className="modal-info">
              <div className="modal-header">
                <h3>{selectedMedia.title}</h3>
                <span className="modal-date">{selectedMedia.date}</span>
              </div>
              <p className="modal-description">{selectedMedia.description}</p>
            </div>
            <button className="nav-button prev" onClick={handlePrevious}>❮</button>
            <button className="nav-button next" onClick={handleNext}>❯</button>
            <button className="close-button" onClick={handleCloseModal}>×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery; 