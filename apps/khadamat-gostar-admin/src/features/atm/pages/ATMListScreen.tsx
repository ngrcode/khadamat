import { ListPageLayout } from "@repo/ui/templates/list-page-layout";

import { ATMFilters } from "../molecules/ATMFilters";
import { ATMTable } from "../organisms/ATMTable";
import { atmRows } from "../model/atm-data";
import { ATMSearchProvider } from "../model/ATMSearchProvider";

export function ATMListScreen() {
  return (
    <ATMSearchProvider>
      <ListPageLayout title="پایانه‌های خودپرداز" filters={<ATMFilters />}>
        <ATMTable atms={atmRows} />
      </ListPageLayout>
    </ATMSearchProvider>
  );
}
