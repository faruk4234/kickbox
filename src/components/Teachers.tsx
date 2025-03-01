import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Teacher, MediaItem } from '../types/Teacher';
import { teachersData } from '../data/teachersData';
import { TeacherDetails } from './TeacherDetails';
import './Teachers.css';

const MediaCarousel: React.FC<{ media: MediaItem[] }> = ({ media }) => {
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

export const Teachers: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [visibleTeachers, setVisibleTeachers] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleTeachers(window.innerWidth <= 768 ? 1 : 3);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleClose = () => {
    setSelectedTeacher(null);
  };

  const handleViewAllTeachers = () => {
    navigate('teachers');
  };

  return (
    <section id="teachers" className="teachers-section">
      <h2>Hocalarımız</h2>
      <div className="teachers-grid">
        {teachersData.slice(0, visibleTeachers).map((teacher) => (
          <div key={teacher.id} className="teacher-card" onClick={() => handleTeacherClick(teacher)}>
            <div className="teacher-image">
              <MediaCarousel media={teacher.media} />
            </div>
            <div className="teacher-info">
              <h3>{teacher.name}</h3>
              <p>{teacher.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more">
        <div>
          <button className="btn-primary" onClick={handleViewAllTeachers}>
            Tüm Hocalarımız
          </button>
        </div>
      </div>

      {selectedTeacher && (
        <TeacherDetails
          teacher={selectedTeacher}
          variant="modal"
          onClose={handleClose}
        />
      )}
    </section>
  );
}; 