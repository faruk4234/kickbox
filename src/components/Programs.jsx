import React from 'react';
import './Programs.css';

export const Programs = () => {
  const programs = [
    {
      title: 'Başlangıç Programı',
      description: 'Kickboks temellerini öğrenin',
      price: '500₺/ay',
      features: ['Temel teknikler', 'Kondisyon', 'Grup dersleri']
    },
    {
      title: 'İleri Seviye',
      description: 'Tekniklerinizi geliştirin',
      price: '750₺/ay',
      features: ['İleri teknikler', 'Sparing', 'Özel antrenman']
    },
    {
      title: 'Profesyonel',
      description: 'Yarışmalara hazırlık',
      price: '1000₺/ay',
      features: ['Birebir koçluk', 'Beslenme planı', 'Yarışma hazırlığı']
    }
  ];

  return (
    <section className="programs" id="programs">
      <h2 className="section-title">Eğitim Programları</h2>
      <div className="programs-container">
        {programs.map((program, index) => (
          <div className="program-card" key={index}>
            <h3>{program.title}</h3>
            <p className="program-description">{program.description}</p>
            <div className="program-price">{program.price}</div>
            <ul className="program-features">
              {program.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="btn-primary">Kayıt Ol</button>
          </div>
        ))}
      </div>
    </section>
  );
}; 