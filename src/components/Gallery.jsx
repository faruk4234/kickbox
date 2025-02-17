import React, { useState } from 'react';
import { teachersData } from '../data/teachersData';
import './Gallery.css';

export const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Flatten all media from all teachers into a single array
  const allMedia = teachersData.flatMap(teacher => 
    teacher.media.map(media => ({
      ...media,
      teacherName: teacher.name,
      teacherTitle: teacher.title
    }))
  );

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const handleClose = () => {
    setSelectedMedia(null);
  };

  return (
    <section className="gallery" id="gallery">
      <h2 className="section-title">Galeri</h2>
      <div className="gallery-container">
        {allMedia.map((media, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => handleMediaClick(media)}
          >
            {media.type === 'video' ? (
              <div className="video-thumbnail">
                <img 
                  src={media.thumbnail || media.url} 
                  alt={media.teacherName}
                  loading="lazy"
                />
                <div className="play-icon">
                  <i className="fas fa-play"></i>
                </div>
              </div>
            ) : (
              <img 
                src={media.url} 
                alt={media.teacherName}
                loading="lazy"
              />
            )}
            <div className="gallery-item-overlay">
              <h3>{media.teacherName}</h3>
              <p>{media.teacherTitle}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className="media-modal-overlay" onClick={handleClose}>
          <div className="media-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>&times;</button>
            <div className="media-modal-content">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  playsInline
                  className="modal-media"
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.teacherName}
                  className="modal-media"
                />
              )}
              <div className="media-info">
                <h3>{selectedMedia.teacherName}</h3>
                <p>{selectedMedia.teacherTitle}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 