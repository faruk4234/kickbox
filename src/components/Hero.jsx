import React from 'react';
import './Hero.css';

export const Hero = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/+905303816092', '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/+905303816092', '_blank');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">MUAMMER HOCA ILE CESUR KICKBOX</h1>
        <p className="hero-subtitle">Güç ve Disiplin ile Zirveye</p>
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
      <div className="hero-overlay"></div>
    </section>
  );
}; 