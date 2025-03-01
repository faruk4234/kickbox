import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import '../styles/ImageSlider.css';

interface ImageSliderProps {
  images: string[];
  titles?: string[];
  descriptions?: string[];
  categories?: string[];
  dates?: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ 
  images, 
  titles = [], 
  descriptions = [],
  categories = [],
  dates = []
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('tr-TR', options);
  };

  return (
    <div className="image-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        speed={800}
        grabCursor={true}
        touchRatio={1.5}
        longSwipesRatio={0.2}
        resistance={false}
        watchSlidesProgress={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div 
              className="slider-image-container"
              onClick={() => handleImageClick(index)}
            >
              <img src={image} alt={titles[index] || `Slide ${index + 1}`} />
              {(titles[index] || descriptions[index]) && (
                <div className="slider-content">
                  {titles[index] && <h3>{titles[index]}</h3>}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedImage !== null && (
        <div className="slider-modal-overlay" onClick={handleClose}>
          <div className="slider-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>&times;</button>
            <div className="slider-modal-content">
              <div className="modal-media-section">
                <img 
                  src={images[selectedImage]} 
                  alt={titles[selectedImage] || `Detail ${selectedImage + 1}`}
                  className="modal-image"
                />
                <button className="nav-button prev" onClick={handlePrev}>&#10094;</button>
                <button className="nav-button next" onClick={handleNext}>&#10095;</button>
              </div>
              <div className="modal-info-section">
                <div className="modal-header">
                  <h3>{titles[selectedImage] || 'Kickbox Antrenmanı'}</h3>
                  {categories[selectedImage] && (
                    <span className="modal-category">
                      {categories[selectedImage]}
                    </span>
                  )}
                </div>
                <div className="modal-description">
                  <p>{descriptions[selectedImage] || 'Profesyonel eğitmenlerimiz eşliğinde güvenli ve etkili antrenman deneyimi.'}</p>
                </div>
                {dates[selectedImage] && (
                  <div className="modal-footer">
                    {formatDate(dates[selectedImage])}
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

export default ImageSlider; 