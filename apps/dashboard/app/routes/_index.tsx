import type { MetaFunction } from '@remix-run/node';
import { Button, Card, CardContent, Input } from 'vertc-design-system'; // Se você já tem um sistema de design chamado 'vertc-design-system', caso contrário, use '@headlessui/react' para botões.

export const meta: MetaFunction = () => {
  return [{ title: 'Login Dashboard' }];
};

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-[25rem] w-full space-y-8">
        <CardContent>
          <div className="flex flex-col justify-center items-center space-y-0">
            <img
              src="/resources/images/logo.svg"
              alt="Logo"
              height={50}
              width={50}
              className="h-24 w-24"
            />
            <div className="text-center text-xl font-normal text-gray-900">
              Interface Gestão
            </div>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
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
                <Button variant={'link'} className="font-medium">
                  Esqueceu sua senha?
                </Button>
              </div>
            </div>
            <div>
              <Button type="submit" variant={'default'} className="w-full">
                Entrar
              </Button>
            </div>
            <div>
              <Button type="button" variant={'outline'} className="w-full">
                Criar conta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
