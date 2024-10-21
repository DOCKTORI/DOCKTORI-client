import styled from 'styled-components';
import MainBookListSection from '../components/BookList/Main/MainBookListSection';
import ChangeNicknameModal from '../components/modal/ChangeNicknameModal';
import { useUserInfo } from '../hooks/useUserInfo';
import { useBookList } from '../hooks/useBookList';
import { FINISH, READING } from '../constants/url';
import Title from '../components/BookList/Title';
import { FaPen } from 'react-icons/fa';
import { ChangeUserInfoProps } from '../models/user.model';
import { useModalStore } from '../store/modalStore';

export default function Main() {
  const { nickname, goal, isUserInfoLoading } = useUserInfo();
  const {
    bookList: readingList,
    count: readingCount,
    isBookListLoading: isReadingListLoading,
    isEmpty: isReadingListEmpty,
  } = useBookList(READING);
  const {
    bookList: finishList,
    count: finishedCount,
    isBookListLoading: isFinishListLoading,
    isEmpty: isFinishListEmpty,
  } = useBookList(FINISH);

  const open = useModalStore((state) => state.open);
  const { changeProfile } = useUserInfo();

  const handleClick = () => {
    open(ChangeNicknameModal, {
      onSubmit: (data: ChangeUserInfoProps) => changeProfile(data),
    });
  };

  return (
    <MainStyle>
      {!isUserInfoLoading && (
        <div className='profile'>
          <div className='profile_item'>
            <div className='title'>
              <Title color='first'>목표</Title>
              <button onClick={handleClick}>
                <FaPen />
              </button>
            </div>
            <div className='user'>
              <p className='nickname'>{nickname}</p>
              <p className='goal'>{goal}</p>
            </div>
          </div>
          <div className='profile_item'>
            <Title color='first'>나의 기록</Title>
            <div className='records'>
              <div className='record'>
                <p className='sub_title'>읽는 중</p>
                <p className='count'>{readingCount}권</p>
              </div>
              <div className='record'>
                <p className='sub_title'>완독</p>
                <p className='count'>{finishedCount}권</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isReadingListLoading && (
        <MainBookListSection
          title='읽고 있는 책'
          books={readingList}
          isEmpty={isReadingListEmpty}
        />
      )}
      {!isFinishListLoading && (
        <MainBookListSection
          title='다 읽은 책'
          books={finishList}
          isEmpty={isFinishListEmpty}
        />
      )}
    </MainStyle>
  );
}

const MainStyle = styled.div`
  padding: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;

  p {
    margin: 0;
  }

  .profile {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 25px;

    @media (max-width: 975px) {
      grid-template-columns: 1fr;
    }
  }

  .profile_item {
    flex: 1;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      cursor: pointer;
      background: none;
      border: none;

      svg {
        fill: ${({ theme }) => theme.color.first};
        font-size: 1.2rem;
      }

      &:hover {
        svg {
          fill: ${({ theme }) => theme.color.third};
        }
      }
    }
  }

  .user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    .nickname {
      font-weight: bold;
    }

    .goal {
      font-size: 1.3rem;
    }
  }

  .user,
  .records {
    border: 1px solid ${({ theme }) => theme.color.first};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    background: ${({ theme }) => theme.color.white};
    padding: 40px;
    font-size: 1.5rem;
    margin: 12px 0;
  }

  .records {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .record {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .sub_title {
      font-weight: bold;
    }

    .count {
      font-size: 1.3rem;
    }
  }
`;
