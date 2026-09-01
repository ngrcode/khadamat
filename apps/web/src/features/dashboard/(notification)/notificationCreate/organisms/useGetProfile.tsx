import { useEmployeeGetActiveUnitEmployee } from '@/generated/api/employee/employee';


export const useGetActiveUnitEmployee = () => {
  
  const selectFunction = (data: any) => {
    return {
      items: (data?.info ?? data?.result?.info ?? []).map((dataBody: any) => ({
        value: dataBody?.id,
        label: dataBody?.title,
      })),
    };
  };

  const { data: dataGetActiveUnitEmployee, isSuccess: isSuccessGetActiveUnitEmployee } = useEmployeeGetActiveUnitEmployee({
    query: { select: selectFunction },
  });
  return { dataGetActiveUnitEmployee: dataGetActiveUnitEmployee?.items, isSuccessGetActiveUnitEmployee };
};
