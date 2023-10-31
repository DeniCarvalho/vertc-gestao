import type { MetaFunction } from '@remix-run/node';

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
      </div>
    </div>
  );
}
