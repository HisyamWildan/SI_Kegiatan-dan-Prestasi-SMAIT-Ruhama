import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { 
    DashboardContainer, 
    StatCard, 
    IconBox, 
    CardBodyStyled, 
    TextContent, 
    Label, 
    Value, 
    DetailLink, 
    HelpBox,
    HelpIconCircle
} from './Dashboard.styled';

const SiswaDashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
        revised: 0
    });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/prestasi');
                const myPrestasi = res.data.data.filter(p => p.users_id === user?.id);
                
                setStats({
                    total: myPrestasi.length,
                    approved: myPrestasi.filter(p => p.status === 'approved').length,
                    pending: myPrestasi.filter(p => p.status === 'pending').length,
                    rejected: myPrestasi.filter(p => p.status === 'rejected').length,
                    revised: myPrestasi.filter(p => p.status === 'revised').length
                });
            } catch (error) {
                console.error('Failed to fetch stats', error);
            }
        };

        fetchStats();
    }, [user?.id]);

    const cards = [
        { 
            label: 'Total Prestasi', 
            value: `${stats.total} Laporan`, 
            icon: 'bi-journal-text', 
            color: '#3b82f6', 
            bg: '#eff6ff',
            path: '/dashboardsiswa/riwayat'
        },
        { 
            label: 'Disetujui', 
            value: `${stats.approved} Prestasi`, 
            icon: 'bi-check-circle-fill', 
            color: '#10b981', 
            bg: '#ecfdf5',
            path: '/dashboardsiswa/riwayat'
        },
        { 
            label: 'Menunggu', 
            value: `${stats.pending} Verifikasi`, 
            icon: 'bi-clock-history', 
            color: '#f97316', 
            bg: '#fff7ed',
            path: '/dashboardsiswa/riwayat'
        },
        { 
            label: 'Perlu Revisi', 
            value: `${stats.revised} Laporan`, 
            icon: 'bi-pencil-square', 
            color: '#f59e0b', 
            bg: '#fffbeb',
            path: '/dashboardsiswa/riwayat'
        },
        { 
            label: 'Ditolak', 
            value: `${stats.rejected} Laporan`, 
            icon: 'bi-x-circle-fill', 
            color: '#ef4444', 
            bg: '#fef2f2',
            path: '/dashboardsiswa/riwayat'
        }
    ];

    return (
        <DashboardContainer>
            <div className="mb-4">
                <h3 className="fw-bold text-dark m-0">Halo, {user?.name}!</h3>
                <p className="text-muted small">Pantau perkembangan dan status prestasi yang Anda ajukan.</p>
            </div>
            
            <Row className="g-3">
                {cards.map((card, idx) => (
                    <Col key={idx} xs={12} sm={6} lg={3}>
                        <StatCard>
                            <CardBodyStyled>
                                <IconBox color={card.color} bg={card.bg}>
                                    <i className={`bi ${card.icon}`}></i>
                                </IconBox>
                                <TextContent>
                                    <Label>{card.label}</Label>
                                    <Value>{card.value}</Value>
                                    <DetailLink to={card.path}>
                                        Riwayat <i className="bi bi-arrow-right"></i>
                                    </DetailLink>
                                </TextContent>
                            </CardBodyStyled>
                        </StatCard>
                    </Col>
                ))}
            </Row>

            <HelpBox>
                <HelpIconCircle>
                    <i className="bi bi-info-circle-fill"></i>
                </HelpIconCircle>
                <div>
                    <h6 className="fw-bold mb-1">Butuh Bantuan?</h6>
                    <p className="text-muted m-0 small">Hubungi wali kelas atau admin sekolah jika ada kendala dalam pengajuan prestasi.</p>
                </div>
            </HelpBox>
        </DashboardContainer>
    );
};

export default SiswaDashboard;
