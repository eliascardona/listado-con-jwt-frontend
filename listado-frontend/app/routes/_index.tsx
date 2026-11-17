import { data, useLoaderData } from 'react-router';
import { findAllBooks } from '~/lib/book-list/api';
import { apiClient } from '~/lib/infrastructure/api/client';
import { BookList } from '~/components/book-list/main-view';
import { GoToBookCreationButton } from '~/components/create-book/go-to-book-creation-button';
import type { BookDto } from '~/lib/book-list/response-types';
import { getAccessToken } from '~/lib/infrastructure/auth/utils';

import type { Route } from './+types/_index';


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
  const accessToken = await getAccessToken(args.request);
  
  console.log('[FROM LOADER]', accessToken);

  const books = await findAllBooks(apiClient)
  
  return data(books);
}

export default function BookListingIndexRoute() {
  const books = useLoaderData<typeof loader>();

  return (
    <div className='grid w-full'>
      <div className='grid w-3/4 place-self-center'>
        {/* row 1 */}
        <div className="flex justify-content-between mt-12 pb-6">
          <h2 className='text-2xl'>Listado de libros</h2>
          <GoToBookCreationButton />
        </div>

        {/* row 2 */}
        <BookList books={books} />
      </div>
    </div>
  );
}
