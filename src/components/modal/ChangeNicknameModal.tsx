import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';
import { createPortal } from 'react-dom';
import { useUserInfo } from '../../hooks/useUserInfo';
import { ChangeUserInfoProps } from '../../models/user.model';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: (data: ChangeUserInfoProps) => void;
}

const ChangeNicknameModal = ({ children, onClose, onSubmit }: Props) => {
  const { nickname, goal } = useUserInfo();
  const [newNickname, setNewNickname] = useState<string>(nickname || '');
  const [newGoal, setNewGoal] = useState<string>(goal || '');

  useEffect(() => {
    if (nickname && goal) {
      setNewNickname(nickname);
      setNewGoal(goal);
    }
  }, [nickname, goal]);

  const handleSubmit = () => {
    onSubmit({ cNickname: newNickname, cGoal: newGoal });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <ChangeNicknameModalBackground>
      <Container>
        <FaPlus size={25} onClick={handleClose} />
        <div className='modal-body'>
          <div className='modal-message'>{children}</div>
          <div className='search-container'>
            <input
              type='text'
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder='새로운 닉네임을 입력하세요'
              autoFocus
              maxLength={10}
            />
            <input
              type='text'
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder='새로운 목표를 입력하세요.'
              maxLength={20}
              style={{ width: '100%' }}
            />
            <button onClick={handleSubmit}>변경</button>
          </div>
        </div>
      </Container>
    </ChangeNicknameModalBackground>,
    document.body
  );
};

const ChangeNicknameModalBackground = styled.div`
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
  button {
    padding: 10px;
    background-color: #874314;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
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

    .search-container {
      display: flex;
      gap: 10px;
      flex-direction: column;
      margin-bottom: 20px;
      width: 100%;

      input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }
  }
`;

export default ChangeNicknameModal;
