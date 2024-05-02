'use client';

import { PropsWithChildren } from 'react';

import { wagmiConfig } from '~/lib/viem';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type State, WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

interface Props extends PropsWithChildren {
  initialState?: State;
}

const Web3Provider = ({ children, initialState }: Props) => {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
