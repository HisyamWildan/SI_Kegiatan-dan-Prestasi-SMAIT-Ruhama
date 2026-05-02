import styled from 'styled-components';
import { Table, Badge } from 'react-bootstrap';

export const StyledTable = styled(Table)`
  background: white;
  border-radius: 15px;
  overflow: hidden;

  thead {
    background: #f8fafc;
    th {
      border: none;
      padding: 1rem;
      color: #64748b;
      font-weight: 800;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: center;
    }
  }

  tbody td {
    padding: 1rem;
    vertical-align: middle;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
    text-align: left;
    font-weight: 400;
  }

  .text-center-col {
    text-align: center !important;
  }
`;

export const OrangeBadge = styled(Badge)`
  background-color: #f97316 !important;
  color: white !important;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: none;
`;

export const DetailLabel = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

export const DetailValue = styled.div`
  font-size: 0.95rem;
  color: #1e293b;
  margin-bottom: 1.25rem;
  font-weight: 600;
`;

export const GlobalVerifikasiStyles = styled.div`
  .btn-orange {
    background-color: #f97316 !important;
    border: none !important;
    transition: all 0.3s ease;

    &:hover {
      background-color: #ea580c !important;
      transform: translateY(-2px);
    }
  }

  .btn-green {
    background-color: #22c55e !important;
    border: none !important;
    transition: all 0.3s ease;

    &:hover {
      background-color: #16a34a !important;
      transform: translateY(-2px);
    }
  }

  .img-fit {
    max-height: 300px;
    object-fit: contain;
  }

  .carousel-container {
    background-color: #000;
    border-radius: 12px;
  }
`;
