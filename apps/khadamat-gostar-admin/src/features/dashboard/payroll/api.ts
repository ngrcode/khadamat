import type { PayrollStatementResponse } from "./types";

export type GetFishmanParams = {
  year: string;
  month: string;
};

const parseFishmanResponse = (
  responseText: string,
): PayrollStatementResponse => {
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

export const getFishman = async ({
  year,
  month,
}: GetFishmanParams): Promise<PayrollStatementResponse> => {
  const params = new URLSearchParams({ year, month });
  const response = await fetch(
    `/api/request-leave/get-fishman?${params.toString()}`,
    {
      method: "POST",
      headers: {
        accept: "text/plain",
      },
    },
  );
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(responseText || "خطا در دریافت فیش حقوقی");
  }

  return parseFishmanResponse(responseText);
};
