import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  FORM_FIELDS,
  VISIBILITY_OPTIONS,
} from '~/constants/book-form.constant';

import Input from '../shared/input';
import StepNavigationButtons from '../shared/step-navigation-buttons';

interface IBookVisibilityProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function BookVisibility({
  onNext,
  onPrev,
}: IBookVisibilityProps) {
  return (
    <Container>
      <h2>5단계 - 공개 여부</h2>

      <Input.Group css={radioGroupStyles}>
        {VISIBILITY_OPTIONS.map((option) => (
          <RadioOption key={option.value}>
            <Input.RHFInput
              name={FORM_FIELDS.VISIBILITY}
              type="radio"
              value={option.value}
              id={`visibility-${option.value}`}
              css={radioInputStyles}
            />
            <Input.Label htmlFor={`visibility-${option.value}`}>
              {option.label} - {option.description}
            </Input.Label>
          </RadioOption>
        ))}
      </Input.Group>
      <Input.RHFDescription name={FORM_FIELDS.VISIBILITY} />

      <StepNavigationButtons onNext={onNext} onPrev={onPrev} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const radioInputStyles = css`
  width: 16px;
  height: 16px;
  margin: 2px 0 0 0;
`;

const radioGroupStyles = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
