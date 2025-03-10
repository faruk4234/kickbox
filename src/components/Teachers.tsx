import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherDetails } from './TeacherDetails';
import './Teachers.css';
import { Teacher } from '../types/Teacher';
import { teachersData } from '../data/teachersData';

const teachers: Teacher[] = teachersData.slice(0, 3);

    
export const Teachers = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<any | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollTo({
          left: currentSlide * sliderRef.current.offsetWidth,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide]);

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
    if (currentSlide < teachers.length - 1) {
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
    navigate('/teachers');
  };

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleClose = () => {
    setSelectedTeacher(null);
    setSelectedGalleryItem(null);
  };

  const handleGalleryItemClick = (item: any) => {
    setSelectedGalleryItem(item);
  };

  return (
    <section className="teachers-section" id="teachers">
      <div className={`teachers-container ${isVisible ? 'fade-in' : ''}`}>
        <h2 className="section-title">Eğitmenlerimiz</h2>
        <div className="teachers-slider">
          <div className="slider-container" ref={sliderRef}>
            {teachers.map((teacher, index) => (
              <div
                key={teacher.id}
                className={`slider-item ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleTeacherClick(teacher)}
                style={{ cursor: 'pointer' }}
              >
                <div className="item-image">
                  <img src={teacher.media[0].url} alt={teacher.name} loading="lazy" />
                </div>
                <div className="item-content">
                  <h3>{teacher.name}</h3>
                  <span className="teacher-title">{teacher.title}</span>
                  <p>{teacher.description}</p>
                  <div className="specialties">
                    {teacher.specialties.map((specialty, i) => (
                      <span key={i} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                  <div className="experience-tag">
                    Deneyim: {teacher.experience}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button 
              className="slider-button prev" 
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              aria-label="Önceki eğitmen"
            >
              ‹
            </button>
            <div className="slider-dots">
              {teachers.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Eğitmen ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className="slider-button next" 
              onClick={handleNext}
              disabled={currentSlide === teachers.length - 1}
              aria-label="Sonraki eğitmen"
            >
              ›
            </button>
          </div>
        </div>
        <div className="section-actions">
          <button className="btn-primary" onClick={handleViewAll}>
            Tüm Eğitmenlerimiz
          </button>
        </div>
      </div>

      {selectedTeacher && (
        <TeacherDetails
          teacher={selectedTeacher}
          variant="modal"
          onClose={handleClose}
          onGalleryItemClick={handleGalleryItemClick}
        />
      )}

      {selectedGalleryItem && (
        <div className="gallery-modal-overlay" onClick={handleClose}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>&times;</button>
            <div className="gallery-modal-content">
              {selectedGalleryItem.type === 'video' ? (
                <video
                  src={selectedGalleryItem.url}
                  controls
                  playsInline
                  className="gallery-modal-media"
                />
              ) : (
                <img
                  src={selectedGalleryItem.url}
                  alt={selectedGalleryItem.title}
                  className="gallery-modal-media"
                />
              )}
              {selectedGalleryItem.title && (
                <div className="gallery-modal-info">
                  <h3>{selectedGalleryItem.title}</h3>
                  {selectedGalleryItem.description && (
                    <p>{selectedGalleryItem.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 