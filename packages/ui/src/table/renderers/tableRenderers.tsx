export const renderNumber = (value: any) =>
        value !== null &&
                value !== undefined &&
                !isNaN(Number(value))
                ? Number(value).toLocaleString('fa-IR')
                : '---';

export const renderCurrency = (value: any) =>
        value !== null &&
                value !== undefined &&
                !isNaN(Number(value))
                ? `${Number(value).toLocaleString('fa-IR')}`
                : '---';

export const renderText = (value: any) =>
        value || '---';