import styled from 'styled-components';
import { Table, Button, Badge } from 'react-bootstrap';

export const StyledTable = styled(Table)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

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

export const ActionButton = styled(Button)`
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
`;

export const ImagePreview = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px dashed #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  margin-top: 5px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  i {
    font-size: 1.2rem;
    color: #cbd5e1;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: #dc2626;
    transform: scale(1.1);
  }
`;

export const AddButton = styled(Button)`
  background-color: #f97316 !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 0.6rem 1.5rem !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: all 0.3s ease !important;

  &:hover {
    background-color: #ea580c !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3);
  }
`;
