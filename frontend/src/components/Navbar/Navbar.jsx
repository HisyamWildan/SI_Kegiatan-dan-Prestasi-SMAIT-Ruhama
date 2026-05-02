import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HeaderContainer,
  HeaderWrapper,
  LogoLink,
  LogoImg,
  NavMenu,
  NavList,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./Navbar.styled";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
    window.location.reload();
  };

  const getDashboardLink = () => {
    if (userRole === 'admin') return "/dashboard/admin";
    if (userRole === 'guru') return "/dashboardguru/guru";
    if (userRole === 'siswa') return "/dashboardsiswa/siswa";
    return "/login";
  };

  return (
    <HeaderWrapper>
      <HeaderContainer isScrolled={isScrolled}>
        <LogoLink to="/">
          <div style={{ display: "flex", alignItems: "center" }}>
            <LogoImg src="/assets/img/logoruhama.png" alt="logo" />
          </div>
        </LogoLink>

        <button
          className={`mobile-nav-toggle ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="bi bi-list"></i>
        </button>

        <NavMenu>
          <NavList $isOpen={isMobileMenuOpen}>
            <NavItem>
              <NavLink $active={isActive("/")} to="/">
                Beranda
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/tentang-kami" $active={isActive("/tentang-kami")}>
                Tentang Kami
              </NavLink>
            </NavItem>

            <Dropdown>
              <DropdownToggle
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFeatureOpen(!isFeatureOpen);
                }}
              >
                Informasi <i className="bi bi-chevron-down" />
              </DropdownToggle>

              <DropdownMenu $isOpen={isFeatureOpen}>
                <DropdownItem>
                  <NavLink to="/kegiatan-sekolah">Kegiatan Sekolah</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/prestasi-siswa">Prestasi Siswa</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {!userName ? (
              <NavItem>
                <NavLink to="/login" style={{ backgroundColor: '#f97316', color: '#fff', borderRadius: '50px', padding: '8px 24px', fontWeight: '700' }}>Login / Daftar</NavLink>
              </NavItem>
            ) : (
              <Dropdown style={{ position: "relative" }}>
                <DropdownToggle
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                  }}
                  $user
                >
                  <i className="bi bi-person-circle me-1" />
                  {userName}
                  <i className="bi bi-chevron-down ms-1" />
                </DropdownToggle>

                <DropdownMenu $user $isOpen={isUserDropdownOpen}>
                  <DropdownItem>
                    <NavLink to={getDashboardLink()}>
                      Dashboard
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink as="button" onClick={handleLogout} style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}>
                      Logout
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </NavList>
        </NavMenu>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Navbar;