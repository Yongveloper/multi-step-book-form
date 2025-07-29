import { BOOK_STATUS } from './book.constant';

export const LAST_STEP = 5;

export const FORM_FIELDS = {
  BOOK_TITLE: 'bookTitle',
  AUTHOR: 'author',
  PUBLISH_DATE: 'publishDate',
  TOTAL_PAGES: 'totalPages',
  READING_STATUS: 'readingStatus',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
} as const;

export const READING_STATUS_OPTIONS = [
  { value: '', label: '선택' },
  { value: BOOK_STATUS.WANT_TO_READ, label: '읽고 싶은 책' },
  { value: BOOK_STATUS.READING, label: '읽는 중' },
  { value: BOOK_STATUS.READ, label: '읽음' },
  { value: BOOK_STATUS.HOLD, label: '보류 중' },
] as const;
