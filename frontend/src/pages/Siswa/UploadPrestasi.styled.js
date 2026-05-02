import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';

export const UploadContainer = styled.div`
  max-width: 950px;
  margin: 0 auto;
`;

export const StyledCard = styled(Card)`
  border: none;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
`;

export const FormSectionTitle = styled.h6`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }
`;

export const PreviewBox = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e2e8f0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  i {
    font-size: 1.5rem;
    color: #94a3b8;
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

export const SubmitButton = styled(Button)`
  background-color: #f97316 !important;
  border: none !important;
  border-radius: 12px !important;
  font-weight: 700 !important;
  padding: 0.8rem 2.5rem !important;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: all 0.3s ease !important;

  &:hover {
    background-color: #ea580c !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
