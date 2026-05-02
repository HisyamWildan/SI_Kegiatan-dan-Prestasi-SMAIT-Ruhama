import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

export const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  
  .carousel-inner, .carousel-item {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DetailHeader = styled.div`
  padding-top: 100px; 
  padding-bottom: 60px; 
  background-color: #f8fafc;
`;

export const DetailCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  overflow: hidden;
`;

export const DetailContent = styled.div`
  padding: 3rem;
  padding-top: 0.75rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const BadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const DetailTitle = styled.h1`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0f172a;
  font-size: 2.25rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const InfoBox = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #fff7ed;
  border-left: 4px solid #f97316;

  p {
    margin-bottom: 0;
    font-weight: 600;
    color: #1e293b;
  }
`;

export const DescriptionText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
  white-space: pre-wrap;
`;
