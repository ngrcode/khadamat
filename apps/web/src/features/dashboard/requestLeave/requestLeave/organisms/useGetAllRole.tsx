import { useRoleGetAllRole } from '@/generated/api/role/role';


export const useGetActiveUnitEmployee = () => {
  
  const selectFunction = (data: any) => {
    return {
      items: (data?.info ?? data?.result?.info ?? []).map((dataBody: any) => ({
        value: dataBody?.id ?? dataBody?.roleId ?? dataBody?.userId,
        label: dataBody?.name ?? dataBody?.title ?? dataBody?.roleName ?? dataBody?.menuType,
      })),
    };
  };

  const { data: dataGetActiveUnitEmployee, isSuccess: isSuccessGetActiveUnitEmployee } = useRoleGetAllRole(undefined, {
    query: { select: selectFunction },
  });
  return { dataGetActiveUnitEmployee: dataGetActiveUnitEmployee?.items, isSuccessGetActiveUnitEmployee };
};
