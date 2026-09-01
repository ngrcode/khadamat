'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

type FullPageLoadingProps = {
  open: boolean;
  message: string;
};

export function FullPageLoading({ open, message }: FullPageLoadingProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div
      role="alert"
      aria-live="assertive"
      aria-busy="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483646,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <img
        src="/loading-center.svg"
        alt=""
        style={{ width: 64, height: 64 }}
        className="animate-pulse"
      />
      <div
        className="animate-spin"
        style={{
          width: 40,
          height: 40,
          borderRadius: '9999px',
          border: '2px solid rgba(255,255,255,0.25)',
          borderTopColor: '#fff',
        }}
      />
      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
        {message}
      </Text>
    </div>,
    document.body,
  );
}
