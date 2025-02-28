import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import './GalleryPage.css';
import { galleryItems } from '../components/Gallery';
interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  date: string;
  category: string;
}


const GalleryPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Get unique categories and sort them
    const uniqueCategories = Array.from(new Set(galleryItems.map(item => item.category)))
      .sort((a, b) => a.localeCompare(b));
    setCategories(uniqueCategories);
  }, []);

  const filteredItems = selectedCategory
    ? galleryItems.filter(item => item.category === selectedCategory)
    : galleryItems;

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedItem(null);
    setIsZoomed(false);
  };

  const handleItemClick = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setSelectedItem(item);
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(filteredItems[nextIndex]);
    setIsZoomed(false);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setSelectedItem(filteredItems[prevIndex]);
    setIsZoomed(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay, not the content
    if (e.target === e.currentTarget) {
      setSelectedItem(null);
    }
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="gallery-page">
      <div className="page-header-wrapper">
        <PageHeader title="Galeri" />
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
                {formatCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gallery-content">
        <div className="gallery-content-inner">
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => handleItemClick(item)}
              >
                {item.type === 'video' ? (
                  <div className="video-thumbnail">
                    <img src={item.thumbnail || item.url} alt={item.title} loading="lazy" />
                    <div className="play-button"></div>
                  </div>
                ) : (
                  <img src={item.url} alt={item.title} loading="lazy" />
                )}
                <div className="gallery-item-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedItem && (
          <div className="gallery-modal-overlay" onClick={handleModalClick}>
            <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setSelectedItem(null)}>&times;</button>
              <div className="gallery-modal-content">
                <div className="modal-media-section">
                  <div 
                    className={`modal-media-container ${isZoomed ? 'zoomed' : ''}`}
                    style={isZoomed ? {
                      cursor: 'zoom-out',
                      backgroundImage: `url(${selectedItem.url})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
                    } : { cursor: 'zoom-in' }}
                  >
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="gallery-modal-media"
                      onClick={handleImageZoom}
                      onMouseMove={handleMouseMove}
                      style={{ opacity: isZoomed ? 0 : 1 }}
                    />
                  </div>
                  {filteredItems.length > 1 && (
                    <>
                      <button 
                        className="nav-button prev" 
                        onClick={handlePrevious}
                        aria-label="Previous image"
                      >
                        &#10094;
                      </button>
                      <button 
                        className="nav-button next" 
                        onClick={handleNext}
                        aria-label="Next image"
                      >
                        &#10095;
                      </button>
                      <div className="pagination-dots">
                        {filteredItems.map((_, index) => (
                          <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentIndex(index);
                              setSelectedItem(filteredItems[index]);
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
                      <h3>{selectedItem.title}</h3>
                    </div>
                    <div className="modal-description">
                      <p>{selectedItem.description}</p>
                    </div>
                    <div className="modal-footer">
                      <span className="gallery-date">{selectedItem.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage; 