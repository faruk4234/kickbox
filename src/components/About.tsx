import React from 'react';
import './About.css';

export const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <h2 className="section-title">Muammer Hoca ile Kickbox</h2>
        <div className="about-content">
          <div className="about-text">
            <p>20 yılı aşkın tecrübemizle, İstanbul'un kalbinde profesyonel kickboks eğitimi veriyoruz. Muammer Hoca liderliğinde, her seviyeden öğrenciye özel programlar sunuyoruz.</p>
            <ul className="about-features">
              <li>✓ Profesyonel Eğitmenler</li>
              <li>✓ Modern Ekipmanlar</li>
              <li>✓ Özel Ders Imkanı</li>
              <li>✓ Esnek Program</li>
            </ul>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c" 
              alt="Muammer Hoca" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}; 