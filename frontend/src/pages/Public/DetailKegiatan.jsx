import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner, Breadcrumb, Carousel } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Container from '../../components/ui/Container';
import api from '../../services/api';
import { DetailImageWrapper, DetailHeader, DetailCard, DetailContent, BadgeWrapper, DetailTitle, DescriptionText } from './DetailKegiatan.styled';

const DetailKegiatan = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.get(`/kegiatan/${id}`);
                setItem(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Gagal mengambil detail:", error);
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div className="text-center py-5" style={{ marginTop: '100px' }}><Spinner animation="border" /></div>;
    if (!item) return <div className="text-center py-5" style={{ marginTop: '100px' }}><h3>Kegiatan tidak ditemukan</h3><Link to="/">Kembali ke Beranda</Link></div>;

    const images = [item.image, item.image2, item.image3].filter(img => img !== null);

    return (
        <div>
            <Navbar />
            <DetailHeader>
                <Container>
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Beranda</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/kegiatan-sekolah" }}>Kegiatan</Breadcrumb.Item>
                        <Breadcrumb.Item active>{item.title}</Breadcrumb.Item>
                    </Breadcrumb>

                    <DetailCard>
                        {images.length > 0 && (
                            <DetailImageWrapper>
                                {images.length === 1 ? (
                                    <img src={`http://localhost:8000/storage/${images[0]}`} alt={item.title} />
                                ) : (
                                    <Carousel interval={3000} fade>
                                        {images.map((img, idx) => (
                                            <Carousel.Item key={idx}>
                                                <img src={`http://localhost:8000/storage/${img}`} alt={`${item.title} ${idx + 1}`} />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                )}
                            </DetailImageWrapper>
                        )}
                        <DetailContent>
                            <BadgeWrapper>
                                <span className="badge bg-primary px-3 py-2 rounded-pill text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '700' }}>{item.category?.name}</span>
                                <span className="badge bg-light text-dark px-3 py-2 rounded-pill border">
                                    <i className="bi bi-calendar-event me-2 text-primary"></i>
                                    {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                                <span className="badge bg-light text-dark px-3 py-2 rounded-pill border">
                                    <i className="bi bi-geo-alt me-2 text-primary"></i>
                                    {item.location || 'SMAIT Ruhama Depok'}
                                </span>
                            </BadgeWrapper>
                            <DetailTitle>{item.title}</DetailTitle>
                            <DescriptionText>
                                {item.description}
                            </DescriptionText>
                        </DetailContent>
                    </DetailCard>
                </Container>
            </DetailHeader>
            <Footer />
        </div>
    );
};

export default DetailKegiatan;
