import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/ImageSlider.css';

interface ImageSliderProps {
  images: string[];
  aspectRatio?: string;
  titles?: string[];
  descriptions?: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ 
  images, 
  aspectRatio = '1',
  titles = [],
  descriptions = []
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    setIsZoomed(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setIsZoomed(false);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen) return;
    
    if (e.key === 'ArrowLeft') {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else if (e.key === 'ArrowRight') {
      setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="image-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} onClick={() => handleImageClick(index)}>
            <div className="slider-image-container" style={{ aspectRatio }}>
              <img src={image} alt={titles[index] || `Slide ${index + 1}`} loading="lazy" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isModalOpen && (
        <div className="gallery-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="gallery-modal">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>&times;</button>
            <div className="gallery-modal-content">
              <div className="modal-media-section">
                <div 
                  className={`modal-media-container ${isZoomed ? 'zoomed' : ''}`}
                  style={isZoomed ? {
                    cursor: 'zoom-out',
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : { cursor: 'zoom-in' }}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt={titles[currentImageIndex] || 'Kickbox Antrenmanı'}
                    className="gallery-modal-media"
                    onClick={handleImageZoom}
                    onMouseMove={handleMouseMove}
                    style={{ opacity: isZoomed ? 0 : 1 }}
                  />
                </div>
                {images.length > 1 && (
                  <>
                    <button className="nav-button prev" onClick={handlePrevious}>
                      &#10094;
                    </button>
                    <button className="nav-button next" onClick={handleNext}>
                      &#10095;
                    </button>
                    <div className="pagination-dots">
                      {images.map((_, index) => (
                        <span
                          key={index}
                          className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                            setIsZoomed(false);
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="modal-info-section">
                <div className="gallery-modal-info">
                  <div className="modal-header">
                    <h3>{titles[currentImageIndex] || 'Kickbox Antrenmanı'}</h3>
                  </div>
                  <div className="modal-description">
                    <p>{descriptions[currentImageIndex] || 'Profesyonel eğitmenlerimiz eşliğinde güvenli ve etkili antrenman deneyimi.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 