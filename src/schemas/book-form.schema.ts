import { z } from 'zod';

import {
  BOOK_STATUS,
  FORM_FIELDS,
  RECOMMENDATION,
} from '~/constants/book-form.constant';
import { isDateAfter } from '~/utils/data';

export const bookFormSchema = z
  .object({
    [FORM_FIELDS.BOOK_TITLE]: z.string().min(1, '도서명을 입력해주세요'),
    [FORM_FIELDS.AUTHOR]: z.string().min(1, '저자를 입력해주세요'),
    [FORM_FIELDS.PUBLISH_DATE]: z.string().min(1, '출판일을 입력해주세요'),
    [FORM_FIELDS.TOTAL_PAGES]: z
      .number('총 페이지 수를 입력해주세요')
      .min(1, '1 이상의 숫자를 입력해주세요'),
    [FORM_FIELDS.READING_STATUS]: z
      .enum(['', ...Object.values(BOOK_STATUS)] as const)
      .refine((value) => value !== '', {
        error: '독서 상태를 선택해주세요',
      }),
    [FORM_FIELDS.START_DATE]: z.string().optional(),
    [FORM_FIELDS.END_DATE]: z.string().optional(),
    [FORM_FIELDS.RECOMMENDATION]: z
      .enum(['', ...Object.values(RECOMMENDATION)] as const)
      .refine((value) => value !== '', {
        error: '추천 여부를 선택해주세요',
      }),
    [FORM_FIELDS.RATING]: z
      .number('별점을 선택해주세요')
      .min(0.5, '별점은 0.5 이상이어야 합니다')
      .max(5, '별점은 5 이하여야 합니다'),
    [FORM_FIELDS.REVIEW]: z.string().optional(),
    [FORM_FIELDS.QUOTES]: z
      .array(
        z.object({
          content: z.string().min(1, '인용구를 입력해주세요'),
          page: z.number().nullable(),
        }),
      )
      .optional(),
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
  )
  .refine(
    (data) => {
      if (data.rating === 1 || data.rating === 5) {
        if (!data.review || data.review.trim().length < 100) {
          return false;
        }
      }

      return true;
    },
    {
      error:
        '별점이 1점 또는 5점인 경우 의견을 뒷받침하기 위해 최소 100자 이상 작성해주세요',
      path: [FORM_FIELDS.REVIEW],
    },
  )
  .superRefine((data, ctx) => {
    if (!data.quotes || data.quotes.length === 0) {
      return;
    }

    const requiresPageValidation = data.quotes.length >= 2;

    data.quotes.forEach((quote, index) => {
      if (requiresPageValidation && !quote.page) {
        ctx.addIssue({
          code: 'custom',
          message: '인용구가 2개 이상일 때는 페이지 번호를 입력해주세요',
          path: [FORM_FIELDS.QUOTES, index, 'page'],
        });
        return;
      }

      if (quote.page) {
        if (!Number(quote.page)) {
          ctx.addIssue({
            code: 'custom',
            message: '페이지 번호는 숫자만 입력 가능합니다',
            path: [FORM_FIELDS.QUOTES, index, 'page'],
          });
          return;
        }

        if (quote.page < 1) {
          ctx.addIssue({
            code: 'custom',
            message: '페이지 번호는 1 이상이어야 합니다',
            path: [FORM_FIELDS.QUOTES, index, 'page'],
          });
          return;
        }

        if (data.totalPages && quote.page > data.totalPages) {
          ctx.addIssue({
            code: 'custom',
            message: `페이지 번호는 총 페이지 수(${data.totalPages})보다 같거나 작아야 합니다`,
            path: [FORM_FIELDS.QUOTES, index, 'page'],
          });
        }
      }
    });
  });

export type BookFormData = z.infer<typeof bookFormSchema>;
