import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, CheckIcon, XCircle } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        actionTitle,
        _type,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex justify-start items-start">
              <div className="mt-[0.30rem]">
                {_type === 'success' ? (
                  <CheckIcon className="h-4 w-5 mr-2 text-success" />
                ) : null}
                {_type === 'error' ? (
                  <XCircle className="h-4 w-5 mr-2 text-destructive" />
                ) : null}
                {_type === 'warning' ? (
                  <AlertCircle className="h-4 w-5 mr-2 text-warning" />
                ) : null}
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>

            {action ? (
              <div className="ml-4 h-auto flex flex-col justify-center items-end">
                <ToastAction
                  altText={actionTitle || 'OK'}
                  onClick={() => action()}
                >
                  {actionTitle || 'OK'}
                </ToastAction>
              </div>
            ) : null}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
