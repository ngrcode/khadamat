import { StatusBadge } from "@repo/ui/molecules/status-badge";
import type { ColumnsType } from "antd/es/table";

import { atmStatusColors, atmStatusLabels } from "../model/atm-status";
import type { ATM } from "../types/atm.types";

const renderStatus = (_: unknown, { status }: ATM) => (
  <StatusBadge
    label={atmStatusLabels[status]}
    status={atmStatusColors[status]}
  />
);

export const atmColumns: ColumnsType<ATM> = [
  { title: "شناسه پایانه", dataIndex: "terminalId", key: "terminalId" },
  { title: "شعبه", dataIndex: "branch", key: "branch" },
  { title: "موقعیت", dataIndex: "location", key: "location" },
  {
    title: "وضعیت",
    key: "status",
    render: renderStatus,
  },
];
