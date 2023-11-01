import type { MetaFunction } from '@remix-run/node';
import { Button } from '@vertc/design-system';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="h-full w-full bg-black flex justify-center">
      <div className="h-full w-full p-5">
        <h1 className="text-brand">Dashboard</h1>
        <Button variant={'ghost'}>Testandos</Button>
      </div>
    </div>
  );
}
