import { useWatch } from 'react-hook-form';

import styled from '@emotion/styled';

import { BOOK_STATUS } from '~/constants/book';
import { useDebounce } from '~/hooks/use-debounce';
import { IBookReviewForm } from '~/models/book';

const getStatusText = (status: string) => {
  switch (status) {
    case BOOK_STATUS.WANT_TO_READ:
      return '읽고 싶은 책';
    case BOOK_STATUS.READING:
      return '읽는 중';
    case BOOK_STATUS.READ:
      return '읽음';
    case BOOK_STATUS.HOLD:
      return '보류 중';
    default:
      return '상태 미설정';
  }
};

export default function Preview() {
  const formData = useWatch<IBookReviewForm>();
  const debouncedFormData = useDebounce(formData, 500);

  return (
    <Container>
      <h3>📱 앱 미리보기</h3>
      <AppScreen>
        <BookCard>
          <div>📚</div>
          <div>
            <h4>{debouncedFormData.bookTitle || '도서명을 입력하세요'}</h4>
            <p>{debouncedFormData.author || '저자를 입력하세요'}</p>
            {debouncedFormData.totalPages && (
              <p>{debouncedFormData.totalPages}페이지</p>
            )}
            {debouncedFormData.publishDate && (
              <p>출간: {debouncedFormData.publishDate}</p>
            )}
            <span>{getStatusText(debouncedFormData.readingStatus || '')}</span>
            {debouncedFormData.startDate && (
              <p>시작: {debouncedFormData.startDate}</p>
            )}
            {debouncedFormData.endDate && (
              <p>종료: {debouncedFormData.endDate}</p>
            )}
          </div>
        </BookCard>
      </AppScreen>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 20px;
`;

const AppScreen = styled.div`
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: #f9f9f9;
  min-height: 300px;
`;

const BookCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 4px;
  margin-bottom: 8px;

  h4 {
    margin: 0 0 4px 0;
  }
  p {
    margin: 0 0 2px 0;
    font-size: 14px;
    color: #666;
  }
  span {
    font-size: 12px;
    background: #007bff;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;
