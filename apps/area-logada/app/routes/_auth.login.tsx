import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useActionData } from '@remix-run/react';
import { errors, routes } from 'common/constants';
import { useForm } from 'react-hook-form';
import { Button, Input, useToast } from 'vertc-design-system';
import * as z from 'zod';

import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/node';
import { useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Login | Portal do Cliente',
    },
  ];
};

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: errors.required })
    .email({ message: errors.invalid_email })
    .transform((value) => value.toLowerCase()),
  password: z.string().trim().min(1, { message: errors.required }),
});

export default function AuthLogin() {
  // const { showMessage } = useMessage();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {}, []);

  const onSubmit = async () => {
    toast({
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2023 at 5:57 PM',
      _type: 'success',
    });
  };

  return (
    <>
      <div className="flex flex-col justify-end items-center space-y-0 my-10">
        <img
          src="/resources/images/logo.svg"
          alt="Logo"
          height={60}
          width={100}
          className="h-auto w-28"
        />
      </div>
      <form className="space-y-3">
        <div className="space-y-7">
          <Input type="email" placeholder="Seu e-mail" />
          <Input type="password" placeholder="Sua senha" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-900"
            >
              Manter conectado
            </label>
          </div>
          <div className="text-sm">
            <Link to={routes.forgotPassword} prefetch="render">
              <Button variant={'link'} className="font-medium">
                Esqueceu sua senha?
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-4">
          <Button type="button" onClick={onSubmit} className="w-full">
            Entrar
          </Button>

          <Link to={routes.register} prefetch="render">
            <Button type="button" variant={'outline'} className="w-full">
              Criar conta
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { ...values } = Object.fromEntries(formData) as z.infer<
    typeof formSchema
  >;
  try {
    // const userService = new UserService();
    const response = new Response();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // await userService.login({
    //   request,
    //   response,
    //   payload: {
    //     email: values.email,
    //     password: values.password,
    //   },
    // });

    return redirect(routes.app, {
      headers: response.headers,
    });
  } catch (error) {
    return json({ error, lastSubmission: values });
  }
}
