import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styled from '@emotion/styled';

import BasicInfo from '~/components/book-form/basic-info';
import Preview from '~/components/book-form/preview';
import { LAST_STEP } from '~/constants/form';
import { useResize } from '~/hooks/use-resize';
import { useStepNavigation } from '~/hooks/use-step-navigation';
import { IBookReviewForm } from '~/models/book';

export default function Home() {
  const methods = useForm<IBookReviewForm>();
  const { currentStep, goToNext } = useStepNavigation();

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { width } = useResize();

  useEffect(() => {
    setIsPreviewVisible(width ? width >= 1024 : false);
  }, [width]);

  return (
    <Container>
      <FormProvider {...methods}>
        <FormSection>
          <h1>도서 리뷰 작성</h1>
          <div>
            현재 단계: {currentStep}/{LAST_STEP}
          </div>
          {currentStep === 1 && <BasicInfo onNext={goToNext} />}
        </FormSection>

        {isPreviewVisible && (
          <PreviewSection>
            <Preview />
          </PreviewSection>
        )}
      </FormProvider>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const FormSection = styled.div`
  flex: 1;
  min-width: 400px;
  width: 100%;
`;

const PreviewSection = styled.div`
  flex: 0 0 300px;
`;
