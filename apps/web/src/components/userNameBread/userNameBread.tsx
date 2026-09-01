'use client';

import { useEffect, useState } from 'react';
import { BreadcrumbNav, t } from "@/components";
import { useAuthStore } from "@/store/authStore";

const UserNameBread = () => {
  const [isClient, setIsClient] = useState(false);

  const userName = useAuthStore((state) => state.userName);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {

    setIsClient(true);
  }, [isAuthenticated]);

  if (!isClient) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <BreadcrumbNav
        items={[
          { title: `${t('dearUser')} ${userName}` }
        ]}
      />
    );
  }

  return null;
};

export default UserNameBread;