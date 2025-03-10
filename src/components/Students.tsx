import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student, MediaItem } from '../types/Student';
import { studentsData } from '../data/studentsData';
import './Students.css';

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
            <div className="student-carousel-dots">
              {media.map((_, index) => (
                <span
                  key={index}
                  className={`student-dot ${index === currentIndex ? 'active' : ''}`}
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

export const Students: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [visibleStudents, setVisibleStudents] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleStudents(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleStudents(2);
      } else {
        setVisibleStudents(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add body scroll lock effect
  useEffect(() => {
    if (selectedStudent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedStudent]);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleClose = () => {
    setSelectedStudent(null);
  };

  const handleViewAllStudents = () => {
    navigate('students');
  };

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
    if (currentSlide < Math.ceil(studentsData.length / visibleStudents) - 1) {
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

  return (
    <section id="students" className="students-section">
      <h2>Öğrencilerimiz</h2>
      <div className="students-slider-container">
        <div className="students-grid" ref={sliderRef}>
          {studentsData.map((student) => (
            <div 
              key={student.id} 
              className="student-card" 
              onClick={() => handleStudentClick(student)}
              style={{
                flex: window.innerWidth <= 768 ? '0 0 100%' : 'initial'
              }}
            >
              <div className="student-image">
                <MediaCarousel media={student.media} />
              </div>
              <div className="student-info">
                <h3>{student.name}</h3>
                <p className="student-title">{student.title}</p>
                
                <div className="student-details">
                  <div className="detail-item">
                    <span className="detail-label">Amaç:</span>
                    <span className="detail-value">{student.purpose}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Başlangıç:</span>
                    <span className="detail-value">{student.startYear}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Deneyim:</span>
                    <span className="detail-value">{student.experience}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Başarı:</span>
                    <span className="detail-value">{student.success}</span>
                  </div>
                </div>
                
                <div className="specialties">
                  {student.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
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
            aria-label="Önceki öğrenci"
          >
            ‹
          </button>
          <div className="slider-dots">
            {Array.from({ length: Math.ceil(studentsData.length / visibleStudents) }).map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Öğrenci grubu ${index + 1}`}
              />
            ))}
          </div>
          <button 
            className="slider-button next" 
            onClick={handleNext}
            disabled={currentSlide === Math.ceil(studentsData.length / visibleStudents) - 1}
            aria-label="Sonraki öğrenci"
          >
            ›
          </button>
        </div>
      </div>

      <div className="load-more">
        <button className="btn-primary" onClick={handleViewAllStudents}>
          Tüm Öğrencilerimiz
        </button>
      </div>

      {selectedStudent && (
        <div className="student-modal-overlay" onClick={handleClose}>
          <div className="student-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>&times;</button>
            <div className="student-modal-content">
              <div className="student-modal-sidebar">
                <div className="student-modal-image">
                  <MediaCarousel media={selectedStudent.media} />
                </div>
                <div className="student-modal-basic-info">
                  <h2>{selectedStudent.name}</h2>
                  <h3>{selectedStudent.title}</h3>
                  
                  <div className="student-details-modal">
                    <div className="detail-item">
                      <span className="detail-label">Amaç:</span>
                      <span className="detail-value">{selectedStudent.purpose}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Başlangıç:</span>
                      <span className="detail-value">{selectedStudent.startYear}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Deneyim:</span>
                      <span className="detail-value">{selectedStudent.experience}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Başarı:</span>
                      <span className="detail-value">{selectedStudent.success}</span>
                    </div>
                  </div>
                  
                  <div className="specialties">
                    {selectedStudent.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="student-modal-main">
                <div className="student-modal-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h4>Biyografi</h4>
                  </div>
                  <div className="section-content">
                    <p>{selectedStudent.bio}</p>
                  </div>
                </div>
                
                <div className="student-modal-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                    </div>
                    <h4>Başarılar</h4>
                  </div>
                  <div className="section-content">
                    <ul className="achievements-list">
                      {selectedStudent.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="student-modal-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                    <h4>Galeri</h4>
                  </div>
                  <div className="section-content">
                    <div className="gallery-grid">
                      {selectedStudent.gallery.map((item, index) => (
                        <div key={index} className="gallery-item">
                          {item.type === 'video' ? (
                            <div className="video-thumbnail">
                              <img src={item.thumbnail || item.url} alt={item.title || ''} loading="lazy" />
                              <div className="play-button">
                                <span>▶</span>
                              </div>
                            </div>
                          ) : (
                            <img src={item.url} alt={item.title || ''} loading="lazy" />
                          )}
                          {item.title && (
                            <div className="gallery-item-info">
                              <h5>{item.title}</h5>
                              {item.description && <p>{item.description}</p>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 