import { FaStar, FaBookOpen, FaBook, FaPlus } from 'react-icons/fa';
import image from '../../images/logo_bgremoved.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut, IoTrashBin } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import ConfirmModal from '../modal/ConfirmModal';
import { useAuth } from '../../hooks/useAuth';
import SearchModal from '../modal/SearchModal';
import { BookSearchItem } from '../../models/book.model';
import { useAddBook } from '../../hooks/useAddBook';
import styled from 'styled-components';
import { FaCircleUser } from 'react-icons/fa6';
import DropDown from './Dropdown';
import { useModalStore } from '../../store/modalStore';

const Sidebar = () => {
  const open = useModalStore((state) => state.open);
  const { userWithdrawal, userLogout } = useAuth();
  const { addSearchBook } = useAddBook();
  const nav = useNavigate();
  const location = useLocation();

  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMediumScreen(window.innerWidth <= 1360);
      setIsSmallScreen(window.innerWidth <= 730);
    };

    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  const onClickLogo = () => {
    nav('/main');
  };

  const handleSearchClick = () => {
    open(SearchModal, {
      onSubmit: (book: BookSearchItem) => {
        addSearchBook(book);
      },
    });
  };

  const handleLogoutClick = () => {
    open(ConfirmModal, {
      children: <p>로그아웃하시겠습니까?</p>,
      onSubmit: userLogout,
    });
  };

  const handleWithdrawalClick = () => {
    open(ConfirmModal, {
      children: (
        <>
          <p>독토리 서비스를 탈퇴하시겠습니까?</p>
          <p>기존 데이터는 모두 삭제됩니다.</p>
        </>
      ),
      onSubmit: userWithdrawal,
    });
  };

  return (
    <NavbarStyle>
      <div className='item-containter'>
        <div className='logo' onClick={onClickLogo}>
          <img src={image} alt='logo' />
        </div>
        <button className='addBtn' onClick={handleSearchClick}>
          <FaPlus /> {!isMediumScreen && <span>도서 등록</span>}
        </button>
        <nav>
          <ul className='link-items'>
            <li
              className={`link-item ${
                location.pathname === '/favorite' ? 'active' : ''
              }`}>
              <Link to='/favorite' title='즐겨찾기'>
                {isSmallScreen ? <FaStar /> : '즐겨찾기'}
              </Link>
            </li>
            <li
              className={`link-item ${
                location.pathname === '/readingbooks' ? 'active' : ''
              }`}>
              <Link to='/readingbooks' title='읽고 있는 책'>
                {isSmallScreen ? <FaBookOpen /> : '읽고 있는 책'}
              </Link>
            </li>
            <li
              className={`link-item ${
                location.pathname === '/readedbooks' ? 'active' : ''
              }`}>
              <Link to='/readedbooks' title='다 읽은 책'>
                {isSmallScreen ? <FaBook /> : '다 읽은 책'}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='user'>
        <DropDown toggleButton={<FaCircleUser size={35} />}>
          <Link to='/auth/changepassword' title='비밀번호 변경'>
            <RiLockPasswordFill />
            <span>비밀번호 변경</span>
          </Link>
          <button onClick={handleLogoutClick} title='로그아웃'>
            <IoLogOut />
            <span>로그아웃</span>
          </button>
          <button onClick={handleWithdrawalClick} title='회원탈퇴'>
            <IoTrashBin />
            <span>회원탈퇴</span>
          </button>
        </DropDown>
      </div>
    </NavbarStyle>
  );
};

const NavbarStyle = styled.div`
  position: relative;
  flex: 1;
  background-color: #be8a62;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  justify-content: space-between;

  .logo {
    img {
      width: 70%;
      cursor: pointer;
    }
  }

  .addBtn {
    border: none;
    background: none;
    outline: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 8px;

    background-color: ${({ theme }) => theme.color.first};
    color: ${({ theme }) => theme.color.white};
    padding: 16px 20px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: 1.3rem;

    &:hover {
      transform: scale(1.02);
    }

    svg {
      font-size: 1.5rem;
    }
  }

  .item-containter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;

    nav {
      width: 100%;

      .link-items {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .link-item {
        font-size: 1.3rem;

        width: 100%;
        a {
          display: block;
          width: 100%;
          padding: 10px;
          text-decoration: none;
          color: white;
        }
      }

      .link-item:hover,
      .link-item.active {
        background-color: ${({ theme }) => theme.color.first};
        font-weight: bold;
      }
    }
  }
  .user {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
`;

export default Sidebar;
