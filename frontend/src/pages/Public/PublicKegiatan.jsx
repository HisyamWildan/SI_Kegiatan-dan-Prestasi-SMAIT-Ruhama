import React, { useState, useEffect } from "react";
import { Spinner, Form, InputGroup, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Container from "../../components/ui/Container";
import api, { API_BASE_URL } from "../../services/api";
import { NewsCardWrapper, LandingWrapper } from "./LandingPage.styled";
import { StyledCarousel, HeaderBanner, FilterWrapper, PageSection, EmptyState } from "./PublicKegiatan.styled";

const PublicKegiatan = () => {
  const navigate = useNavigate();
  const [kegiatan, setKegiatan] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resKegiatan, resCats] = await Promise.all([
          api.get('/kegiatan'),
          api.get('/categories?type=kegiatan')
        ]);
        setKegiatan(resKegiatan.data.data);
        setCategories(resCats.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredItems = kegiatan.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.categories_id === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const renderActivityImages = (item) => {
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
      {/* Header Banner */}
      <HeaderBanner>
         <Container>
            <h1>Kegiatan Sekolah</h1>
            <p>Temukan berbagai agenda seru dan bermanfaat di SMAIT Ruhama Depok.</p>
            
            {/* Search & Filter Bar */}
            <FilterWrapper>
                <div className="row g-3">
                   <div className="col-md-6">
                      <InputGroup className="shadow-lg border-0 rounded-pill overflow-hidden h-100">
                         <InputGroup.Text className="bg-white border-0 ps-4">
                            <i className="bi bi-search text-muted"></i>
                         </InputGroup.Text>
                         <Form.Control
                            placeholder="Cari kegiatan..."
                            className="border-0 py-3"
                            style={{ height: '56px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                         />
                      </InputGroup>
                   </div>
                   <div className="col-md-6">
                      <Form.Select 
                         className="shadow-lg border-0 rounded-pill py-3 px-4 fw-bold h-100"
                         style={{ height: '56px' }}
                         value={selectedCategory}
                         onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                         <option value="all">Semua Kategori</option>
                         {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                         ))}
                      </Form.Select>
                   </div>
                </div>
            </FilterWrapper>
         </Container>
      </HeaderBanner>

      <PageSection>
        <Container>
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Memuat data...</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                  <NewsCardWrapper onClick={() => navigate(`/kegiatan/${item.id}`)}>
                    <div className="image-box">
                      <div className="badge-category">{item.category?.name || 'KEGIATAN'}</div>
                      {renderActivityImages(item)}
                    </div>
                    <div className="content-box">
                      <h3 className="title">{item.title}</h3>
                      <p className="description">{item.description}</p>
                      <div className="footer">
                        <div className="info-left">
                          <i className="bi bi-info-circle-fill"></i>
                          {item.category?.name}
                        </div>
                        <div className="date">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      </div>
                    </div>
                  </NewsCardWrapper>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <EmptyState>
                   <i className="bi bi-search"></i>
                   <p>Tidak ada kegiatan yang ditemukan.</p>
                </EmptyState>
              )}
            </div>
          )}
        </Container>
      </PageSection>
      <Footer />
    </LandingWrapper>
  );
};

export default PublicKegiatan;
