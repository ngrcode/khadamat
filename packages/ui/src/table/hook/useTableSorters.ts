export const createNumberSorter =
        (field: string) =>
                (a: any, b: any) =>
                        Number(a?.[field] ?? 0) -
                        Number(b?.[field] ?? 0);

export const createStringSorter =
        (field: string) =>
                (a: any, b: any) =>
                        String(a?.[field] ?? '').localeCompare(
                                String(b?.[field] ?? ''),
                                'fa',
                                {
                                        numeric: true,
                                        sensitivity: 'base',
                                }
                        );

export const createDateSorter =
        (field: string) =>
                (a: any, b: any) =>
                        new Date(a?.[field]).getTime() -
                        new Date(b?.[field]).getTime();