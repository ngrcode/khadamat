import type { ATM } from "../types/atm.types";

export const atmRows: readonly ATM[] = [
  {
    id: "atm-1",
    terminalId: "109842",
    branch: "مرکزی",
    location: "تهران، میدان ونک",
    status: "active",
  },
  {
    id: "atm-2",
    terminalId: "109843",
    branch: "ولیعصر",
    location: "تهران، خیابان ولیعصر",
    status: "maintenance",
  },
  {
    id: "atm-3",
    terminalId: "109844",
    branch: "سعادت‌آباد",
    location: "تهران، بلوار دریا",
    status: "inactive",
  },
];

export function filterAtms(atms: readonly ATM[], query: string) {
  const search = query.trim().toLocaleLowerCase("fa-IR");
  if (!search) return atms;
  return atms.filter(({ terminalId, branch, location }) =>
    [terminalId, branch, location].some((value) =>
      value.toLocaleLowerCase("fa-IR").includes(search),
    ),
  );
}
