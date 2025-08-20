import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import styled from '@emotion/styled';

import {
  BOOK_STATUS,
  FORM_FIELDS,
  READING_STATUS_OPTIONS,
} from '~/constants/book-form.constant';
import { BookFormData } from '~/schemas/book-form.schema';

import Button from '../shared/button';
import Input from '../shared/input';

interface IBasicInfoProps {
  onNext: () => void;
}

export default function BasicInfo({ onNext }: IBasicInfoProps) {
  const {
    register,
    resetField,
    formState: { errors },
  } = useFormContext<BookFormData>();

  const readingStatus = useWatch({
    name: FORM_FIELDS.READING_STATUS,
  });

  const shouldDisableStartDate =
    !readingStatus || readingStatus === BOOK_STATUS.WANT_TO_READ;
  const shouldDisableEndDate =
    !readingStatus || readingStatus !== BOOK_STATUS.READ;

  useEffect(() => {
    if (!readingStatus || readingStatus === BOOK_STATUS.WANT_TO_READ) {
      resetField(FORM_FIELDS.START_DATE);
      resetField(FORM_FIELDS.END_DATE);
    }
  }, [readingStatus, resetField]);

  return (
    <Container>
      <h2>1단계 - 도서 기본 정보</h2>

      <Input.Group>
        <Input.Label>도서명</Input.Label>
        <Input.RHFInput name={FORM_FIELDS.BOOK_TITLE} type="text" />
        <Input.RHFDescription name={FORM_FIELDS.BOOK_TITLE} />
      </Input.Group>

      <Input.Group>
        <Input.Label>저자</Input.Label>
        <Input.RHFInput name={FORM_FIELDS.AUTHOR} type="text" />
        <Input.RHFDescription name={FORM_FIELDS.AUTHOR} />
      </Input.Group>

      <Input.Group>
        <Input.Label>출판일</Input.Label>
        <Input.RHFInput name={FORM_FIELDS.PUBLISH_DATE} type="date" />
        <Input.RHFDescription name={FORM_FIELDS.PUBLISH_DATE} />
      </Input.Group>

      <Input.Group>
        <Input.Label>총 페이지 수</Input.Label>
        <Input.RHFInput 
          name={FORM_FIELDS.TOTAL_PAGES} 
          type="number" 
        />
        <Input.RHFDescription name={FORM_FIELDS.TOTAL_PAGES} />
      </Input.Group>

      <Input.Group>
        <Input.Label>독서 상태</Input.Label>
        <Select
          {...register(FORM_FIELDS.READING_STATUS)}
          aria-invalid={errors.readingStatus !== undefined}
        >
          {READING_STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Input.Description aria-invalid={errors.readingStatus !== undefined}>
          {errors.readingStatus?.message}
        </Input.Description>
      </Input.Group>

      <Input.Group>
        <Input.Label>독서 시작일</Input.Label>
        <Input.RHFInput 
          name={FORM_FIELDS.START_DATE}
          type="date"
          disabled={shouldDisableStartDate}
        />
        <Input.RHFDescription name={FORM_FIELDS.START_DATE} />
      </Input.Group>

      <Input.Group>
        <Input.Label>독서 종료일</Input.Label>
        <Input.RHFInput 
          name={FORM_FIELDS.END_DATE}
          type="date"
          disabled={shouldDisableEndDate}
        />
        <Input.RHFDescription name={FORM_FIELDS.END_DATE} />
      </Input.Group>

      <Button type="button" onClick={onNext}>
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

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;

  &[aria-invalid='true'] {
    border-color: red;
  }
`;
