import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/ui/Container";
import { SectionTitle } from "./LandingPage.styled";
import { PageWrapper, HeroSection, ContentSection, CardWrapper, AboutImage, TextContent, ListWrapper, OrderedListWrapper, ContactSection } from './TentangKami.styled';

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
                    <AboutImage src="/assets/img/gedung.png" alt="SMAIT Ruhama" />
                 </div>
                 <div className="col-lg-6">
                    <TextContent>
                       <h2 className="fw-bold mb-3">Visi</h2>
                       <p className="mb-4">
                          Sekolah unggul yang menyiapkan pemimpin masa depan berjiwa wirausaha, berprestasi, berwawasan global. dan berkarakter Qur’an
                       </p>
                       <h2 className="fw-bold mb-3">Misi</h2>
                       <OrderedListWrapper>
                          <li>Menciptakan lingkungan belajar yang menumbuhkan rasa cinta, mengamalkan, dan mampu mendakwahakan Al-Qur’an.</li>
                          <li>Memfasilitasi pembentukan mental dan pola pikir, serta pengembangan pengetahuan dan keterampilan kewirausahaan pada siswa.</li>
                          <li>Mewujudkan lingkungan belajar yang ramah terhadap perbedaan cara pandang, berfikir, dan bersikap terhadap isu Global.</li>
                          <li>Menyelenggarakan aktivitas belajar yang dapat menumbuhkan kepedulian dan tanggung jawab terhadap isu Global.</li>
                          <li>Memfasilitasi berkembangnya keterampilan berbahasa internasional dan penguasaan teknologi informasi.</li>
                          <li>Menerapkan tata kelola kurikulum dan pembelajaran yang modern untuk membangun sikap dan keterampilan belajar guna mendukung pencapaian prestasi dan potensi kepemimpinan yang optimal.</li>
                       </OrderedListWrapper>
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
