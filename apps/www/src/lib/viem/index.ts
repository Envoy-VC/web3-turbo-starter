import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { anvil, mainnet, sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';
import { env } from '~/env';

export const projectId = env.NEXT_PUBLIC_WALLETCONNECT_ID;

const metadata = {
  name: 'Web3 Turbo Starter',
  description: 'Web3 starter kit with turborepo, wagmi, and Next.js',
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, anvil],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [walletConnect({ projectId, metadata, showQrModal: false })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}
