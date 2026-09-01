'use client';

import LayoutApp from '@/features/layout/LayoutApp';
import { SessionGuard } from '@/components/auth/SessionGuard';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionGuard>
      <LayoutApp>{children}</LayoutApp>
    </SessionGuard>
  );
};

export default Layout;
