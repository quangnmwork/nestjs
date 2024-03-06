const API_PREFIX = '/api';

export const API_ROUTE = {
  GOOGLE_LOGIN: API_PREFIX.concat('/auth/google/login'),
  REDIRECT_GOOGLE_LOGIN: API_PREFIX.concat('/auth/google/redirect'),
  LOGIN: API_PREFIX.concat('/auth/login'),
  REGISTER: API_PREFIX.concat('/auth/register'),
  PROFILE: API_PREFIX.concat('/auth/profile'),
  REFRESH_TOKEN: API_PREFIX.concat('/auth/refresh'),
};
