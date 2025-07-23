import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

import { BOOK_STATUS } from '~/constants/book';
import { FORM_FIELDS, READING_STATUS_OPTIONS } from '~/constants/form';
import { IBookReviewForm } from '~/models/book';
import { isDateAfter } from '~/utils/data';

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

  const [readingStatus, publishDate, endDate] = watch([
    FORM_FIELDS.READING_STATUS,
    FORM_FIELDS.PUBLISH_DATE,
    FORM_FIELDS.END_DATE,
  ]);

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

      <Input.Group>
        <Input.Label>도서명</Input.Label>
        <Input
          {...register(FORM_FIELDS.BOOK_TITLE, {
            required: '도서명을 입력해주세요',
          })}
          type="text"
          aria-invalid={!!errors.bookTitle}
        />
        <Input.Description aria-invalid={!!errors.bookTitle}>
          {errors.bookTitle?.message}
        </Input.Description>
      </Input.Group>

      <Input.Group>
        <Input.Label>저자</Input.Label>
        <Input
          {...register(FORM_FIELDS.AUTHOR, { required: '저자를 입력해주세요' })}
          type="text"
          aria-invalid={!!errors.author}
        />
        <Input.Description aria-invalid={!!errors.author}>
          {errors.author?.message}
        </Input.Description>
      </Input.Group>

      <Input.Group>
        <Input.Label>출판일</Input.Label>
        <Input
          {...register(FORM_FIELDS.PUBLISH_DATE, {
            required: '출판일을 입력해주세요',
          })}
          type="date"
          aria-invalid={!!errors.publishDate}
        />
        <Input.Description aria-invalid={!!errors.publishDate}>
          {errors.publishDate?.message}
        </Input.Description>
      </Input.Group>

      <Input.Group>
        <Input.Label>총 페이지 수</Input.Label>
        <Input
          {...register(FORM_FIELDS.TOTAL_PAGES, {
            required: '총 페이지 수를 입력해주세요',
            min: { value: 1, message: '1 이상의 숫자를 입력해주세요' },
            pattern: { value: /^\d+$/, message: '숫자만 입력 가능합니다' },
          })}
          type="number"
          aria-invalid={!!errors.totalPages}
        />
        <Input.Description aria-invalid={!!errors.totalPages}>
          {errors.totalPages?.message}
        </Input.Description>
      </Input.Group>

      <Input.Group>
        <Input.Label>독서 상태</Input.Label>
        <Select
          {...register(FORM_FIELDS.READING_STATUS, {
            required: '독서 상태를 선택해주세요',
          })}
          aria-invalid={!!errors.readingStatus}
        >
          {READING_STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Input.Description aria-invalid={!!errors.readingStatus}>
          {errors.readingStatus?.message}
        </Input.Description>
      </Input.Group>

      <Input.Group>
        <Input.Label>독서 시작일</Input.Label>
        <Input
          {...register(FORM_FIELDS.START_DATE, {
            required: !shouldDisableStartDate
              ? '독서 시작일을 입력해주세요'
              : undefined,
            validate: (startDate) => {
              if (shouldDisableStartDate || !startDate) return true;

              if (endDate && isDateAfter(startDate, endDate)) {
                return '독서 시작일은 종료일보다 이전이어야 합니다';
              }

              if (publishDate && isDateAfter(publishDate, startDate)) {
                return '독서 시작일은 출판일 이후여야 합니다';
              }

              return true;
            },
          })}
          type="date"
          disabled={shouldDisableStartDate}
          aria-invalid={!!errors.startDate}
        />
        <Input.Description aria-invalid={!!errors.startDate}>
          {errors.startDate?.message}
        </Input.Description>
      </Input.Group>

      <Input.Group>
        <Input.Label>독서 종료일</Input.Label>
        <Input
          {...register(FORM_FIELDS.END_DATE, {
            required: !shouldDisableEndDate
              ? '독서 종료일을 입력해주세요'
              : undefined,
            validate: (value) => {
              if (shouldDisableEndDate || !value) return true;

              if (publishDate && !isDateAfter(value, publishDate)) {
                return '독서 종료일은 출판일 이후여야 합니다';
              }

              return true;
            },
          })}
          type="date"
          disabled={shouldDisableEndDate}
          aria-invalid={!!errors.endDate}
        />
        <Input.Description aria-invalid={!!errors.endDate}>
          {errors.endDate?.message}
        </Input.Description>
      </Input.Group>

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
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;

  &[aria-invalid='true'] {
    border-color: red;
  }
`;
