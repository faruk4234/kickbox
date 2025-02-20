import React from 'react';
import { Teacher } from '../types/Teacher';
import './TeacherDetails.css';

const MediaCarousel: React.FC<{ media: MediaItem[]; onClose?: () => void }> = ({ media, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="media-carousel">
      <div className="media-container">
        {media[currentIndex].type === 'video' ? (
          <video
            src={media[currentIndex].url}
            controls
            playsInline
            className="media-item"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={media[currentIndex].url}
            alt=""
            className="media-item"
            loading="lazy"
          />
        )}
        {media.length > 1 && (
          <>
            <button className="carousel-button prev" onClick={handlePrevious}>
              ‹
            </button>
            <button className="carousel-button next" onClick={handleNext}>
              ›
            </button>
            <div className="carousel-dots">
              {media.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface TeacherDetailsProps {
  teacher: Teacher;
  variant?: 'page' | 'modal';
  onClose?: () => void;
  onGalleryItemClick?: (item: any) => void;
}

export const TeacherDetails: React.FC<TeacherDetailsProps> = ({
  teacher,
  variant = 'page',
  onClose,
  onGalleryItemClick
}) => {
  // Effect to handle escape key for modal variant
  React.useEffect(() => {
    if (variant === 'modal' && onClose) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [variant, onClose]);

  const content = (
    <>
      <div className="teacher-details-sidebar">
        <div className="teacher-details-image">
          <MediaCarousel media={teacher.media} />
        </div>
        <div className="teacher-details-basic-info">
          <h2>{teacher.name}</h2>
          <h3>{teacher.title}</h3>
          <div className="specialties">
            {teacher.specialties.map((specialty, index) => (
              <span key={index} className="specialty-tag">{specialty}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="teacher-details-main">
        {teacher.description && (
          <div className="teacher-details-section">
            <div className="section-header">
              <div className="section-icon">📝</div>
              <h4>Hakkında</h4>
            </div>
            <div className="section-content">
              <p>{teacher.description}</p>
            </div>
          </div>
        )}

        {teacher.experience && (
          <div className="teacher-details-section">
            <div className="section-header">
              <div className="section-icon">💪</div>
              <h4>Deneyim</h4>
            </div>
            <div className="section-content">
              <p>{teacher.experience}</p>
            </div>
          </div>
        )}

        {teacher.education && (
          <div className="teacher-details-section">
            <div className="section-header">
              <div className="section-icon">🎓</div>
              <h4>Eğitim</h4>
            </div>
            <div className="section-content">
              <p>{teacher.education}</p>
            </div>
          </div>
        )}

        {teacher.achievements && teacher.achievements.length > 0 && (
          <div className="teacher-details-section">
            <div className="section-header">
              <div className="section-icon">🏆</div>
              <h4>Başarılar</h4>
            </div>
            <div className="section-content">
              <div className="achievements-grid">
                {teacher.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <div className="achievement-icon">🎯</div>
                    <p>{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {teacher.gallery && teacher.gallery.length > 0 && (
          <div className="teacher-details-section">
            <div className="section-header">
              <div className="section-icon">📸</div>
              <h4>Galeri</h4>
            </div>
            <div className="gallery-grid">
              {teacher.gallery.map((item, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  onClick={() => onGalleryItemClick?.(item)}
                >
                  {item.type === 'video' ? (
                    <div className="video-thumbnail">
                      <img src={item.thumbnail || item.url} alt="" loading="lazy" />
                      <div className="play-icon">▶</div>
                    </div>
                  ) : (
                    <img src={item.url} alt="" loading="lazy" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (variant === 'modal') {
    return (
      <div className="teacher-modal-overlay" onClick={onClose}>
        <div className="teacher-modal" onClick={(e) => e.stopPropagation()}>
          {onClose && (
            <button className="close-button" onClick={onClose}>&times;</button>
          )}
          <div className="teacher-modal-container">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-details-container">
      {content}
    </div>
  );
}; 