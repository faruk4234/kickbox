import React from 'react';
import './Contact.css';

export const Contact = () => {
  const contactInfo = {
    address: 'Bağdat Caddesi No:123, Kadıköy, İstanbul',
    phone: '+90 532 123 45 67',
    email: 'info@kicibkox.com',
    workingHours: {
      weekdays: '09:00 - 22:00',
      weekend: '10:00 - 20:00'
    },
    socialMedia: {
      instagram: 'https://instagram.com/kicibkox',
      facebook: 'https://facebook.com/kicibkox',
      youtube: 'https://youtube.com/kicibkox'
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">İletişim</h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <i className="icon-location"></i>
            <h3>Adres</h3>
            <p>{contactInfo.address}</p>
          </div>
          <div className="info-item">
            <i className="icon-phone"></i>
            <h3>Telefon</h3>
            <p>{contactInfo.phone}</p>
          </div>
          <div className="info-item">
            <i className="icon-clock"></i>
            <h3>Çalışma Saatleri</h3>
            <p>Hafta içi: {contactInfo.workingHours.weekdays}</p>
            <p>Hafta sonu: {contactInfo.workingHours.weekend}</p>
          </div>
        </div>
        
        <div className="contact-form">
          <h3>Ücretsiz Deneme Dersi İçin</h3>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Adınız Soyadınız" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Telefon Numaranız" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="E-posta Adresiniz" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Mesajınız" rows="4"></textarea>
            </div>
            <button type="submit" className="btn-primary">Gönder</button>
          </form>
        </div>
      </div>
      
      <div className="social-media">
        <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
          <i className="icon-instagram"></i>
        </a>
        <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
          <i className="icon-facebook"></i>
        </a>
        <a href={contactInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
          <i className="icon-youtube"></i>
        </a>
      </div>
    </section>
  );
}; 