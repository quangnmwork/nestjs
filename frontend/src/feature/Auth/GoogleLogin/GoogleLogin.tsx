import { Boxes } from 'lucide-react'

import { Button, } from '@/components/ui';
export type Props = React.PropsWithChildren;

export const GoogleLogin: React.FC<Props> = () => {
  return (
    <div>
      <small className='block text-center text-gray-400'>Or login with</small>
      <div className='text-center mt-3'>
        <Button size='icon' variant='outline' type='button'>
          <Boxes className='h-4 w-4' />
        </Button>
      </div>
    </div >
  )
};