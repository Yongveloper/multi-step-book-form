import { useFormContext, useWatch } from 'react-hook-form';

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
  const review = useWatch({
    name: FORM_FIELDS.REVIEW,
  });

  const currentLength = review?.trim().length ?? 0;

  return (
    <Container>
      <h2>3단계 - 독후감</h2>

      <Input.Group>
        <Input.RHFTextarea
          name={FORM_FIELDS.REVIEW}
          placeholder="독후감을 작성해주세요."
          rows={8}
        />
        <ReviewInfo>
          <CharacterCount>{currentLength}자</CharacterCount>
        </ReviewInfo>
        <Input.RHFDescription name={FORM_FIELDS.REVIEW} />
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
