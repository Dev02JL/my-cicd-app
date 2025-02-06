"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function ImageCarousel() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        }
      })
      .catch((err) => console.error("Erreur chargement images :", err));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // ✅ Espacement entre les images
        slidesPerView={4} // ✅ Afficher 4 images en même temps
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // ✅ Défilement lent (3s)
        loop
        className="rounded-lg shadow-lg"
      >
        {images.map((fileName, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/images/${fileName}`}
              alt={`Slide ${index + 1}`}
              width={600} // ✅ Adapter la taille pour 4 images visibles
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}