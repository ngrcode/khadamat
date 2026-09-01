import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost/api/profile', () =>
    HttpResponse.json({
      id: 1,
      firstName: 'سارا',
      lastName: 'احمدی',
      role: 'admin',
    })
  ),
];
