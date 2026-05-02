import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Button, Offcanvas, Navbar, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import api from '../services/api';

const MainWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f1f5f9;
`;

const SidebarWrapper = styled.div`
  width: 280px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  transition: all 0.3s ease;
  z-index: 1000;

  @media (max-width: 991px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  text-align: center;
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
`;

const UserProfile = styled.div`
  padding: 1rem;
  background: #f8fafc;
  margin: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: #f97316;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  flex: 1;
  overflow: hidden;
  h6 {
    margin: 0;
    font-weight: 600;
    color: #1e293b;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  small {
    color: #64748b;
    font-size: 0.75rem;
    text-transform: capitalize;
  }
`;

const NavList = styled.nav`
  flex: 1;
  padding: 1rem;
`;

const StyledNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.875rem 1rem;
  color: ${props => props.active ? '#f97316' : '#64748b'};
  text-decoration: none !important;
  font-weight: ${props => props.active ? '600' : '500'};
  background: ${props => props.active ? '#fff7ed' : 'transparent'};
  border-radius: 10px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #fff7ed;
    color: #f97316;
  }
`;

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #f1f5f9;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
`;

const TopBar = styled.header`
  height: 70px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 999;

  @media (max-width: 991px) {
    padding: 0 1rem;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FooterStyled = styled.footer`
  padding: 1.5rem 2rem;
  background: transparent;
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: left; /* Rata Kiri */
`;

const SearchWrapper = styled.div`
  max-width: 400px;
  width: 100%;

  @media (max-width: 576px) {
    display: none;
  }
`;

const DashboardLayout = () => {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const adminLinks = [
        { path: '/dashboard/admin', label: 'Dashboard', icon: 'bi-grid-fill' },
        { path: '/dashboard/user', label: 'Manajemen User', icon: 'bi-people-fill' },
        { path: '/dashboard/categories', label: 'Kategori', icon: 'bi-tags-fill' },
        { path: '/dashboard/kegiatan', label: 'Kegiatan', icon: 'bi-calendar-event-fill' },
        { path: '/dashboard/prestasi', label: 'Prestasi', icon: 'bi-trophy-fill' },
    ];

    const guruLinks = [
        { path: '/dashboardguru/guru', label: 'Dashboard', icon: 'bi-grid-fill' },
        { path: '/dashboardguru/kegiatan', label: 'Kegiatan', icon: 'bi-calendar-event-fill' },
        { path: '/dashboardguru/prestasi', label: 'Prestasi', icon: 'bi-trophy-fill' },
        { path: '/dashboardguru/verification', label: 'Verifikasi', icon: 'bi-check-circle-fill' },
    ];

    const siswaLinks = [
        { path: '/dashboardsiswa/siswa', label: 'Dashboard', icon: 'bi-grid-fill' },
        { path: '/dashboardsiswa/prestasi', label: 'Upload Prestasi', icon: 'bi-cloud-arrow-up-fill' },
        { path: '/dashboardsiswa/riwayat', label: 'Riwayat Saya', icon: 'bi-clock-history' },
    ];

    let links = [];
    if (user?.role === 'admin') links = adminLinks;
    if (user?.role === 'guru') links = guruLinks;
    if (user?.role === 'siswa') links = siswaLinks;

    const SidebarContent = () => (
        <>
            <SidebarHeader>
                <Link to="/"><LogoImage src="/assets/img/logoruhama.png" alt="Logo Ruhama" /></Link>
            </SidebarHeader>

            <UserProfile>
                <UserAvatar>{user?.name?.charAt(0).toUpperCase()}</UserAvatar>
                <UserInfo>
                    <h6>{user?.name}</h6>
                    {user?.name?.toLowerCase() !== user?.role?.toLowerCase() && (
                        <small>{user?.role}</small>
                    )}
                </UserInfo>
            </UserProfile>

            <NavList>
                {links.map((link) => (
                    <StyledNavLink 
                        key={link.path} 
                        to={link.path} 
                        active={location.pathname === link.path ? 1 : 0}
                        onClick={() => setShowMobileNav(false)}
                    >
                        <i className={`bi ${link.icon}`}></i>
                        {link.label}
                    </StyledNavLink>
                ))}
            </NavList>

            <SidebarFooter>
                <Button 
                    variant="link" 
                    className="w-100 text-danger text-decoration-none d-flex align-items-center gap-2 px-3 py-2 border rounded-3"
                    onClick={handleLogout}
                    style={{ transition: 'all 0.2s' }}
                >
                    <i className="bi bi-box-arrow-left"></i>
                    <span className="fw-bold">Keluar</span>
                </Button>
            </SidebarFooter>
        </>
    );

    return (
        <MainWrapper>
            {/* Desktop Sidebar */}
            <SidebarWrapper>
                <SidebarContent />
            </SidebarWrapper>

            <ContentWrapper>
                <TopBar>
                    <div className="d-flex align-items-center gap-3">
                        <Button 
                            variant="link" 
                            className="p-0 text-dark d-lg-none" 
                            onClick={() => setShowMobileNav(true)}
                        >
                            <i className="bi bi-list fs-3"></i>
                        </Button>
                        <SearchWrapper>
                            <InputGroup className="bg-light rounded-pill overflow-hidden border-0">
                                <InputGroup.Text className="bg-light border-0 ps-3">
                                    <i className="bi bi-search text-muted"></i>
                                </InputGroup.Text>
                                <Form.Control 
                                    placeholder="Cari data..." 
                                    className="bg-light border-0 py-2 shadow-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </InputGroup>
                        </SearchWrapper>
                    </div>

                    <div className="d-flex align-items-center gap-2 gap-md-4">
                        <Link to="/" className="text-decoration-none">
                            <Button variant="outline-dark" size="sm" className="rounded-pill px-3 d-flex align-items-center gap-2 border-0 shadow-none hover-bg-light">
                                <i className="bi bi-house-door"></i>
                                <span className="d-none d-sm-inline">Beranda</span>
                            </Button>
                        </Link>
                        
                        <div className="d-flex align-items-center gap-2 ps-3 border-start">
                            <div className="d-none d-md-block text-end">
                                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{user?.name}</div>
                                {user?.name?.toLowerCase() !== user?.role?.toLowerCase() && (
                                    <div className="text-muted text-capitalize" style={{ fontSize: '0.75rem' }}>{user?.role}</div>
                                )}
                            </div>
                            <UserAvatar style={{ width: '38px', height: '38px', fontSize: '1rem' }}>
                                {user?.name?.charAt(0).toUpperCase()}
                            </UserAvatar>
                        </div>
                    </div>
                </TopBar>

                <ContentArea>
                    <Outlet />
                </ContentArea>

                <FooterStyled>
                    &copy; {new Date().getFullYear()} SMAIT Ruhama | All Rights Reserved
                </FooterStyled>
            </ContentWrapper>

            {/* Mobile Sidebar (Offcanvas) */}
            <Offcanvas show={showMobileNav} onHide={() => setShowMobileNav(false)} style={{ width: '280px' }}>
                <Offcanvas.Body className="p-0 d-flex flex-column">
                    <SidebarContent />
                </Offcanvas.Body>
            </Offcanvas>
        </MainWrapper>
    );
};

export default DashboardLayout;
