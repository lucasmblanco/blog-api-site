import React from 'react'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostComments from './PostComments';
import UserComment from './UserComment';

const queryClient = new QueryClient();

export default function QueryProvider({id}: {id: string}) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserComment id={id} />
      <PostComments id={id} />
    </QueryClientProvider>
  )
}
