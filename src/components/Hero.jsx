import React from 'react';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">MUAMMER HOCA İLE KICKBOX</h1>
        <p className="hero-subtitle">Güç ve Disiplin ile Zirveye</p>
        <div className="hero-cta">
          <button className="btn-primary">Ücretsiz Deneme Dersi</button>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
}; 