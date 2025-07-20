import { BOOK_STATUS } from '~/constants/book';

export type BookStatus = (typeof BOOK_STATUS)[keyof typeof BOOK_STATUS];

export interface IBookReviewForm {
  bookTitle: string;
  author: string;
  publishDate: string;
  totalPages: number;
  readingStatus: BookStatus;
  startDate?: string;
  endDate?: string;
}
