import { styled } from "styled-components";

/* General Layout */
export const LandingWrapper = styled.div`
  position: relative;
  background-color: #f8fafc;
  min-height: 100vh;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/assets/img/subtle_bg.png");
    background-size: 900px;
    opacity: 0.1; 
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.25rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: #f97316;
      border-radius: 2px;
    }
  }

  p {
    max-width: 600px;
    margin: 0 auto;
    color: #64748b;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

/* Section Base */
export const Section = styled.section`
  padding: 80px 0;
  position: relative;
  background: ${({ $dark }) => $dark ? 'linear-gradient(135deg, #1e3a8a 0%, #164e63 50%, #134e4a 100%)' : 'transparent'};
  color: ${({ $dark }) => $dark ? 'white' : 'inherit'};

  ${SectionTitle} {
     h2 { color: ${({ $dark }) => $dark ? 'white' : '#0f172a'}; }
     p { color: ${({ $dark }) => $dark ? 'rgba(255, 255, 255, 0.8)' : '#64748b'}; }
  }
`;

/* About Section */
export const AboutSection = styled.section`
  padding: 80px 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);

  .about-meta {
    color: #27227d;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .about-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    font-weight: 800;
    color: #0f172a;

    span {
       color: #f97316;
    }

    @media (max-width: 992px) {
      font-size: 2rem;
    }
  }

  .about-description {
    margin-bottom: 2rem;
    color: #475569;
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .main-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 30px;
    box-shadow: 0 20px 40px rgba(39, 34, 125, 0.15);
    border: 8px solid white;
  }
`;

/* News/Content Cards */
export const NewsCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px rgba(39, 34, 125, 0.1);
    border-color: rgba(39, 34, 125, 0.2);
  }

  .image-box {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .badge-category {
       position: absolute;
       top: 20px;
       left: 20px;
       background: rgba(39, 34, 125, 0.9);
       backdrop-filter: blur(4px);
       color: white;
       padding: 6px 16px;
       border-radius: 50px;
       font-size: 0.75rem;
       font-weight: 700;
       z-index: 10;
    }
  }

  &:hover .image-box img {
    transform: scale(1.1);
  }

  .content-box {
    padding: 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .category-badges {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;

      span {
        background: #f1f5f9;
        color: #64748b;
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
      }
    }

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .description {
      font-size: 0.95rem;
      color: #64748b;
      margin-bottom: 24px;
      line-height: 1.7;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .footer {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info-left {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #1e293b;
        font-size: 12px;
        font-weight: 700;

        i {
          color: #27227d;
        }
      }

      .date {
        font-size: 11px;
        color: #94a3b8;
        font-weight: 500;
      }
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ViewAllButton = styled.button`
  background: white;
  color: #27227d;
  border: 2px solid #27227d;
  padding: 12px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 40px;

  &:hover {
    background: #27227d;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(39, 34, 125, 0.15);
  }
`;