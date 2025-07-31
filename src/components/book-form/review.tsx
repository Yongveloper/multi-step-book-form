import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

import { FORM_FIELDS } from '~/constants/book-form.constant';
import { BookFormData } from '~/schemas/book-form.schema';

import Button from '../shared/button';
import Input from '../shared/input';

interface IReviewProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Review({ onNext, onPrev }: IReviewProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BookFormData>();

  const [review] = watch([FORM_FIELDS.REVIEW]);

  const currentLength = review?.trim().length ?? 0;

  return (
    <Container>
      <h2>3단계 - 독후감</h2>

      <Input.Group>
        <Textarea
          {...register(FORM_FIELDS.REVIEW)}
          placeholder="독후감을 작성해주세요."
          rows={8}
          aria-invalid={!!errors.review}
        />
        <ReviewInfo>
          <CharacterCount>{currentLength}자</CharacterCount>
        </ReviewInfo>
        <Input.Description aria-invalid={!!errors.review}>
          {errors.review?.message}
        </Input.Description>
      </Input.Group>

      <Button.Group>
        <Button type="button" onClick={onPrev} variant="secondary">
          이전 단계
        </Button>
        <Button type="button" onClick={onNext}>
          다음 단계
        </Button>
      </Button.Group>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid black;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;

  &[aria-invalid='true'] {
    border-color: red;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ReviewInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`;

const CharacterCount = styled.span`
  font-size: 12px;
  color: #666;
`;
