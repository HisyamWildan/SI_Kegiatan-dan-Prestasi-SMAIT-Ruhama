import { styled } from "styled-components";

export const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 20px 80px;
  background-image: url(${props => props.$bg || "/assets/img/hero_bg.jpg"});
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(15, 23, 42, 0.75), 
    rgba(15, 23, 42, 0.4)
  );
`;

export const HeroContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
`;

export const HeroContent = styled.div`
  text-align: center;
  color: white;
`;

export const HeroTopTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 1px;
`;

export const HeroMainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 30px;
  opacity: 0.9;
`;

export const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
`;