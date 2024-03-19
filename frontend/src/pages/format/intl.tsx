import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  FormField,
  Input,
  Form,
  Button,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui';

const formatter = new Intl.NumberFormat('en-US');

/** Convert Intl format */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const moneyFormatter = {
  format: (value: number): string => {
    return formatter.format(value);
  },
  parse: (value: string): number => {
    /** 122.33入力ことできない*/
    const rawValue = parseInt(value?.replace(/\D/g, ''));
    return rawValue;
  },
};

const formSchema = z.object({
  money: z.preprocess((val) => moneyFormatter.parse(val as string), z.number()),
});

type FormType = z.infer<typeof formSchema>;

const Page = (): JSX.Element => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });
  const { control } = form;

  const onSubmit = (data: FormType): void => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Head>
        <title>Intl API</title>
      </Head>
      <Form {...form}>
        <form className='px-2 mt-3 w-64' onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={control}
              name='money'
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Money</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        onChange(
                          moneyFormatter.format(
                            // Convert 1,000 -> 1000
                            moneyFormatter.parse(e.target.value),
                          ),
                        );
                      }}
                      value={value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p>
            Current Money :{' '}
            {moneyFormatter.parse(form.watch('money')?.toString())}
          </p>
          <Button type='submit' className='my-2'>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Page;
