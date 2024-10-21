import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { FaPlus } from 'react-icons/fa6';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmModal = ({ children, onClose, onSubmit }: Props) => {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return createPortal(
    <ConfirmModalBackground>
      <Container>
        <FaPlus size={25} onClick={handleClose} />
        <div className='modal-body'>
          <div className='modal-message'>{children}</div>
          <Button size='medium' scheme='danger' onClick={handleSubmit}>
            확인
          </Button>
        </div>
      </Container>
    </ConfirmModalBackground>,
    document.body
  );
};

const ConfirmModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  width: 400px;
  background-color: ${({ theme }) => theme.color.second};
  padding-top: 40px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  svg {
    position: absolute;
    top: 20px;
    right: 15px;
    transform: translateY(-50%) rotate(45deg);
    fill: ${({ theme }) => theme.color.background};

    cursor: pointer;
  }

  svg:hover {
    transform: translateY(-50%) rotate(45deg) scale(1.1);
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 30px;
    background-color: ${({ theme }) => theme.color.background};

    p {
      margin: 0;
      margin-bottom: 4px;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
`;

export default ConfirmModal;
