import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.post('/api/auth/login', () =>
    HttpResponse.json({
      accessToken: '123',
      refreshToken: 'abc',
    }),
  ),
  http.get('/api/auth', () => console.log('Auth')),
];
