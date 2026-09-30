import { data, useActionData } from 'react-router';
import { MainViewLogin } from '~/components/auth/login/main-view';
import { performLogin } from '~/lib/infrastructure/auth/api';
import type { Route } from './+types/management-table._index';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Online Products Selling App' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export async function action(args: Route.ActionArgs) {
  const formData = await args.request.json();
  const context = args.context;

  if (!formData) throw new Error('Error in request body');

  const authResponse = await performLogin(formData);

  if (authResponse) {
    return data({
      success: true,
      message: 'Thanks, we have recieved your submission',
    });
  }
  return data({
    success: false,
    message: 'We got an internal error',
  });
}

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();

  return <MainViewLogin actionData={actionData} />;
}
