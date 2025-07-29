import { useFormContext } from 'react-hook-form';

import { FORM_FIELDS } from '~/constants/book-form.constant';
import { BookFormData } from '~/schemas/book-form.schema';

const STEP_VALIDATION_FIELDS = {
  1: [
    FORM_FIELDS.BOOK_TITLE,
    FORM_FIELDS.AUTHOR,
    FORM_FIELDS.PUBLISH_DATE,
    FORM_FIELDS.TOTAL_PAGES,
    FORM_FIELDS.READING_STATUS,
    FORM_FIELDS.START_DATE,
    FORM_FIELDS.END_DATE,
  ],
  2: [FORM_FIELDS.RECOMMENDATION, FORM_FIELDS.RATING],
} as const;

export function useFormStep(step: keyof typeof STEP_VALIDATION_FIELDS) {
  const { trigger } = useFormContext<BookFormData>();

  const handleNext = async (onNext: () => void) => {
    const fieldsToValidate = STEP_VALIDATION_FIELDS[step];
    const isFormValid = await trigger(fieldsToValidate);

    if (isFormValid) {
      onNext();
    }
  };

  return { handleNext };
}
