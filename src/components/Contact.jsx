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
        <div className="contact-map">
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
        <div className="contact-info">
          <div className="contact-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Adres</h3>
            <p>Merkez Mahallesi, Spor Caddesi</p>
            <p>No: 123, Kat: 2</p>
            <p>Kağıthane/İstanbul</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-phone"></i>
            <h3>Telefon</h3>
            <p>+90 530 381 60 92</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-clock"></i>
            <h3>Çalışma Saatleri</h3>
            <p>Hafta içi: 09:00 - 22:00</p>
            <p>Hafta sonu: 10:00 - 20:00</p>
          </div>
          <div className="messaging-section">
            <div className="messaging-buttons">
              <button className="btn-whatsapp" onClick={handleWhatsApp}>
                WhatsApp
              </button>
              <button className="btn-telegram" onClick={handleTelegram}>
                Telegram
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 