import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/ImageSlider.css';

interface ImageSliderProps {
  images: string[];
  aspectRatio?: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, aspectRatio = '1' }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="image-slider"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="slider-image-container" style={{ aspectRatio }}>
            <img src={image} alt={`Slide ${index + 1}`} loading="lazy" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}; 