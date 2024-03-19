import {
  keepPreviousData,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React, { useState } from 'react';

import { Button } from '@/components/ui';

const productIdArr = [1, 2, 3];

type ProductItem = {
  id: number;
  title: string;
  image: string;
};

type Quote = {
  id: number;
  quote: string;
  character: string;
};

const fetchProduct = (id: number): Promise<ProductItem> =>
  fetch('https://fakestoreapi.com/products/' + id).then((res) => res.json());

const fetchNarutoQuote = (page: number): Promise<Quote[]> =>
  fetch(
    'https://animechan.xyz/api/quotes/anime?title=naruto&page=' + page,
  ).then((res) => res.json());

const Page = (): JSX.Element => {
  const [quotePage, setQuotePage] = useState(1);
  const queryClient = useQueryClient();

  const productQueries = useQueries({
    queries: productIdArr.map((id) => {
      return {
        queryKey: ['user', id],
        queryFn: () => fetchProduct(id),
      };
    }),
  });

  const productFourth = useQuery({
    queryFn: () => fetchProduct(4),
    queryKey: ['product', 4],
    enabled: productQueries.length == 3,
  });

  const retryQuery = useQuery({
    queryKey: ['err'],
    retry: 3,
    retryDelay: 10,
    queryFn: () => fetchProduct(100),
  });

  const quotesPaginationQuery = useQuery({
    queryKey: ['quotes', quotePage],
    queryFn: () => fetchNarutoQuote(quotePage),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className='my-10 border border-blue-800 px-3'>
        <h1 className='text-3xl text-blue-950 '>Pagination</h1>
        <div>
          {(quotesPaginationQuery.data || [])?.map((quote: Quote) => (
            <p className='p-2 bg-slate-400 my-2 rounded-sm'>
              {quote.id} {quote.quote} {quote.character}
            </p>
          ))}
        </div>
        <div className='my-1 text-blue-700'>
          Current Page : {quotePage} PlaceholderData :{' '}
          {quotesPaginationQuery.isPlaceholderData ? 'true' : 'false'}
        </div>
        <Button onClick={() => setQuotePage((page) => page - 1)}>
          Prev page
        </Button>
        <Button
          onMouseEnter={() => {
            queryClient.prefetchQuery({
              queryKey: ['quotes', quotePage + 1],
              queryFn: () => fetchNarutoQuote(quotePage + 1),
              gcTime: 10,
            });
          }}
          onClick={() => {
            setQuotePage((page) => page + 1);
          }}
        >
          Next page
        </Button>
      </div>
      <h1 className='text-red-600'>
        {retryQuery.isFetching} {retryQuery.isRefetchError} Error:{' '}
        {retryQuery.error?.message} {retryQuery.errorUpdateCount}{' '}
        {retryQuery.errorUpdatedAt}
      </h1>
      {productFourth.fetchStatus}
      {productFourth.dataUpdatedAt}
      {productFourth.data?.title}
      <div>
        {(productQueries || []).map((product, id) => (
          <div key={id}>
            <p>
              {product.data?.title} {product.data?.id} {product.dataUpdatedAt}
            </p>
            <img src={product.data?.image} alt='hi' className='w-20 h-20' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
