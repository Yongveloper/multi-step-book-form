import { UseFormReturn } from 'react-hook-form';

import { STEP_VALIDATION_FIELDS } from '~/constants/book-form.constant';
import { useStepNavigation } from '~/hooks/use-step-navigation';
import { BookFormData } from '~/schemas/book-form.schema';

export const useBookFormNavigation = (methods: UseFormReturn<BookFormData>) => {
  const { currentStep, goToNext, goToPrev } = useStepNavigation();

  const handleNext = async () => {
    const fieldsToValidate =
      STEP_VALIDATION_FIELDS[
        currentStep as keyof typeof STEP_VALIDATION_FIELDS
      ];

    if (fieldsToValidate === undefined) {
      return;
    }

    const isFormValid = await methods.trigger(fieldsToValidate, {
      shouldFocus: true,
    });

    if (isFormValid) {
      goToNext();
    }
  };

  return {
    currentStep,
    handleNext,
    handlePrev: goToPrev,
  };
};
