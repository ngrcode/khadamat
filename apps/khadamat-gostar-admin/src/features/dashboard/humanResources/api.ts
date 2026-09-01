import type {
  HokmDetailResponse,
  InstallmentDeductionFormValues,
} from './types';

const parseHokmDetailResponse = (responseText: string): HokmDetailResponse => {
  if (!responseText) {
    return { info: null };
  }

  try {
    const data = JSON.parse(responseText);
    const response = data?.result ?? data ?? {};

    return {
      info: response?.info ?? null,
      doTime: response?.doTime ?? data?.doTime,
      description: response?.description ?? data?.description,
      type: response?.type ?? data?.type,
    };
  } catch {
    return { info: responseText };
  }
};

export const getHokmDetail = async (year: string): Promise<HokmDetailResponse> => {
  const params = new URLSearchParams({ year });
  const response = await fetch(`/api/employee/hokm-detail?${params.toString()}`, {
    method: 'GET',
    headers: {
      accept: 'text/plain',
    },
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(responseText || 'خطا در دریافت احکام کارگزینی');
  }

  return parseHokmDetailResponse(responseText);
};

export const requestInstallmentDeduction = async ({
  fullName,
  facilities,
  organizationName,
  branchName,
}: InstallmentDeductionFormValues) => {
  const response = await fetch('/api/human-resource/request', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personType: 1,
      fullName,
      facilities,
      organizationType: 1,
      organizationName,
      branchName,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'خطا در ثبت گواهی کسر اقساط');
  }

  return response;
};
