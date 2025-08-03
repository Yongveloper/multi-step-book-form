import { useFormContext } from 'react-hook-form';

import styled from '@emotion/styled';

import {
  FORM_FIELDS,
  RECOMMENDATION_OPTIONS,
} from '~/constants/book-form.constant';
import { BookFormData } from '~/schemas/book-form.schema';

import Button from '../shared/button';
import Input from '../shared/input';

interface IBookEvaluationProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function BookEvaluation({
  onNext,
  onPrev,
}: IBookEvaluationProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BookFormData>();

  const [rating] = watch([FORM_FIELDS.RATING]);

  const handleRatingClick = (value: number) => {
    setValue(FORM_FIELDS.RATING, value);
  };

  return (
    <Container>
      <h2>2단계 - 도서 평가</h2>

      <Input
        type="hidden"
        {...register(FORM_FIELDS.RATING, {
          valueAsNumber: true,
        })}
      />

      <Input.Group>
        <Input.Label>추천 여부</Input.Label>
        <Select
          {...register(FORM_FIELDS.RECOMMENDATION)}
          aria-invalid={!!errors.recommendation}
        >
          {RECOMMENDATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Input.Description aria-invalid={!!errors.recommendation}>
          {errors.recommendation?.message}
        </Input.Description>
      </Input.Group>

      <Input.Group>
        <Input.Label>별점</Input.Label>
        <RatingContainer>
          <StarRating>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <StarContainer key={starIndex}>
                <StarButton
                  type="button"
                  onClick={() => handleRatingClick(starIndex - 0.5)}
                  className={`half ${rating && starIndex - 0.5 <= rating ? 'active' : ''}`}
                />
                <StarButton
                  type="button"
                  onClick={() => handleRatingClick(starIndex)}
                  className={`full ${rating && starIndex <= rating ? 'active' : ''}`}
                />
              </StarContainer>
            ))}
          </StarRating>
        </RatingContainer>
        <Input.Description aria-invalid={!!errors.rating}>
          {errors.rating?.message}
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

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid black;

  &[aria-invalid='true'] {
    border-color: red;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StarRating = styled.div`
  display: flex;
  gap: 2px;
`;

const StarContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  font-size: 24px;

  &::before {
    content: '★';
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    color: #ddd;
    z-index: 0;
  }
`;

const StarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  height: 100%;

  &::before {
    content: '★';
    position: absolute;
    top: 0;
    font-size: 24px;
    color: #ffc107;
    transition: opacity 0.2s;
    opacity: 0;
    pointer-events: none;
  }

  &.half {
    left: 0;
    width: 50%;
    z-index: 2;
    overflow: hidden;

    &::before {
      left: 0;
      width: 200%;
    }

    &:hover::before,
    &.active::before {
      opacity: 1;
    }
  }

  &.full {
    left: 0;
    width: 100%;
    z-index: 1;

    &::before {
      left: 0;
    }

    &:hover::before,
    &.active::before {
      opacity: 1;
    }
  }
`;
