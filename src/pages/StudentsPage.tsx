import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../types/Student';
import { studentsData } from '../data/studentsData';
import { PageHeader } from '../components/PageHeader';
import './StudentsPage.css';

const MediaCarousel: React.FC<{ media: any[]; onClose?: () => void }> = ({ media, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleImageZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed) return;
    
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
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
          <div 
            className={`modal-media-container ${isZoomed ? 'zoomed' : ''}`}
            style={isZoomed ? {
              cursor: 'zoom-out',
              backgroundImage: `url(${media[currentIndex].url})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
            } : { cursor: 'zoom-in' }}
          >
            <img
              src={media[currentIndex].url}
              alt=""
              className="media-item"
              loading="lazy"
              onClick={handleImageZoom}
              onMouseMove={handleMouseMove}
              style={{ opacity: isZoomed ? 0 : 1 }}
            />
          </div>
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

export const StudentsPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get unique categories from student specialties
    const uniqueCategories = Array.from(
      new Set(studentsData.flatMap(student => student.specialties))
    ).sort((a, b) => a.localeCompare(b));
    setCategories(uniqueCategories);

    // Add scroll event listener for categories
    const handleScroll = () => {
      if (window.scrollY > 60) {
        document.querySelector('.categories-container')?.classList.add('sticky');
      } else {
        document.querySelector('.categories-container')?.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll selected category into view
  useEffect(() => {
    if (selectedCategory && categoriesRef.current) {
      const activeButton = categoriesRef.current.querySelector('.category-button.active');
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedCategory]);

  const filteredStudents = selectedCategory
    ? studentsData.filter(student => student.specialties.includes(selectedCategory))
    : studentsData;

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleGalleryItemClick = (item: any) => {
    setSelectedGalleryItem(item);
  };

  const handleClose = () => {
    setSelectedStudent(null);
    setSelectedGalleryItem(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="students-page">
      <div className="page-header-wrapper">
        <PageHeader title="Öğrencilerimiz" />
      </div>
      
      <div className="categories-container">
        <div className="categories-wrapper">
          <div className="categories-scroll" ref={categoriesRef}>
            <button
              className={`category-button ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => handleCategoryClick('')}
            >
              Tümü
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="students-content">
        <div className="students-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student.id} className="student-card" onClick={() => handleStudentClick(student)}>
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
            ))
          ) : (
            <div className="no-results">
              <p>Bu kategoride öğrenci bulunamadı.</p>
              <button 
                className="category-button" 
                onClick={() => setSelectedCategory(null)}
              >
                Tüm öğrencileri göster
              </button>
            </div>
          )}
        </div>
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
                        <div key={index} className="gallery-item" onClick={() => handleGalleryItemClick(item)}>
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
                  alt={selectedGalleryItem.title || ''}
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
    </div>
  );
};

export default StudentsPage; 