export function createResponseSelector<T>(
        mapper: (item: any) => T
) {
        return (data: any) => {
                if (!data) {
                        return {
                                Items: [],
                                TotalCount: 0,
                        };
                }

                const rawItems = Array.isArray(data)
                        ? data
                        : Array.isArray(data?.Items)
                                ? data.Items
                                : [];

                const totalCount = Array.isArray(data)
                        ? rawItems.length > 0
                                ? Number(rawItems[0]?.rowCount ?? 500)
                                : 0
                        : Number(
                                data?.TotalCount ??
                                data?.totalCount ??
                                0
                        );

                return {
                        Items: rawItems.map(mapper),
                        TotalCount: totalCount,
                };
        };
}