import React from 'react';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">KİCİBKOX</h1>
        <p className="hero-subtitle">Gücünü Keşfet, Limitlerini Aş</p>
        <div className="hero-cta">
          <button className="btn-primary">Ücretsiz Deneme Dersi</button>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
}; 