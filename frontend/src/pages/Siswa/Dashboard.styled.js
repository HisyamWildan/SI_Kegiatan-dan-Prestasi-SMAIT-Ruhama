import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const DashboardContainer = styled.div`
  overflow: hidden;
`;

export const StatCard = styled(Card)`
  border: none;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.04);
  transition: all 0.2s ease;
  background: white;
  height: 110px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.07);
  }
`;

export const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  background: ${props => props.bg || '#f1f5f9'};
  color: ${props => props.color || '#64748b'};
  flex-shrink: 0;
`;

export const CardBodyStyled = styled(Card.Body)`
  display: flex;
  align-items: center;
  padding: 1.25rem !important;
  gap: 15px;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Label = styled.div`
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 2px;
`;

export const Value = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 4px;
`;

export const DetailLink = styled(Link)`
  font-size: 0.75rem;
  color: #f97316;
  text-decoration: none !important;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    text-decoration: underline !important;
  }
`;

export const HelpBox = styled.div`
  margin-top: 2.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  border-left: 5px solid #f97316;
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 576px) {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
`;

export const HelpIconCircle = styled.div`
  width: 45px;
  height: 45px;
  background: #fff7ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    color: #f97316;
    font-size: 1.5rem;
  }
`;
