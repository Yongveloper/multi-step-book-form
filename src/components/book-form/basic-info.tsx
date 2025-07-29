import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

import { BOOK_STATUS } from '~/constants/book';
import { FORM_FIELDS, READING_STATUS_OPTIONS } from '~/constants/form';
import { BookFormData } from '~/schemas/book-form';

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
  } = useFormContext<BookFormData>();

  const [readingStatus] = watch([FORM_FIELDS.READING_STATUS]);

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
          {...register(FORM_FIELDS.BOOK_TITLE)}
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
          {...register(FORM_FIELDS.AUTHOR)}
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
          {...register(FORM_FIELDS.PUBLISH_DATE)}
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
          {...register(FORM_FIELDS.TOTAL_PAGES)}
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
          {...register(FORM_FIELDS.READING_STATUS)}
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
          {...register(FORM_FIELDS.START_DATE)}
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
          {...register(FORM_FIELDS.END_DATE)}
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
