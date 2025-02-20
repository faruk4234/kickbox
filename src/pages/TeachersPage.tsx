import React, { useState, useEffect } from 'react';
import { Teacher } from '../types/Teacher';
import { teachersData } from '../data/teachersData';
import { PageHeader } from '../components/PageHeader';
import './TeachersPage.css';

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

const TeachersPage: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Get unique categories from teacher specialties
    const uniqueCategories = Array.from(
      new Set(teachersData.flatMap(teacher => teacher.specialties))
    ).sort((a, b) => a.localeCompare(b));
    setCategories(uniqueCategories);
  }, []);

  const filteredTeachers = selectedCategory
    ? teachersData.filter(teacher => teacher.specialties.includes(selectedCategory))
    : teachersData;

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleGalleryItemClick = (item: any) => {
    setSelectedGalleryItem(item);
  };

  const handleClose = () => {
    setSelectedTeacher(null);
    setSelectedGalleryItem(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="teachers-page">
      <div className="page-header-wrapper">
        <PageHeader title="Hocalarımız" />
      </div>
      
      <div className="categories-container">
        <div className="categories-wrapper">
          <div className="categories-scroll">
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

      <div className="teachers-content">
        <div className="teachers-grid">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="teacher-gallery-card" onClick={() => handleTeacherClick(teacher)}>
              <div className="teacher-gallery-image">
                <MediaCarousel media={teacher.media} />
              </div>
              <div className="teacher-gallery-info">
                <h3>{teacher.name}</h3>
                <p>{teacher.title}</p>
                <div className="specialties">
                  {teacher.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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
                    <span className="section-icon">🎯</span>
                    <h5>Hakkında</h5>
                  </div>
                  <div className="section-content">
                    <p>{selectedTeacher.description}</p>
                  </div>
                </div>

                {selectedTeacher.experience && (
                  <div className="teacher-modal-section">
                    <div className="section-header">
                      <span className="section-icon">💪</span>
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
                      <span className="section-icon">📚</span>
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
                    <div className="section-content">
                      <div className="achievements-list">
                        {selectedTeacher.achievements.map((achievement, index) => (
                          <div key={index} className="achievement-item">
                            <span className="achievement-bullet">•</span>
                            <p>{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTeacher.gallery && (
                  <div className="teacher-modal-section">
                    <div className="section-header">
                      <span className="section-icon">📸</span>
                      <h5>Galeri</h5>
                    </div>
                    <div className="teacher-gallery-grid">
                      {selectedTeacher.gallery.map((item, index) => (
                        <div
                          key={index}
                          className="gallery-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGalleryItemClick(item);
                          }}
                        >
                          {item.type === 'video' ? (
                            <div className="video-thumbnail">
                              <img src={item.thumbnail || item.url} alt={item.title} />
                              <div className="play-button"></div>
                            </div>
                          ) : (
                            <img src={item.url} alt={item.title} />
                          )}
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
    </div>
  );
};

export default TeachersPage; 