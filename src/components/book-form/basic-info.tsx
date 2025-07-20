import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

import { BOOK_STATUS } from '~/constants/book';
import { IBookReviewForm } from '~/models/book';

import Input from '../shared/input';

interface BasicInfoProps {
  onNext: () => void;
}

export default function BasicInfo({ onNext }: BasicInfoProps) {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<IBookReviewForm>();

  const readingStatus = watch('readingStatus');

  const shouldDisableStartDate =
    !readingStatus || readingStatus === BOOK_STATUS.WANT_TO_READ;
  const shouldDisableEndDate =
    !readingStatus || readingStatus !== BOOK_STATUS.READ;

  const handleNext = async () => {
    const isFormValid = await trigger();
    if (isFormValid) {
      onNext();
    }
  };

  return (
    <Container>
      <h2>1단계 - 도서 기본 정보</h2>

      <div>
        <label>도서명</label>
        <Input
          {...register('bookTitle', { required: '도서명을 입력해주세요' })}
          type="text"
          aria-invalid={!!errors.bookTitle}
        />
        {errors.bookTitle && <ErrorText>{errors.bookTitle.message}</ErrorText>}
      </div>

      <div>
        <label>저자</label>
        <Input
          {...register('author', { required: '저자를 입력해주세요' })}
          type="text"
          aria-invalid={!!errors.author}
        />
        {errors.author && <ErrorText>{errors.author.message}</ErrorText>}
      </div>

      <div>
        <label>출판일</label>
        <Input
          {...register('publishDate', { required: '출판일을 입력해주세요' })}
          type="date"
          aria-invalid={!!errors.publishDate}
        />
        {errors.publishDate && (
          <ErrorText>{errors.publishDate.message}</ErrorText>
        )}
      </div>

      <div>
        <label>총 페이지 수</label>
        <Input
          {...register('totalPages', {
            required: '총 페이지 수를 입력해주세요',
            min: { value: 1, message: '1 이상의 숫자를 입력해주세요' },
            pattern: { value: /^\d+$/, message: '숫자만 입력 가능합니다' },
          })}
          type="number"
          aria-invalid={!!errors.totalPages}
        />
        {errors.totalPages && (
          <ErrorText>{errors.totalPages.message}</ErrorText>
        )}
      </div>

      <div>
        <label>독서 상태</label>
        <Select
          {...register('readingStatus', {
            required: '독서 상태를 선택해주세요',
          })}
          aria-invalid={!!errors.readingStatus}
        >
          <option value="">선택</option>
          <option value={BOOK_STATUS.WANT_TO_READ}>읽고 싶은 책</option>
          <option value={BOOK_STATUS.READING}>읽는 중</option>
          <option value={BOOK_STATUS.READ}>읽음</option>
          <option value={BOOK_STATUS.HOLD}>보류 중</option>
        </Select>
        {errors.readingStatus && (
          <ErrorText>{errors.readingStatus.message}</ErrorText>
        )}
      </div>
      <div>
        <label>독서 시작일</label>
        <Input
          {...register('startDate', {
            required: !shouldDisableStartDate
              ? '독서 시작일을 입력해주세요'
              : undefined,
          })}
          type="date"
          disabled={shouldDisableStartDate}
          aria-invalid={!!errors.startDate}
        />
        {errors.startDate && <ErrorText>{errors.startDate.message}</ErrorText>}
      </div>

      <div>
        <label>독서 종료일</label>
        <Input
          {...register('endDate', {
            required: !shouldDisableEndDate
              ? '독서 종료일을 입력해주세요'
              : undefined,
          })}
          type="date"
          disabled={shouldDisableEndDate}
          aria-invalid={!!errors.endDate}
        />
        {errors.endDate && <ErrorText>{errors.endDate.message}</ErrorText>}
      </div>

      <Button type="button" onClick={handleNext}>
        다음 단계
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &[aria-invalid='true'] {
    border-color: red;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
