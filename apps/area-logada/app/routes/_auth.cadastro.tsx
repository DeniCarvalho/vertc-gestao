import { Link } from '@remix-run/react';
import { routes } from 'common/constants';
import { Button, Input } from 'vertc-design-system';

export default function AuthRegister() {
  return (
    <>
      <div className="w-full flex flex-col justify-end items-center space-y-6 my-10">
        <img
          src="/resources/images/logo.svg"
          alt="Logo"
          height={60}
          width={100}
          className="h-auto w-28"
        />
        <div className="flex flex-col space-y-2 text-center">
          <h5 className="text-center text-xl font-bold">Criar conta</h5>
          <p className="m-0 p-0 text-sm">
            Preencha as informações abaixo para criar a sua conta:
          </p>
        </div>
        <Link to={routes.login} prefetch="render" className="w-full" replace>
          <Button type="button" variant={'outline'} className="w-full">
            Já possuo uma conta
          </Button>
        </Link>
      </div>
      <form className="space-y-6">
        <div className="space-y-6">
          <Input type="email" placeholder="Seu e-mail" />
          <Input type="password" placeholder="Sua senha" />
          <Input type="password" placeholder="Confirmar senha" />
        </div>

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </>
  );
}
