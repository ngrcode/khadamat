import { t } from '@repo/i18n';

type FieldConfig = {
        source: string;
        defaultValue?: any;
        formatter?: (value: any, row?: any) => any;
};

type MapperConfig<T> = {
        [K in keyof T]: string | FieldConfig;
};

export function createMapper<T extends Record<string, any>>(
        config: MapperConfig<T>
) {
        return (item: Record<string, any>): T => {
                const result = {} as T;

                Object.entries(config).forEach(([targetKey, fieldConfig]) => {
                        const source =
                                typeof fieldConfig === 'string'
                                        ? fieldConfig
                                        : fieldConfig.source;

                        const defaultValue =
                                typeof fieldConfig === 'string'
                                        ? t('noData')
                                        : fieldConfig.defaultValue ?? t('noData');

                        const formatter =
                                typeof fieldConfig === 'string'
                                        ? undefined
                                        : fieldConfig.formatter;

                        let value = item?.[source];

                        if (
                                value === null ||
                                value === undefined ||
                                value === ''
                        ) {
                                value = defaultValue;
                        }

                        if (formatter) {
                                value = formatter(value, item);
                        }

                        result[targetKey as keyof T] = value;
                });

                return result;
        };
}