import React, { useState, useRef } from 'react';
import './Programs.css';

export const Programs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      title: 'Ücretsiz Deneme',
      description: 'Kickboks dünyasını keşfedin',
      features: ['Temel teknikler', 'Kondisyon', 'Grup dersleri']
    },
    {
      title: 'Teknik Programı',
      description: 'Tekniklerinizi geliştirin',
      features: ['Ileri teknikler', 'Sparing', 'Özel antrenman']
    },
    {
      title: 'Profesyonel',
      description: 'Yarışmalara hazırlık',
      features: ['Birebir koçluk', 'Beslenme planı', 'Yarışma hazırlığı']
    }
  ];

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
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
    if (currentSlide < programs.length - 1) {
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
    <section className="programs" id="programs">
      <h2 className="section-title">Eğitim Programları</h2>
      <div className="programs-slider-container">
        <div className="programs-container" ref={sliderRef}>
          {programs.map((program, index) => (
            <div className="program-card" key={index}>
              <h3>{program.title}</h3>
              <p className="program-description">{program.description}</p>
              <ul className="program-features">
                {program.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="btn-primary" onClick={scrollToBottom}>
                {index === 0 ? 'Ücretsiz Dene' : 'İletişime Geç'}
              </button>
            </div>
          ))}
        </div>
        
        <div className="slider-controls">
          <button 
            className="slider-button prev" 
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            aria-label="Önceki program"
          >
            ‹
          </button>
          <div className="slider-dots">
            {programs.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Program ${index + 1}`}
              />
            ))}
          </div>
          <button 
            className="slider-button next" 
            onClick={handleNext}
            disabled={currentSlide === programs.length - 1}
            aria-label="Sonraki program"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}; 