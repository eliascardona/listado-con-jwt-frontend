import { z } from 'zod';
import { zod_string, zod_uuid } from '../shared/types';

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const BookCreationEnum = z.enum([
  'CREATE_BOOK',
  'EDIT_BOOK',
  'UPDATE_BOOK',
  'VERIFY_BOOK',
]);
export type BookCreationAction = z.infer<typeof BookCreationEnum>;

/*
  SAVE MESSAGE COMMAND
*/
const CreateBookCommandSchema = z.object({
  title: zod_string,
  description: zod_string,
});
export type CreateBookCommand = z.infer<typeof CreateBookCommandSchema>;

export const UpdateBookCommandSchema = z.object({
  bookId: z.string().email(),
});
export type UpdateBookCommand = z.infer<typeof CreateBookCommandSchema>;


/*
  POLYMORPHIC REQUEST SCHEMA
*/
const BookCreationRequestBaseSchema = z.object({
  intent: BookCreationEnum,
});

export const UpdateBookRequestBodySchema = BookCreationRequestBaseSchema.extend({
  intent: z.literal(BookCreationEnum.enum.UPDATE_BOOK),
  body: UpdateBookCommandSchema,
});
export type UpdateBookRequestBody = z.infer<typeof CreateBookRequestBodySchema>;

export const CreateBookRequestBodySchema = BookCreationRequestBaseSchema.extend({
  intent: z.literal(BookCreationEnum.enum.CREATE_BOOK),
  body: CreateBookCommandSchema,
});
export type CreateBookRequestBody = z.infer<typeof CreateBookRequestBodySchema>;



export const BookCreationRequestBodySchema = z.discriminatedUnion('intent', [
  CreateBookRequestBodySchema,
  UpdateBookRequestBodySchema
]);
export type BookCreationRequestBody = z.infer<typeof BookCreationRequestBodySchema>;
