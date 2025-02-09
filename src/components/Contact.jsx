import React from 'react';
import './Contact.css';

export const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/+905303816092', '_blank');
  };

  const handleTelegram = () => {
    window.open('https://t.me/+905303816092', '_blank');
  };

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">İletişim</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Bize Ulaşın</h3>
          <p>Profesyonel kickbox eğitimi için hemen iletişime geçin.</p>
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+90 530 381 60 92</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>İstanbul, Türkiye</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div className="schedule">
                <span>Hafta içi: 09:00 - 22:00</span>
                <span>Hafta sonu: 10:00 - 20:00</span>
              </div>
            </div>
          </div>
          <div className="contact-buttons">
            <button className="btn-whatsapp" onClick={handleWhatsApp}>
              WhatsApp
            </button>
            <button className="btn-telegram" onClick={handleTelegram}>
              Telegram
            </button>
          </div>
        </div>
        <div className="contact-map">
          {/* Replace with your actual Google Maps embed code */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}; 