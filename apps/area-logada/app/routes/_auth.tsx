import { Outlet } from '@remix-run/react';
import { Card, CardContent } from 'vertc-design-system';

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-[25rem] w-full space-y-8">
        <CardContent>
          <div className="pb-2">
            <Outlet />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
