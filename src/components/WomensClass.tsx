import React from 'react';
import '../styles/WomensClass.css';

export const WomensClass: React.FC = () => {
  const classImages = [
    "https://images.unsplash.com/photo-1593352216894-89108a0d2653?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop",
    "https://images.pexels.com/photos/4162550/pexels-photo-4162550.jpeg?auto=compress&w=800",
  ];

  return (
    <section className="womens-class" id="womens-class">
      <div className="container">
        <div className="content">
          <div className="text-content">
            <h2>KADINLAR İÇİN KİCKBOX</h2>
            <p>
              Kadınlar için özel olarak tasarlanmış kickbox programımızla kendinizi güçlendirin. 
              Profesyonel eğitmenlerimiz eşliğinde, güvenli ve motive edici bir ortamda antrenman yapın.
            </p>
            <p>
              Her seviyeye uygun programlarımızla, hem fiziksel kondisyonunuzu geliştirebilir 
              hem de kendinizi savunma tekniklerini öğrenebilirsiniz. Size özel hazırlanmış 
              antrenman programları ile hedeflerinize ulaşmanıza yardımcı oluyoruz.
            </p>
            <ul className="benefits">
              <li>Özel kadın antrenman programları</li>
              <li>Güvenli ve destekleyici ortam</li>
              <li>Profesyonel kadın eğitmenler</li>
              <li>Kişiye özel antrenman planları</li>
            </ul>
          </div>
          <div className="image-grid">
            {classImages.map((image, index) => (
              <div key={index} className="image-container">
                <img src={image} alt={`Kadınlar kickbox ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 