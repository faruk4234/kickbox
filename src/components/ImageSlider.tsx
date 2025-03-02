import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import '../styles/ImageSlider.css';

interface SliderItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  category?: string;
  date?: string;
}

interface ImageSliderProps {
  items: SliderItem[];
  autoplay?: boolean;
  effect?: 'slide' | 'fade';
}

const ImageSlider: React.FC<ImageSliderProps> = ({ 
  items,
  autoplay = true,
  effect = 'fade'
}) => {
  const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (item: SliderItem) => {
    setSelectedItem(item);
    setIsZoomed(false);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsZoomed(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem) {
      const currentIndex = items.findIndex(item => item.id === selectedItem.id);
      const nextIndex = (currentIndex + 1) % items.length;
      setSelectedItem(items[nextIndex]);
      setIsZoomed(false);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem) {
      const currentIndex = items.findIndex(item => item.id === selectedItem.id);
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      setSelectedItem(items[prevIndex]);
      setIsZoomed(false);
    }
  };

  const handleImageZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!selectedItem) return;
    
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed || !selectedItem) return;
    
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
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
        autoplay={autoplay ? {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        effect={effect}
        speed={800}
        grabCursor={true}
        touchRatio={1.5}
        longSwipesRatio={0.2}
        resistance={false}
        watchSlidesProgress={true}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div 
              className="slider-image-container"
              onClick={() => handleImageClick(item)}
            >
              {item.type === 'video' ? (
                <div className="video-thumbnail">
                  <img src={item.thumbnail || item.url} alt={item.title} loading="lazy" />
                  <div className="play-button">
                    <span>▶</span>
                  </div>
                </div>
              ) : (
                <img src={item.url} alt={item.title} loading="lazy" />
              )}
              <div className="slider-content">
                <h3>{item.title}</h3>
                {item.category && <span className="slider-category">{item.category}</span>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedItem && (
        <div className="slider-modal-overlay" onClick={handleClose}>
          <div className="slider-modal" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>&times;</button>
            <div className="slider-modal-content">
              <div className="modal-media-section">
                <div 
                  className={`modal-media-container ${isZoomed ? 'zoomed' : ''}`}
                  style={isZoomed ? {
                    cursor: 'zoom-out',
                    backgroundImage: `url(${selectedItem.url})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : { cursor: 'zoom-in' }}
                >
                  {selectedItem.type === 'video' ? (
                    <video
                      src={selectedItem.url}
                      controls
                      playsInline
                      className="modal-media"
                    />
                  ) : (
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="modal-media"
                      onClick={handleImageZoom}
                      onMouseMove={handleMouseMove}
                      style={{ opacity: isZoomed ? 0 : 1 }}
                    />
                  )}
                </div>
                <button className="nav-button prev" onClick={handlePrev}>&#10094;</button>
                <button className="nav-button next" onClick={handleNext}>&#10095;</button>
                <div className="pagination-dots">
                  {items.map((item, index) => (
                    <span
                      key={item.id}
                      className={`dot ${selectedItem.id === item.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        setIsZoomed(false);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="modal-info-section">
                <div className="modal-header">
                  <h3>{selectedItem.title}</h3>
                  {selectedItem.category && (
                    <span className="modal-category">{selectedItem.category}</span>
                  )}
                </div>
                <div className="modal-description">
                  <p>{selectedItem.description}</p>
                </div>
                {selectedItem.date && (
                  <div className="modal-footer">
                    <span className="modal-date">{selectedItem.date}</span>
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