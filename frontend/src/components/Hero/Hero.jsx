import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeroSection,
  HeroOverlay,
  HeroContainer,
  HeroContent,
  HeroTopTitle,
  HeroMainTitle,
  HeroDescription,
} from "./Hero.styled";

export default function Hero() {
  const images = [
    "/assets/img/guru.png",
    "/assets/img/murid.png"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Ganti foto setiap 5 detik

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <HeroSection $bg={images[currentImageIndex]}>
      <HeroOverlay />

      <HeroContainer>
        <HeroContent>
          <HeroTopTitle>
            SISTEM INFORMASI SEKOLAH
          </HeroTopTitle>

          <HeroMainTitle>
            KEGIATAN DAN PRESTASI
            <br />
            SEKOLAH BERBASIS WEB
          </HeroMainTitle>

          <HeroDescription>
            Platform untuk pengelolaan dan publikasi kegiatan serta prestasi siswa secara efektif dan terstruktur.
          </HeroDescription>
        </HeroContent>
      </HeroContainer>
      
      {/* Slide Indicators */}
      <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: '3'
      }}>
          {images.map((_, index) => (
              <div 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                      width: currentImageIndex === index ? '30px' : '10px',
                      height: '10px',
                      borderRadius: '10px',
                      background: 'white',
                      opacity: currentImageIndex === index ? '1' : '0.5',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                  }}
              />
          ))}
      </div>
    </HeroSection>
  );
}