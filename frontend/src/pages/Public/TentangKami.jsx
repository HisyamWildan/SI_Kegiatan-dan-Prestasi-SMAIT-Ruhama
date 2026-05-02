import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/ui/Container";
import { SectionTitle } from "./LandingPage.styled";
import { PageWrapper, HeroSection, ContentSection, CardWrapper, AboutImage, TextContent, ListWrapper, ContactSection } from './TentangKami.styled';

const TentangKami = () => {
  return (
    <PageWrapper>
      <Navbar />
      <HeroSection>
         <Container>
            <h1>Tentang SMAIT Ruhama</h1>
            <p className="lead">Mencetak Generasi Berakhlak Mulia, Cerdas, dan Berprestasi.</p>
         </Container>
      </HeroSection>

      <ContentSection>
         <Container>
            <CardWrapper>
               <div className="row g-0">
                 <div className="col-lg-6">
                    <AboutImage src="/assets/img/hero_bg.jpg" alt="SMAIT Ruhama" />
                 </div>
                 <div className="col-lg-6">
                    <TextContent>
                       <h2>Visi & Misi Kami</h2>
                       <p>
                          Menjadi lembaga pendidikan Islam terpadu yang unggul dalam melahirkan generasi yang memiliki kedalaman spiritual, keluhuran akhlak, dan kemapanan intelektual.
                       </p>
                       <h5 className="fw-bold mb-3">Misi Kami:</h5>
                       <ListWrapper>
                          <li>Menyelenggarakan pendidikan berbasis karakter Islami.</li>
                          <li>Mengembangkan potensi akademik dan non-akademik siswa secara optimal.</li>
                          <li>Mewujudkan lingkungan belajar yang kondusif, kreatif, dan inovatif.</li>
                          <li>Membangun kemitraan yang kuat dengan orang tua dan masyarakat.</li>
                       </ListWrapper>
                    </TextContent>
                 </div>
               </div>
            </CardWrapper>
         </Container>
      </ContentSection>

      <ContactSection id="contact">
         <Container>
            <SectionTitle>
               <h2>Hubungi Kami</h2>
               <p>Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut.</p>
            </SectionTitle>
            <div className="row g-4 mt-4">
               <div className="col-md-4">
                  <div className="contact-card">
                     <i className="bi bi-geo-alt-fill"></i>
                     <h5>Alamat</h5>
                     <p>Jl. Raya Tapos No. 123, Depok, Jawa Barat</p>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="contact-card">
                     <i className="bi bi-telephone-fill"></i>
                     <h5>Telepon</h5>
                     <p>+62 21 1234 5678</p>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="contact-card">
                     <i className="bi bi-envelope-fill"></i>
                     <h5>Email</h5>
                     <p>info@smaitruhama.sch.id</p>
                  </div>
               </div>
            </div>
         </Container>
      </ContactSection>

      <Footer />
    </PageWrapper>
  );
};

export default TentangKami;
