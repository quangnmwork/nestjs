import { http, HttpResponse } from 'msw';

import { API_ROUTE } from '@/constants';
import { LoginBody, ProfileResponse, TokenResponse } from '@/model';

export const authHandlers = [
  http.post<never, LoginBody, TokenResponse>(
    API_ROUTE.LOGIN,
    async ({ request }) => {
      const data = await request.json();

      if (data.email === 'e@gmail.com')
        throw new HttpResponse(null, { status: 401 });

      return HttpResponse.json({
        accessToken: '123',
        refreshToken: 'abc',
      });
    },
  ),
  http.post<never, LoginBody, TokenResponse>(API_ROUTE.REGISTER, () =>
    HttpResponse.json({
      accessToken: '123',
      refreshToken: 'abc',
    }),
  ),
  http.get<never, null, ProfileResponse>(API_ROUTE.PROFILE, () =>
    HttpResponse.json({
      createdAt: '12-7-2001',
      email: 'q@gmail.com',
      id: 1,
      isActive: true,
      updatedAt: '12-7-2001',
    }),
  ),
];
