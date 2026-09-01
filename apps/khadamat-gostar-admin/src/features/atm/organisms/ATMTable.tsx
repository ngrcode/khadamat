"use client";

import { DataTable } from "@repo/ui/organisms/data-table";
import { useMemo } from "react";

import { filterAtms } from "../model/atm-data";
import { useATMSearch } from "../model/ATMSearchProvider";
import type { ATM } from "../types/atm.types";
import { atmColumns } from "./atm-columns";

type ATMTableProps = { atms: readonly ATM[] };

export function ATMTable({ atms }: ATMTableProps) {
  const { search } = useATMSearch();
  const data = useMemo(() => filterAtms(atms, search), [atms, search]);

  return (
    <DataTable
      data={data}
      columns={atmColumns}
      pagination={{ pageSize: 10 }}
      rowKey="id"
    />
  );
}
