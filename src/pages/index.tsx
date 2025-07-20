import { FormProvider, useForm } from 'react-hook-form';

import styled from '@emotion/styled';

import BasicInfo from '~/components/book-form/basic-info';
import { LAST_STEP } from '~/constants/form';
import { useStepNavigation } from '~/hooks/use-step-navigation';
import { IBookReviewForm } from '~/models/book';

export default function Home() {
  const methods = useForm<IBookReviewForm>();

  const { currentStep, goToNext } = useStepNavigation();

  return (
    <Container>
      <h1>도서 리뷰 작성</h1>
      <div>
        현재 단계: {currentStep}/{LAST_STEP}
      </div>

      <FormProvider {...methods}>
        {currentStep === 1 && <BasicInfo onNext={goToNext} />}
      </FormProvider>
    </Container>
  );
}

const Container = styled.main`
  max-width: 480px;
  width: 100%;
  min-height: 400px;
  margin: auto;
`;
