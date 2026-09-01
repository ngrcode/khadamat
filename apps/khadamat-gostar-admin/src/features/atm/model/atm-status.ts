import type { ATMStatus } from "../types/atm.types";

export const atmStatusLabels: Record<ATMStatus, string> = {
  active: "فعال",
  inactive: "غیرفعال",
  maintenance: "در حال تعمیر",
};

export const atmStatusColors: Record<
  ATMStatus,
  "success" | "default" | "warning"
> = {
  active: "success",
  inactive: "default",
  maintenance: "warning",
};
