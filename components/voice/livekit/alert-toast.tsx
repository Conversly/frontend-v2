'use client';

import { ReactNode } from 'react';
import { toast as sonnerToast } from 'sonner';
import { Warning } from '@mui/icons-material';
import { Alert, AlertDescription, AlertTitle } from '@/components/voice/livekit/alert';

interface ToastProps {
  id: string | number;
  title: ReactNode;
  description: ReactNode;
}

export function toastAlert(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(
    (id) => <AlertToast id={id} title={toast.title} description={toast.description} />,
    { duration: 10_000 }
  );
}

export function AlertToast(props: ToastProps) {
  const { title, description, id } = props;

  return (
    <Alert onClick={() => sonnerToast.dismiss(id)} className="bg-accent w-full md:w-[364px]">
      <Warning sx={{ fontSize: 16 }} />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}

