import { data, useLoaderData } from 'react-router';
import type { Route } from './+types/_index';
import { findAllBooks } from '~/lib/book/api';
import { apiClient } from '~/lib/infrastructure/api/client';
import { BookList } from '~/components/book-list/main-view';
import { GoToBookCreationButton } from '~/components/create-book/go-to-book-creation-button';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'A book list App' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const books = await findAllBooks(apiClient);
  
  return data(books);
}

export default function BookListingIndexRoute() {
  const books = useLoaderData<typeof loader>();

  return (
    <div className='grid w-full'>
      <div className='grid grid-rows-[20%_80%] w-3/4 h-3/4 place-self-center'>
        <GoToBookCreationButton />
        <BookList books={books} />
      </div>
    </div>
  );
}
