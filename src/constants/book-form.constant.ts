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
