import React from 'react';
import ImageSlider from './ImageSlider';
import '../styles/WomensClass.css';

export const WomensClass: React.FC = () => {
  const sliderItems = [
    {
      id: 1,
      type: 'image' as const,
      url: "https://images.unsplash.com/photo-1593352216894-89108a0d2653?q=80&w=1200&auto=format&fit=crop",
      title: "Kadınlar için Özel Kickbox Dersleri",
      description: "Kadınlara özel tasarlanmış kickbox programımızda, güvenli ve destekleyici bir ortamda kendinizi geliştirin. Deneyimli kadın eğitmenlerimiz eşliğinde, kendi hızınızda ilerleyin.",
      category: "Kadınlara Özel",
      date: "2024-03-01"
    },
    {
      id: 2,
      type: 'image' as const,
      url: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1200&auto=format&fit=crop",
      title: "Güçlendirici Antrenmanlar",
      description: "Vücut direncini artıran, kas yapısını güçlendiren ve esneklik kazandıran özel antrenman programları. Her seviyeye uygun egzersizlerle forma girin.",
      category: "Fitness",
      date: "2024-03-02"
    },
    {
      id: 3,
      type: 'image' as const,
      url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200&auto=format&fit=crop",
      title: "Teknik Gelişim",
      description: "Kickbox tekniklerini adım adım öğrenin. Doğru duruş, vuruş teknikleri ve savunma stratejileri ile kendinizi korumayı öğrenin.",
      category: "Teknik Eğitim",
      date: "2024-03-03"
    },
    {
      id: 4,
      type: 'image' as const,
      url: "https://images.pexels.com/photos/4162550/pexels-photo-4162550.jpeg?auto=compress&w=1200",
      title: "Kondisyon ve Dayanıklılık",
      description: "Yüksek tempolu kardio egzersizleri ile kondisyonunuzu artırın. Dayanıklılık ve güç dengesini yakalayın.",
      category: "Kardio",
      date: "2024-03-04"
    },
    {
      id: 5,
      type: 'image' as const,
      url: "https://images.pexels.com/photos/4162548/pexels-photo-4162548.jpeg?auto=compress&w=1200",
      title: "Özgüven Geliştirme",
      description: "Kickbox eğitimi ile sadece fiziksel değil, mental olarak da güçlenin. Özgüveninizi artırın ve stresle başa çıkmayı öğrenin.",
      category: "Mental Gelişim",
      date: "2024-03-05"
    },
    {
      id: 6,
      type: 'image' as const,
      url: "https://images.pexels.com/photos/4162452/pexels-photo-4162452.jpeg?auto=compress&w=1200",
      title: "Profesyonel Eğitim",
      description: "Uzman eğitmenlerimizle birebir çalışma imkanı. Size özel hazırlanmış programlarla hedeflerinize ulaşın.",
      category: "Özel Ders",
      date: "2024-03-06"
    }
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
          <div className="slider-section">
            <ImageSlider items={sliderItems} />
          </div>
        </div>
      </div>
    </section>
  );
}; 