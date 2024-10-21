import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { FaPlus } from 'react-icons/fa6';
import { useSearchBooks } from '../../hooks/useSearchBooks';
import { BookSearchItem } from '../../models/book.model';
import { createPortal } from 'react-dom';

interface Props {
  onClose: () => void;
  onSubmit: (book: BookSearchItem) => void;
}

const SearchModal = ({ onClose, onSubmit }: Props) => {
  const [query, setQuery] = useState('');
  const { books, loading, error, searchBooks } = useSearchBooks();

  const handleSearch = () => {
    searchBooks(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSubmit = (book: BookSearchItem) => {
    onSubmit(book);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <SearchModalBackground>
      <Container>
        <FaPlus size={25} onClick={handleClose} />
        <div className='modal-body'>
          <div className='modal-message'>
            <p>책을 검색하세요.</p>
          </div>
          <div className='search-container'>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='책 제목을 입력하세요'
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Button size='medium' scheme='primary' onClick={handleSearch}>
              검색
            </Button>
          </div>
          {loading && <p>검색 중...</p>}
          {error && <p>{error}</p>}
          <div className='results-container'>
            {books.map((book: BookSearchItem, index) => (
              <div
                className='result-item'
                key={index}
                onClick={() => handleSubmit(book)}>
                <img src={book.image} alt={book.title} />
                <div className='book-info'>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SearchModalBackground>,
    document.body
  );
};

const SearchModalBackground = styled.div`
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

    .search-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      width: 100%;

      input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }

    .results-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-height: 300px;
      overflow-y: auto;

      .result-item {
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;

        img {
          width: 50px;
          height: 75px;
          object-fit: cover;
        }

        .book-info {
          h3 {
            margin: 0;
            font-size: 1rem;
          }

          p {
            margin: 0;
            font-size: 0.875rem;
            color: #666;
          }
        }
      }
    }
  }
`;

export default SearchModal;
