import { Button } from '@/components/ui';
import axios from 'axios';

export type Props = React.PropsWithChildren<{}>;

export const AuthForm: React.FC<Props> = ({ }) => {
  const testMockData = () => {
    axios
      .post('/api/auth/login')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button onClick={testMockData}>test post</Button>
    </div>
  );
};
