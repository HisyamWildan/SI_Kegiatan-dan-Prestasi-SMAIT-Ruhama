import styled from "styled-components";
import { Carousel } from "react-bootstrap";

export const StyledCarousel = styled(Carousel)`
  height: 100%;
  .carousel-inner, .carousel-item {
    height: 100%;
  }
  .carousel-control-prev, .carousel-control-next {
    width: 10%;
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover .carousel-control-prev, &:hover .carousel-control-next {
    opacity: 0.5;
  }
  .carousel-indicators {
    margin-bottom: 0.5rem;
    button {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 0 3px;
    }
  }
`;

export const HeaderBanner = styled.div`
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
    margin-bottom: 1.5rem;
  }
`;

export const FilterWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

export const PageSection = styled.div`
  padding: 60px 0;
  min-height: 60vh;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  width: 100%;

  i {
    font-size: 3rem;
    color: #cbd5e1;
  }

  p {
    color: #64748b;
    margin-top: 1rem;
  }
`;
