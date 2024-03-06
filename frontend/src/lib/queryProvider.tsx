import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'

const client = new QueryClient();


type Props = React.PropsWithChildren;

const QueryProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider