import { Link } from '@remix-run/react';
import { routes } from 'common/constants';
import { Button, Input } from 'vertc-design-system';

export default function AuthForgotPassword() {
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
          <h5 className="text-center text-xl font-bold">Esqueceu sua senha?</h5>
          <p className="m-0 p-0 text-sm">
            Preencha as informações abaixo para refedinir sua senha. Você
            receberá um e-mail com o link para fazer o cadastro da nova senha.
          </p>
        </div>
      </div>
      <form className="space-y-8">
        <Input type="email" placeholder="Seu e-mail" />
        <div className="w-full flex flex-col space-y-4">
          <Link to={routes.login} prefetch="render" replace>
            <Button type="button" variant={'outline'} className="w-full">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </div>
      </form>
    </>
  );
}
