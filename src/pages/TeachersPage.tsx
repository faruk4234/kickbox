import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Teacher, MediaItem } from '../types/Teacher';
import { teachersData } from '../data/teachersData';
import './TeachersPage.css';

const MediaCarousel: React.FC<{ media: MediaItem[]; onClose?: () => void }> = ({ media, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

export const TeachersPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleClose = () => {
    setSelectedTeacher(null);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="teachers-page">
      <div className="teachers-page-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Ana Sayfa
        </button>
        <h1>Hocalarımız</h1>
        <p>Profesyonel ve deneyimli eğitmen kadromuz ile hizmetinizdeyiz</p>
      </div>
      
      <div className="teachers-page-grid">
        {teachersData.map((teacher) => (
          <div key={teacher.id} className="teacher-card" onClick={() => handleTeacherClick(teacher)}>
            <div className="teacher-image">
              <MediaCarousel media={teacher.media} />
            </div>
            <div className="teacher-info">
              <h3>{teacher.name}</h3>
              <p>{teacher.title}</p>
              <button className="more-button">Detaylar</button>
            </div>
          </div>
        ))}
      </div>

      {selectedTeacher && (
        <div className="teacher-modal-overlay" onClick={handleClose}>
          <div className="teacher-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>&times;</button>
            <div className="teacher-modal-container">
              <div className="teacher-modal-sidebar">
                <div className="teacher-modal-image">
                  <MediaCarousel media={selectedTeacher.media} />
                </div>
                <div className="teacher-modal-basic-info">
                  <h3>{selectedTeacher.name}</h3>
                  <h4>{selectedTeacher.title}</h4>
                  <div className="specialties">
                    {selectedTeacher.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="teacher-modal-main">
                <div className="teacher-modal-section">
                  <div className="section-header">
                    <span className="section-icon">👤</span>
                    <h5>Hakkında</h5>
                  </div>
                  <div className="section-content">
                    <p>{selectedTeacher.description}</p>
                  </div>
                </div>

                {selectedTeacher.experience && (
                  <div className="teacher-modal-section">
                    <div className="section-header">
                      <span className="section-icon">⭐</span>
                      <h5>Deneyim</h5>
                    </div>
                    <div className="section-content">
                      <p>{selectedTeacher.experience}</p>
                    </div>
                  </div>
                )}

                {selectedTeacher.education && (
                  <div className="teacher-modal-section">
                    <div className="section-header">
                      <span className="section-icon">🎓</span>
                      <h5>Eğitim</h5>
                    </div>
                    <div className="section-content">
                      <p>{selectedTeacher.education}</p>
                    </div>
                  </div>
                )}
                
                {selectedTeacher.achievements && (
                  <div className="teacher-modal-section">
                    <div className="section-header">
                      <span className="section-icon">🏆</span>
                      <h5>Başarılar</h5>
                    </div>
                    <div className="section-content achievements-list">
                      {selectedTeacher.achievements.map((achievement, index) => (
                        <div key={index} className="achievement-item">
                          <span className="achievement-bullet">•</span>
                          <p>{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 