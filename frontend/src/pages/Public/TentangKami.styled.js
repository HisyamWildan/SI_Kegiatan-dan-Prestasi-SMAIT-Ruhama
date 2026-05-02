import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

export const HeroSection = styled.div`
  background: linear-gradient(90deg, #1e3a8a 0%, #164e63 100%);
  padding-top: 140px;
  padding-bottom: 80px;
  text-align: center;
  color: white;

  h1 {
    font-weight: 800;
    margin-bottom: 1rem;
  }

  p {
    opacity: 0.75;
  }
`;

export const ContentSection = styled.div`
  padding-bottom: 80px;
`;

export const CardWrapper = styled.div`
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  overflow: hidden;
  margin-top: -40px;
  position: relative;
  z-index: 10;
`;

export const AboutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 8px solid white;
`;

export const TextContent = styled.div`
  padding: 3rem;

  h2 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #0f172a;
  }

  p {
    color: #64748b;
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.1rem;
  }
`;

export const ListWrapper = styled.ul`
  color: #64748b;
  padding-left: 1.5rem;
  list-style-type: square;

  li {
    margin-bottom: 0.5rem;
  }
`;

export const ContactSection = styled.section`
  padding: 80px 0;
  background: rgba(39, 34, 125, 0.03);

  .contact-card {
     background: white;
     padding: 40px 30px;
     border-radius: 24px;
     text-align: center;
     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
     transition: transform 0.3s ease;
     height: 100%;

     &:hover {
        transform: translateY(-10px);
     }

     i {
        font-size: 2.5rem;
        color: #f97316;
        margin-bottom: 20px;
        display: inline-block;
     }

     h5 {
        font-weight: 800;
        margin-bottom: 15px;
        color: #0f172a;
     }

     p {
        color: #64748b;
        margin-bottom: 0;
     }
  }
`;
