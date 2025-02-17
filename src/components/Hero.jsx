import React, { useState } from 'react';
import './Hero.css';

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const heroMedia = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed'
    },
    {
      type: 'video',
      url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1615117972428-28de87cf22d4'
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroMedia.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === heroMedia.length - 1 ? 0 : prev + 1));
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/+905303816092', '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/+905303816092', '_blank');
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-media">
          <div className="media-carousel">
            {heroMedia[currentIndex].type === 'video' ? (
              <video
                src={heroMedia[currentIndex].url}
                autoPlay
                muted
                loop
                playsInline
                className="media-item"
              />
            ) : (
              <img
                src={heroMedia[currentIndex].url}
                alt=""
                className="media-item"
              />
            )}
            {heroMedia.length > 1 && (
              <>
                <button className="carousel-button prev" onClick={handlePrevious}>
                  ‹
                </button>
                <button className="carousel-button next" onClick={handleNext}>
                  ›
                </button>
                <div className="carousel-dots">
                  {heroMedia.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">MUAMMER HOCA ILE CESUR KICKBOX</h1>
          <p className="hero-subtitle">Güç ve Disiplin ile Zirveye</p>
          <h2 className="hero-section-title">Bizi Tanı</h2>
          <div className="hero-description">
            <p>Profesyonel eğitmenlerimiz ve modern tesislerimizle kickboks dünyasına adım atın. Hem fiziksel hem mental gelişiminiz için özel programlar sunuyoruz.</p>
            <p>Başlangıç seviyesinden profesyonel seviyeye kadar her düzeyde eğitim imkanı.</p>
          </div>
          <div className="hero-cta">
            <button className="btn-primary" onClick={scrollToBottom}>
              Kayıt Ol
            </button>
            <div className="contact-buttons">
              <button className="btn-whatsapp" onClick={handleWhatsApp}>
                <i className="fab fa-whatsapp"></i> WhatsApp
              </button>
              <button className="btn-telegram" onClick={handleTelegram}>
                <i className="fab fa-telegram"></i> Telegram
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
}; 