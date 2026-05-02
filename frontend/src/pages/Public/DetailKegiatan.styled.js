import styled from 'styled-components';

export const DetailImageWrapper = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  
  .carousel, .carousel-inner, .carousel-item {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-indicators {
    bottom: 20px;
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
  margin-bottom: 1.5rem;
  color: #0f172a;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const DescriptionText = styled.div`
  font-size: 1.15rem;
  line-height: 1.9;
  color: #475569;
  white-space: pre-wrap;
`;
