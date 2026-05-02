import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  overflow: hidden;
`;

const StatCard = styled(Card)`
  border: none;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.04);
  transition: all 0.2s ease;
  background: white;
  height: 110px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.07);
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  background: ${props => props.bg || '#f1f5f9'};
  color: ${props => props.color || '#64748b'};
  flex-shrink: 0;
`;

const CardBodyStyled = styled(Card.Body)`
  display: flex;
  align-items: center;
  padding: 1.25rem !important;
  gap: 15px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 2px;
`;

const Value = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 4px;
`;

const DetailLink = styled(Link)`
  font-size: 0.75rem;
  color: #f97316;
  text-decoration: none !important;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    text-decoration: underline !important;
  }
`;

const GuruDashboard = () => {
    const [stats, setStats] = useState({
        kegiatan: 0,
        prestasi: 0,
        pending_verifikasi: 0
    });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [resKegiatan, resPrestasi] = await Promise.all([
                    api.get('/kegiatan'),
                    api.get('/prestasi')
                ]);

                const allKegiatan = resKegiatan.data.data || [];
                const allPrestasi = resPrestasi.data.data || [];

                setStats({
                    kegiatan: allKegiatan.length,
                    prestasi: allPrestasi.length,
                    pending_verifikasi: allPrestasi.filter(p => p.status === 'pending').length
                });
            } catch (error) {
                console.error('Failed to fetch stats', error);
            }
        };

        fetchStats();
    }, [user?.id]);

    const cards = [
        { 
            label: 'Total Kegiatan', 
            value: `${stats.kegiatan} Konten`, 
            icon: 'bi-calendar-event-fill', 
            color: '#3b82f6', 
            bg: '#eff6ff',
            path: '/dashboardguru/kegiatan'
        },
        { 
            label: 'Total Prestasi', 
            value: `${stats.prestasi} Laporan`, 
            icon: 'bi-trophy-fill', 
            color: '#8b5cf6', 
            bg: '#f5f3ff',
            path: '/dashboardguru/prestasi'
        },
        { 
            label: 'Verifikasi', 
            value: `${stats.pending_verifikasi} Pending`, 
            icon: 'bi-patch-check-fill', 
            color: '#f97316', 
            bg: '#fff7ed',
            path: '/dashboardguru/verification'
        }
    ];

    return (
        <DashboardContainer>
            <div className="mb-4">
                <h3 className="fw-bold text-dark m-0">Halo, Bapak/Ibu {user?.name}!</h3>
                <p className="text-muted small">Selamat datang di Dashboard Guru SMAIT Ruhama Depok.</p>
            </div>
            
            <Row className="g-3">
                {cards.map((card, idx) => (
                    <Col key={idx} xs={12} sm={6} lg={4}>
                        <StatCard>
                            <CardBodyStyled>
                                <IconBox color={card.color} bg={card.bg}>
                                    <i className={`bi ${card.icon}`}></i>
                                </IconBox>
                                <TextContent>
                                    <Label>{card.label}</Label>
                                    <Value>{card.value}</Value>
                                    <DetailLink to={card.path}>
                                        Manage <i className="bi bi-arrow-right"></i>
                                    </DetailLink>
                                </TextContent>
                            </CardBodyStyled>
                        </StatCard>
                    </Col>
                ))}
            </Row>
        </DashboardContainer>
    );
};

export default GuruDashboard;
