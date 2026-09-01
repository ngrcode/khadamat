import { createMapper } from './createMapper';
import { createResponseSelector } from './createResponseSelector';

export function createReportMapper<T extends Record<string, any>>(
        config: any
) {
        return createResponseSelector(
                createMapper<T>(config)
        );
}