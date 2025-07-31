import { FormProvider } from 'react-hook-form';

import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';

import BasicInfo from '~/components/book-form/basic-info';
import BookEvaluation from '~/components/book-form/book-evaluation';
import { useBookFormNavigation } from '~/components/book-form/hooks/use-book-form-navigation';
import Preview from '~/components/book-form/preview';
import Review from '~/components/book-form/review';
import {
  FORM_DEFAULT_VALUES,
  LAST_STEP,
  STORAGE_KEY,
} from '~/constants/book-form.constant';
import { useBreakpointVisibility } from '~/hooks/use-breakpoint-visibility';
import { useFormWithPersistence } from '~/hooks/use-form-with-persistence';
import { BookFormData, bookFormSchema } from '~/schemas/book-form.schema';

export default function Home() {
  const methods = useFormWithPersistence<BookFormData>(
    {
      resolver: zodResolver(bookFormSchema),
      defaultValues: FORM_DEFAULT_VALUES,
    },
    {
      storageKey: STORAGE_KEY,
    },
  );

  const { currentStep, handleStepNext, handleStepPrev } =
    useBookFormNavigation(methods);
  const isPreviewVisible = useBreakpointVisibility(1024);

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
              onPrev={() => handleStepPrev(2)}
            />
          )}
          {currentStep === 3 && (
            <Review
              onNext={() => handleStepNext(3)}
              onPrev={() => handleStepPrev(3)}
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
