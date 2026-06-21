import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner, Breadcrumb, Carousel } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Container from '../../components/ui/Container';
import api, { API_BASE_URL } from '../../services/api';
import styled from 'styled-components';

import { StyledCarousel, DetailHeader, DetailCard, DetailContent, BadgeWrapper, DetailTitle, InfoBox, DescriptionText } from './DetailPrestasi.styled';

const DetailPrestasi = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.get(`/prestasi/${id}`);
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
    if (!item) return <div className="text-center py-5" style={{ marginTop: '100px' }}><h3>Prestasi tidak ditemukan</h3><Link to="/">Kembali ke Beranda</Link></div>;

    const docImages = [item.image, item.image2, item.image3].filter(img => img !== null);

    return (
        <div>
            <Navbar />
            <DetailHeader>
                <Container>
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Beranda</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/prestasi-siswa" }}>Prestasi</Breadcrumb.Item>
                        <Breadcrumb.Item active>{item.title}</Breadcrumb.Item>
                    </Breadcrumb>

                    <DetailCard>
                        <div className="row justify-content-center g-0">
                            {docImages.length > 0 && (
                                <div className="col-12">
                                    <div className="p-3">
                                        {docImages.length === 1 ? (
                                            <img 
                                                src={`${API_BASE_URL}/storage/${docImages[0]}`} 
                                                alt={item.title} 
                                                className="w-100 rounded-3 shadow-sm" 
                                                style={{ height: '500px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <StyledCarousel interval={3000} fade controls={true} style={{ height: '500px' }}>
                                                {docImages.map((img, idx) => (
                                                    <Carousel.Item key={idx}>
                                                        <img src={`${API_BASE_URL}/storage/${img}`} alt={`${item.title} ${idx + 1}`} style={{ height: '500px' }} />
                                                    </Carousel.Item>
                                                ))}
                                            </StyledCarousel>
                                        )}
                                        <div className="text-center mt-3 small text-muted fw-bold">DOKUMENTASI KEGIATAN</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <DetailContent>
                            <BadgeWrapper>
                                <span className="badge px-3 py-2 rounded-pill" style={{ backgroundColor: '#f97316', color: 'white' }}>{item.achievement_level || 'PRESTASI'}</span>
                                <span className="badge px-3 py-2 rounded-pill text-capitalize" style={{ backgroundColor: item.type === 'kelompok' ? '#0ea5e9' : '#64748b', color: 'white' }}>
                                    {item.type || 'individu'}
                                </span>
                                <span className="badge bg-light text-dark px-3 py-2 rounded-pill border">
                                    <i className="bi bi-person-fill me-2 text-primary"></i>
                                    {item.student_name}
                                </span>
                                <span className="badge bg-light text-dark px-3 py-2 rounded-pill border">
                                    <i className="bi bi-calendar-check me-2 text-primary"></i>
                                    {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </BadgeWrapper>
                            <DetailTitle>{item.title}</DetailTitle>
                            <InfoBox>
                                <p>
                                    <i className="bi bi-award-fill me-2 text-warning"></i>
                                    Tingkat: {item.achievement_level || '-'}
                                </p>
                            </InfoBox>
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

export default DetailPrestasi;
