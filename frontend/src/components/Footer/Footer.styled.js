import { styled } from "styled-components";

export const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  color: #334155;
  font-size: 14px;
  padding-top: 60px;
  padding-bottom: 20px;
  border-top: 1px solid #fed7aa;
`;

export const FooterRow = styled.div``;

export const FooterCol = styled.div`
  p {
    font-size: 14px;
    margin-top: 10px;
    line-height: 1.6;
  }
`;

export const Logo = styled.img`
  max-width: 160px;
  margin-bottom: 15px;
`;

export const Description = styled.p`
  color: #475569;
`;

export const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #14532d; /* hijau sekolah */
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 8px 0;

    a {
      color: #475569;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      display: inline-block;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -2px;
        left: 0;
        background-color: #ea580c;
        transition: width 0.3s ease;
      }

      &:hover {
        color: #ea580c;
        transform: translateX(5px);
        
        &::after {
          width: 100%;
        }
      }
    }
  }
`;

export const Copyright = styled.div`
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
  font-size: 13px;
  color: #64748b;
`;