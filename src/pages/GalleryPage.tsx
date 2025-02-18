import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import './GalleryPage.css';

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

const galleryItems: GalleryItem[] = [
  // Grup Antrenmanı Category (5 items)
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed',
    title: 'Grup Antrenmanı',
    description: 'Haftalık grup antrenmanlarımızda sporcularımız teknik ve kondisyon çalışmaları yapıyor.',
    date: '15.03.2024',
    category: 'grup-antrenmani'
  },
  {
    id: 2,
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b',
    title: 'Grup Antrenmanı Videosu',
    description: 'Muammer Hoca eşliğinde ileri seviye teknik antrenman seansı.',
    date: '12.03.2024',
    category: 'grup-antrenmani'
  },
  // ... add more items as needed
];

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

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(filteredItems[nextIndex]);
    setIsZoomed(false);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setSelectedItem(filteredItems[prevIndex]);
    setIsZoomed(false);
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="gallery-page">
      <PageHeader title="Galeri" />
      <div className="gallery-content">
        <div className="gallery-categories">
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

        {selectedItem && (
          <div className="gallery-modal-overlay" onClick={() => setSelectedItem(null)}>
            <div className="gallery-modal">
              <button className="close-button" onClick={() => setSelectedItem(null)}>&times;</button>
              <div className="gallery-modal-content">
                <div className="modal-media-section">
                  {selectedItem.type === 'video' ? (
                    <video
                      src={selectedItem.url}
                      controls
                      playsInline
                      className="gallery-modal-media"
                    />
                  ) : (
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
                  )}
                  {filteredItems.length > 1 && (
                    <>
                      <button className="nav-button prev" onClick={handlePrevious}>
                        &#10094;
                      </button>
                      <button className="nav-button next" onClick={handleNext}>
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