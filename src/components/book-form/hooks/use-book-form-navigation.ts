import { UseFormReturn } from 'react-hook-form';

import { STEP_VALIDATION_FIELDS } from '~/constants/book-form.constant';
import { useStepNavigation } from '~/hooks/use-step-navigation';
import { BookFormData } from '~/schemas/book-form.schema';

export const useBookFormNavigation = (methods: UseFormReturn<BookFormData>) => {
  const { currentStep, goToNext, goToPrev } = useStepNavigation();

  const handleStepNext = async (step: keyof typeof STEP_VALIDATION_FIELDS) => {
    const fieldsToValidate = STEP_VALIDATION_FIELDS[step];
    const isFormValid = await methods.trigger(fieldsToValidate);

    if (isFormValid) {
      goToNext();
      return;
    }

    const firstErrorField = fieldsToValidate.find(
      (field) => field in methods.formState.errors,
    );

    if (firstErrorField) {
      methods.setFocus(firstErrorField);
    }
  };

  return { currentStep, handleStepNext, goToPrev };
};
