import React from 'react';
import './Programs.css';

export const Programs = () => {
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

  return (
    <section className="programs" id="programs">
      <h2 className="section-title">Eğitim Programları</h2>
      <div className="programs-container">
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
    </section>
  );
}; 