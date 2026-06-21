import React, { useState, useEffect } from "react";
import { Spinner, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  LandingWrapper,
  AboutSection,
  Section,
  SectionTitle,
  NewsCardWrapper,
  GridContainer,
  ViewAllButton,
} from "./LandingPage.styled";
import Container from "../../components/ui/Container";
import Hero from "../../components/Hero/Hero";
import api, { API_BASE_URL } from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";

const StyledCarousel = styled(Carousel)`
  height: 100%;
  .carousel-inner, .carousel-item {
    height: 100%;
  }
  .carousel-control-prev, .carousel-control-next {
    width: 10%;
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover .carousel-control-prev, &:hover .carousel-control-next {
    opacity: 0.5;
  }
  .carousel-indicators {
    margin-bottom: 0.5rem;
    button {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 0 3px;
    }
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [kegiatan, setKegiatan] = useState([]);
  const [prestasi, setPrestasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resKegiatan, resPrestasi] = await Promise.all([
          api.get('/kegiatan'),
          api.get('/prestasi/approved'),
        ]);

        setKegiatan(resKegiatan.data.data.slice(0, 3)); 
        setPrestasi(resPrestasi.data.data.slice(0, 3)); 
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderImages = (item) => {
    const images = [item.image, item.image2, item.image3].filter(img => img !== null);
    
    if (images.length <= 1) {
      return <img src={item.image ? `${API_BASE_URL}/storage/${item.image}` : "assets/img/placeholder.jpg"} alt={item.title} />;
    }

    return (
      <StyledCarousel controls={false} indicators={true} interval={3000} pause={false}>
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <img 
              src={`${API_BASE_URL}/storage/${img}`} 
              alt={`${item.title} ${idx + 1}`} 
              className="d-block w-100 h-100" 
              style={{ objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </StyledCarousel>
    );
  };

  return (
    <LandingWrapper>
      <Navbar />
      <main className="main">
        <Hero />

        {/* About Section */}
        <AboutSection id="about">
          <Container>
            <div className="row gy-4 align-items-center justify-content-between">
              <div className="col-lg-5 order-2 order-lg-1">
                <span className="about-meta">Mengenal Kami</span>
                <h2 className="about-title">SMAIT <span>Ruhama</span> Depok</h2>
                <p className="about-description">
                  Kami berdedikasi untuk mencetak generasi pemimpin masa depan yang berprestasi secara akademik, memiliki karakter Qur'ani yang kuat, serta berwawasan global yang siap menghadapi tantangan zaman.
                </p>
                 <div className="d-flex">
                    <div className="text-center p-3 rounded-4 bg-white shadow-sm border" style={{ minWidth: '100px' }}>
                       <h4 className="fw-bold mb-0 text-primary">100%</h4>
                       <small className="text-muted">Lulus</small>
                    </div>
                 </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
                <img
                  src="assets/img/gedung.png"
                  alt="SMAIT Ruhama Depok"
                  className="main-image"
                />
              </div>
            </div>
          </Container>
        </AboutSection>

        {/* Kegiatan Section */}
        <Section id="kegiatan" $dark>
          <Container>
            <SectionTitle>
              <h2>Kegiatan Terbaru</h2>
              <p>Melihat lebih dekat keseruan agenda akademik dan non-akademik siswa-siswi kami.</p>
            </SectionTitle>
            
            {loading ? (
              <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
              <GridContainer $count={kegiatan.length}>
                {kegiatan.map((item) => (
                  <NewsCardWrapper key={item.id} onClick={() => navigate(`/kegiatan/${item.id}`)}>
                     <div className="image-box">
                        <div className="badge-category">{item.category?.name || 'KEGIATAN'}</div>
                        {renderImages(item)}
                     </div>
                     <div className="content-box">
                        <h3 className="title">{item.title}</h3>
                        <p className="description">{item.description}</p>
                        <div className="footer">
                           <div className="info-left">
                              <i className="bi bi-geo-alt-fill"></i>
                              SMAIT Ruhama
                           </div>
                           <div className="date">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        </div>
                     </div>
                  </NewsCardWrapper>
                ))}
              </GridContainer>
            )}
            
            <div className="text-center">
               <ViewAllButton onClick={() => navigate('/kegiatan-sekolah')}>Lihat Seluruh Kegiatan</ViewAllButton>
            </div>
          </Container>
        </Section>

        {/* Prestasi Section */}
        <Section id="prestasi">
          <Container>
            <SectionTitle>
              <h2>Prestasi Siswa</h2>
              <p>Kebanggaan sekolah atas dedikasi dan kerja keras para pejuang prestasi SMAIT Ruhama.</p>
            </SectionTitle>
            
            {loading ? (
              <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
              <GridContainer $count={prestasi.length}>
                {prestasi.map((item) => (
                  <NewsCardWrapper key={item.id} onClick={() => navigate(`/prestasi/${item.id}`)}>
                     <div className="image-box">
                        <div className="badge-category" style={{ background: '#f97316' }}>{item.achievement_level || 'PRESTASI'}</div>
                        {renderImages(item)}
                     </div>
                     <div className="content-box">
                        <h3 className="title">{item.title}</h3>
                        <p className="description"><strong>{item.student_name}</strong> - {item.description}</p>
                        <div className="footer">
                           <div className="info-left">
                              <i className="bi bi-award-fill"></i>
                              {item.student_name}
                           </div>
                           <div className="date">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        </div>
                     </div>
                  </NewsCardWrapper>
                ))}
              </GridContainer>
            )}
            
            <div className="text-center">
               <ViewAllButton onClick={() => navigate('/prestasi-siswa')}>Lihat Seluruh Prestasi</ViewAllButton>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </LandingWrapper>
  );
};

export default LandingPage;