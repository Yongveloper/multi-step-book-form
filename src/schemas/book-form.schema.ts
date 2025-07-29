import { z } from 'zod';

import {
  BOOK_STATUS,
  FORM_FIELDS,
  RECOMMENDATION,
} from '~/constants/book-form.constant';
import { isDateAfter } from '~/utils/data';

export const bookFormSchema = z
  .object({
    bookTitle: z.string().min(1, { error: '도서명을 입력해주세요' }),
    author: z.string().min(1, { error: '저자를 입력해주세요' }),
    publishDate: z.string().min(1, { error: '출판일을 입력해주세요' }),
    totalPages: z.coerce
      .number<number>({
        error: (issue) =>
          issue.input === undefined
            ? '총 페이지 수를 입력해주세요'
            : '숫자만 입력 가능합니다',
      })
      .min(1, '1 이상의 숫자를 입력해주세요'),
    readingStatus: z
      .enum(['', ...Object.values(BOOK_STATUS)] as const)
      .refine((value) => value !== '', {
        error: '독서 상태를 선택해주세요',
      }),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    recommendation: z
      .enum(['', ...Object.values(RECOMMENDATION)] as const)
      .refine((value) => value !== '', {
        error: '추천 여부를 선택해주세요',
      }),
    rating: z
      .number()
      .min(0.5, '별점은 0.5 이상이어야 합니다')
      .max(5, '별점은 5 이하여야 합니다'),
  })
  .refine(
    (data) => {
      const shouldDisableStartDate =
        !data.readingStatus || data.readingStatus === BOOK_STATUS.WANT_TO_READ;

      if (!shouldDisableStartDate && !data.startDate) {
        return false;
      }

      return true;
    },
    {
      error: '독서 시작일을 입력해주세요',
      path: [FORM_FIELDS.START_DATE],
    },
  )
  .refine(
    (data) => {
      const shouldDisableEndDate =
        !data.readingStatus || data.readingStatus !== BOOK_STATUS.READ;

      if (!shouldDisableEndDate && !data.endDate) {
        return false;
      }

      return true;
    },
    {
      error: '독서 종료일을 입력해주세요',
      path: [FORM_FIELDS.END_DATE],
    },
  )
  .refine(
    (data) => {
      const shouldDisableStartDate =
        !data.readingStatus || data.readingStatus === BOOK_STATUS.WANT_TO_READ;

      if (shouldDisableStartDate || !data.startDate) return true;

      if (data.endDate && isDateAfter(data.startDate, data.endDate)) {
        return false;
      }

      return true;
    },
    {
      error: '독서 시작일은 종료일보다 이전이어야 합니다',
      path: [FORM_FIELDS.START_DATE],
    },
  )
  .refine(
    (data) => {
      const shouldDisableStartDate =
        !data.readingStatus || data.readingStatus === BOOK_STATUS.WANT_TO_READ;

      if (shouldDisableStartDate || !data.startDate) return true;

      if (data.publishDate && isDateAfter(data.publishDate, data.startDate)) {
        return false;
      }

      return true;
    },
    {
      error: '독서 시작일은 출판일 이후여야 합니다',
      path: [FORM_FIELDS.START_DATE],
    },
  )
  .refine(
    (data) => {
      const shouldDisableEndDate =
        !data.readingStatus || data.readingStatus !== BOOK_STATUS.READ;

      if (shouldDisableEndDate || !data.endDate) return true;

      if (data.publishDate && !isDateAfter(data.endDate, data.publishDate)) {
        return false;
      }

      return true;
    },
    {
      error: '독서 종료일은 출판일 이후여야 합니다',
      path: [FORM_FIELDS.END_DATE],
    },
  );

export type BookFormData = z.infer<typeof bookFormSchema>;
