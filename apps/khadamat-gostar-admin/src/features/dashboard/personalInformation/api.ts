import type {
  EmployeeShowResponse,
  EmployeeUpdatePayload,
} from './types';

const readErrorMessage = async (response: Response, fallback: string) => {
  const text = await response.text();

  if (!text) return fallback;

  try {
    const data = JSON.parse(text);
    return data?.message ?? data?.description ?? fallback;
  } catch {
    return text;
  }
};

const normalizeEmployeeShowResponse = (data: any): EmployeeShowResponse => {
  const response = data?.result ?? data ?? {};

  return {
    info: response.info ?? data?.info ?? null,
    description: response.description ?? data?.description,
    type: response.type ?? data?.type,
    doTime: response.doTime ?? data?.doTime,
    statusCode: response.statusCode ?? data?.statusCode,
  };
};

export const getEmployeeShow = async (
  id: string,
): Promise<EmployeeShowResponse> => {
  const params = new URLSearchParams({ id });
  const response = await fetch(`/api/employee/show?${params.toString()}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'خطا در دریافت اطلاعات شخصی'));
  }

  return normalizeEmployeeShowResponse(await response.json());
};

export const updateEmployee = async (payload: EmployeeUpdatePayload) => {
  const response = await fetch('/api/employee/update', {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'خطا در بروزرسانی اطلاعات شخصی'));
  }

  return response.json().catch(() => ({}));
};

export const uploadProfilePhoto = async ({
  employeeId,
  photo,
}: {
  employeeId: string;
  photo: File;
}) => {
  const formData = new FormData();
  formData.append('Photo', photo);
  formData.append('EmployeeId', employeeId);

  const response = await fetch('/api/employee/upload-profile-photo', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, 'خطا در آپلود تصویر پروفایل'));
  }

  return response.json().catch(() => ({}));
};
