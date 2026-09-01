import { useEffect, useState } from 'react';

import { getQueryParams, setQueryParams } from './urlUtils';

export const useCustomTableViewModel = () =>
  // initialTotal: number
  {
    const [pagination, setPagination] = useState({
      current: getQueryParams().page || 1,
      pageSize: getQueryParams().pageSize || 10,
    });

    useEffect(() => {
      setQueryParams(pagination.current, pagination.pageSize);
    }, [pagination]);

    const handleTableChange = (pagination: any) => {
      setPagination({
        current: pagination.current,
        pageSize: pagination.pageSize,
      });
    };

    return { pagination, handleTableChange };
  };
