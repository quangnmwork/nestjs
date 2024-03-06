import { useLocalStorage } from 'react-use';

import { Token } from '@/model';

type useTokenReturnValue = {
  token: Partial<Token>;
  actions: {
    setAccessToken: (value: string) => void;
    setRefreshToken: (value: string) => void;
    remove: () => void;
  };
};
export const useToken = (): useTokenReturnValue => {
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    'accessToken',
    '',
  );
  const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage(
    'refreshToken',
    '',
  );

  return {
    token: {
      accessToken,
      refreshToken,
    },
    actions: {
      setAccessToken,
      setRefreshToken,
      remove: (): void => {
        removeAccessToken();
        removeRefreshToken();
      },
    },
  };
};
