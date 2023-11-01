import type { MetaFunction } from '@remix-run/node';
import { Button } from 'vertc-design-system';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="h-full w-full bg-transparent">
      <div className="h-full w-full">
        <h1 className="text-brand">Área logada</h1>
        <Button>Testandos</Button>
      </div>
    </div>
  );
}
