import React from 'react';
import { Teacher, MediaItem } from '../types/Teacher';
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
}

export const TeacherDetails: React.FC<TeacherDetailsProps> = ({ teacher }) => {
  return (
    <div className="teacher-details-container">
      <div className="teacher-header">
        <div className="teacher-image">
          <MediaCarousel media={teacher.media} />
        </div>
        <div className="teacher-basic-info">
          <h2>{teacher.name}</h2>
          <h3>{teacher.title}</h3>
        </div>
      </div>

      <div className="teacher-content">
        <div className="teacher-description">
          <p>{teacher.description}</p>
        </div>

        <div className="teacher-specialties">
          <h4>Uzmanlık Alanları</h4>
          <div className="specialties">
            {teacher.specialties.map((specialty, index) => (
              <span key={index} className="specialty-tag">{specialty}</span>
            ))}
          </div>
        </div>

        {teacher.achievements && (
          <div className="teacher-achievements">
            <h4>Başarılar</h4>
            <div className="achievements-list">
              {teacher.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <span className="achievement-bullet">•</span>
                  <p>{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {teacher.experience && (
          <div className="teacher-experience">
            <h4>Deneyim</h4>
            <p>{teacher.experience}</p>
          </div>
        )}

        {teacher.education && (
          <div className="teacher-education">
            <h4>Eğitim</h4>
            <p>{teacher.education}</p>
          </div>
        )}
      </div>
    </div>
  );
}; 