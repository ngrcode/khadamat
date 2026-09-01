import { Yup, t, useAxiosQuery, useEffect, useMemo } from '@/components';
import { useRouter } from 'next/navigation';
import {
  buildPanelMenuString,
  MenuItem,
} from '../../../rolesCreate/organisms/MenuPermissionsFormik';
import { useAxiosMutation } from '@/hook/useAxsios/useAxiosMutation';
import { showSuccess } from '@/hook/useToust';

export interface RoleFormValues {
  Name: string;
  SelectedMenus: string[];
}

interface UseEditViewModelParams {
  dataEdit: any;
  handleData: () => void;
  onSuccess?: () => void;
}

const safeJsonParse = (value: any): any => {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);

    if (typeof parsed === 'string') {
      return JSON.parse(parsed);
    }

    return parsed;
  } catch {
    return [];
  }
};

const extractUrlsFromPanelMenu = (panelMenu: any): string[] => {
  const parsedMenu = safeJsonParse(panelMenu);

  if (!Array.isArray(parsedMenu)) return [];

  const urls: string[] = [];

  const walk = (items: MenuItem[]) => {
    items.forEach((item) => {
      if (item.url) {
        urls.push(item.url);
      }

      if (Array.isArray(item.child) && item.child.length > 0) {
        walk(item.child);
      }
    });
  };

  walk(parsedMenu);

  return urls;
};

export const useEditViewModel = ({
  dataEdit,
  handleData,
  onSuccess,
}: UseEditViewModelParams) => {
  const router = useRouter();

  const roleId = dataEdit?.id ?? dataEdit?.Id;

  const { data } = useAxiosQuery({
    queryKey: ['role', roleId],
    params: {
      id: roleId,
    },
    url: 'api/1.0/Role/GetById',
  });

  const initialValues = useMemo<RoleFormValues>(() => {
    return {
      Name: data?.info?.name ?? dataEdit?.name ?? dataEdit?.Name ?? '',
      SelectedMenus: extractUrlsFromPanelMenu(data?.info?.panelMenu),
    };
  }, [data, dataEdit]);

  const validationSchema = Yup.object({
    Name: Yup.string().required('نام نقش الزامی است'),
    SelectedMenus: Yup.array().min(1, 'حداقل یک دسترسی انتخاب کنید'),
  });

  const { mutateAsync, isSuccess } = useAxiosMutation('/api/1.0/Role/Edit');

  useEffect(() => {
    if (isSuccess) {
      showSuccess(t('theRollswereEditedSuccessfully'));
      handleData();
      onSuccess?.();
      router.push('/dashboard/roles');

    }
  }, [isSuccess, handleData, onSuccess, router]);

  const onSubmit = async (values: RoleFormValues) => {
    const payload = {
      method: 'PUTBODY' as const,
      Id: roleId,
      Name: values.Name,
      PanelMenu: buildPanelMenuString(values.SelectedMenus),
    };
    showSuccess(t('theRollswereEditedSuccessfully'));

    try {
      await mutateAsync(payload);
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    isSuccess,
  };
};
