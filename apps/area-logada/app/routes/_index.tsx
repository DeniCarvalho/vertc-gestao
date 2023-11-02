import type { MetaFunction } from '@remix-run/node';
import { Button, Card, CardContent, Input } from 'vertc-design-system'; // Se você já tem um sistema de design chamado 'vertc-design-system', caso contrário, use '@headlessui/react' para botões.

export const meta: MetaFunction = () => {
  return [{ title: 'Login Área logada' }];
};

export default function Index() {
  return <h1>Dashboard</h1>;
}
