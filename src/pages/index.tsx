import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';

import BasicInfo from '~/components/book-form/basic-info';
import BookEvaluation from '~/components/book-form/book-evaluation';
import Preview from '~/components/book-form/preview';
import {
  LAST_STEP,
  STEP_VALIDATION_FIELDS,
} from '~/constants/book-form.constant';
import { useResize } from '~/hooks/use-resize';
import { useStepNavigation } from '~/hooks/use-step-navigation';
import { BookFormData, bookFormSchema } from '~/schemas/book-form.schema';

export default function Home() {
  const methods = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
  });
  const { currentStep, goToNext, goToPrev } = useStepNavigation();

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { width } = useResize();

  const handleStepNext = async (step: keyof typeof STEP_VALIDATION_FIELDS) => {
    const fieldsToValidate = STEP_VALIDATION_FIELDS[step];
    const isFormValid = await methods.trigger(fieldsToValidate);

    if (isFormValid) {
      goToNext();
    }
  };

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
          {currentStep === 1 && <BasicInfo onNext={() => handleStepNext(1)} />}
          {currentStep === 2 && (
            <BookEvaluation
              onNext={() => handleStepNext(2)}
              onPrev={goToPrev}
            />
          )}
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
