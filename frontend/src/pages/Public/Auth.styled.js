import styled from "styled-components";

export const AuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  background: #f8fafc;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  overflow: hidden;

  @media (max-width: 991px) {
    flex-direction: column;
    height: auto;
    overflow-y: auto;
  }
`;

export const AuthSideImage = styled.div`
  flex: 1.2;
  background: url(${props => props.image}) no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  transition: background-image 0.8s ease-in-out;
  height: 100vh;
  position: sticky;
  top: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.3) 100%);
    z-index: 1;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

export const AuthSideContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  max-width: 500px;
  text-align: left;

  h1 {
    font-size: 2.75rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.25rem;

    span {
      color: #f97316;
    }
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

export const AuthFormArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
  background: white;
  height: 100vh;

  @media (max-width: 576px) {
    padding: 2rem 1.5rem;
  }
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 420px;
`;

export const AuthTitle = styled.h2`
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.875rem 1.25rem;
  background: #f1f5f9;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;

  &:focus {
    outline: none;
    background: white;
    border-color: #f97316;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const EyeIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 23px; /* Center relative to input height */
  transform: translateY(-50%);
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  z-index: 5;
  transition: color 0.2s;

  &:hover {
    color: #f97316;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #f97316;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #ea580c;
    transform: translateY(-2px);
    box-shadow: 0 5px 10px -3px rgba(249, 115, 22, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SecondaryLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  
  a {
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: #f97316;
    }
  }
`;
