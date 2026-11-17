import {
  BookCreationEnum,
  type CreateBookCommand,
  type CreateBookRequestBody,
} from '~/lib/book-list/request-types';

export function formatDataIntoSaveMessageRequest(command: CreateBookCommand) {
  const format: CreateBookRequestBody = {
    intent: BookCreationEnum.enum.CREATE_BOOK,
    body: command,
  };

  return format;
}
