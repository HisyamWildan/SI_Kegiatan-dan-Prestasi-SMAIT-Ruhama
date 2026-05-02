import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 997;
  padding: 8px 0;
`;

export const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  padding: ${({ isScrolled }) =>
    isScrolled ? "6px 20px" : "10px 20px"};

  /* TRANSPARANSI */
  background: ${({ isScrolled }) =>
    isScrolled
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(255, 255, 255, 1)"};

  border-radius: 22px;

  border: 1px solid
    ${({ isScrolled }) =>
      isScrolled
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(226, 232, 240, 1)"};

  box-shadow: ${({ isScrolled }) =>
    isScrolled
      ? "0 6px 20px rgba(0,0,0,0.08)"
      : "0 4px 20px rgba(0,0,0,0.08)"};

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: all 0.3s ease;

  .mobile-nav-toggle {
    display: none;
    color: #334155;
    order: 2; /* Push to end */

    @media (max-width: 1199px) {
      display: block;
      background: none;
      border: none;
      font-size: 32px;
      cursor: pointer;
      margin-left: auto; /* Push to right */
    }
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export const LogoImg = styled.img`
  max-height: 48px;
  margin-right: 10px;
`;

/* Information Section */
export const LostItemsSection = styled.section`
  padding: 80px 0;
  background-image: url("/assets/img/batik.png");
  background-size: cover;
  background-attachment: fixed;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #27227d 0%, #f97316 100%);
  }
`;

export const NavMenu = styled.nav`
  display: flex;
`;

export const NavList = styled.ul`
  list-style: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;

  @media (max-width: 1199px) {
    flex-direction: column;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background: white;
    width: 100%;
    padding: 15px;
    border-radius: 18px;
  }
`;

export const NavItem = styled.li``;

export const NavLink = styled(Link)`
  padding: 10px 14px;
  text-decoration: none;
  color: ${({ $active }) => ($active ? "#f59e0b" : "#334155")};
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  display: block;
  white-space: nowrap;
  transition: all 0.25s ease;
  border-radius: 10px;

  &:hover {
    text-decoration: none;
    color: #14532d;
    background: rgba(20, 83, 45, 0.06);
  }
`;

export const Dropdown = styled.li`
  position: relative;
`;

export const DropdownToggle = styled.a`
  cursor: pointer;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #334155;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.25s ease;

  &:hover {
    text-decoration: none;
    color: #14532d;
    background: rgba(20, 83, 45, 0.06);
  }
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 120%;
  left: 0;
  background: white;
  padding: 10px 0;
  border-radius: 14px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  min-width: 240px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  list-style: none;
  z-index: 99;

  @media (max-width: 1199px) {
    position: static;
    width: 100%;
    margin-top: 8px;
    box-shadow: none;
    background: transparent;
  }
`;

export const DropdownItem = styled.li`
  width: 100%;
`;