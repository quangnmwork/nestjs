import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '@/components/ui';

const formSchema = z.object({
  money: z.number(),
  cardNumber: z.number(),
});

type FormType = z.infer<typeof formSchema>;

const Page = (): JSX.Element => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form className='px-2 w-64'>
        <FormField
          control={form.control}
          name='money'
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Money</FormLabel>
              <FormControl>
                <NumericFormat
                  value={value}
                  customInput={Input}
                  thousandSeparator
                  onValueChange={(value) => {
                    onChange(value.floatValue);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <p className='my-1'>Current money : {form.watch('money')}</p>

        <FormField
          control={form.control}
          name='cardNumber'
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <PatternFormat
                  value={value}
                  format={'#### #### #### ####'}
                  customInput={Input}
                  onValueChange={(value) => {
                    onChange(value.floatValue);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <p className='my-1'>Current money : {form.watch('cardNumber')}</p>
      </form>
    </Form>
  );
};

export default Page;
