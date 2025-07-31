export const LAST_STEP = 5;

export const BOOK_STATUS = {
  READING: 'reading',
  WANT_TO_READ: 'want_to_read',
  READ: 'read',
  HOLD: 'hold',
} as const;

export const RECOMMENDATION = {
  YES: 'yes',
  NO: 'no',
} as const;

export const FORM_FIELDS = {
  BOOK_TITLE: 'bookTitle',
  AUTHOR: 'author',
  PUBLISH_DATE: 'publishDate',
  TOTAL_PAGES: 'totalPages',
  READING_STATUS: 'readingStatus',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  RECOMMENDATION: 'recommendation',
  RATING: 'rating',
  REVIEW: 'review',
} as const;

export const READING_STATUS_OPTIONS = [
  { value: '', label: '선택' },
  { value: BOOK_STATUS.WANT_TO_READ, label: '읽고 싶은 책' },
  { value: BOOK_STATUS.READING, label: '읽는 중' },
  { value: BOOK_STATUS.READ, label: '읽음' },
  { value: BOOK_STATUS.HOLD, label: '보류 중' },
] as const;

export const RECOMMENDATION_OPTIONS = [
  { value: '', label: '선택' },
  { value: RECOMMENDATION.YES, label: '추천함' },
  { value: RECOMMENDATION.NO, label: '추천하지 않음' },
] as const;

export const STEP_VALIDATION_FIELDS = {
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
  3: [FORM_FIELDS.REVIEW],
} as const;

export const FORM_DEFAULT_VALUES = {
  [FORM_FIELDS.BOOK_TITLE]: '',
  [FORM_FIELDS.AUTHOR]: '',
  [FORM_FIELDS.PUBLISH_DATE]: '',
  [FORM_FIELDS.TOTAL_PAGES]: 0,
  [FORM_FIELDS.READING_STATUS]: '',
  [FORM_FIELDS.START_DATE]: '',
  [FORM_FIELDS.END_DATE]: '',
  [FORM_FIELDS.RECOMMENDATION]: '',
  [FORM_FIELDS.RATING]: 0,
  [FORM_FIELDS.REVIEW]: '',
} as const;
