import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { Schema, z } from 'zod'

import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { toast } from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { API_ROUTE } from '@/constants';
import { GoogleLogin } from '@/feature/Auth/GoogleLogin';
import { useToken } from '@/hooks';
import { axiosClient } from '@/lib/axios';
import { LoginBody, TokenResponse } from '@/model';

export type Props = React.PropsWithChildren;

const formSchema: Schema<LoginBody> = z.object({
  email: z.string().email('Email is invalid'),
  password: z.string().min(1, 'Password is invalid'),
})

export const LoginForm: React.FC<Props> = () => {
  const form = useForm<LoginBody>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data: LoginBody): Promise<AxiosResponse<TokenResponse>> => axiosClient.post(API_ROUTE.LOGIN, data)
  })
  const { actions: { setAccessToken, setRefreshToken } } = useToken()

  async function onSubmit(values: LoginBody): Promise<void> {
    try {
      const { data } = await mutateAsync(values);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken)
    } catch (error) {
      toast({
        title: JSON.stringify(error)
      })
    }
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" autoComplete='false' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete='false'  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
            <GoogleLogin />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};