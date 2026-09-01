import { describe, expect, it, vi } from 'vitest';

vi.mock('@/hook/useToust', () => ({
  showError: vi.fn(),
}));

describe('axios interceptor URL normalization', () => {
  it('keeps absolute backend URLs on the direct backend base in the browser', async () => {
    const { normalizeBrowserApiUrl } = await import(
      '@/configs/httpService/axios/axiosInterceptors'
    );

    expect(
      normalizeBrowserApiUrl(
        'http://62.60.165.23:50051/api/1/Employee/GetHokmGrid?Page=1'
      )
    ).toEqual({
      baseURL: 'http://62.60.165.23:50051/',
      url: '/api/1/Employee/GetHokmGrid?Page=1',
    });
  });

  it('resolves relative API URLs against the direct backend base', async () => {
    const { normalizeBrowserApiUrl } = await import(
      '@/configs/httpService/axios/axiosInterceptors'
    );

    expect(normalizeBrowserApiUrl('api/1/Ticket/GetAllTicket')).toEqual({
      baseURL: 'http://62.60.165.23:50051/',
      url: '/api/1/Ticket/GetAllTicket',
    });
  });

  it('converts stale local proxy URLs back to the direct backend base', async () => {
    const { normalizeBrowserApiUrl } = await import(
      '@/configs/httpService/axios/axiosInterceptors'
    );

    expect(
      normalizeBrowserApiUrl(
        '/api/backend/api/1/RequestLeave/DeleteExcel?Id=3014'
      )
    ).toEqual({
      baseURL: 'http://62.60.165.23:50051/',
      url: '/api/1/RequestLeave/DeleteExcel?Id=3014',
    });
  });
});
