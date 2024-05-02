import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { anvil, mainnet, sepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, anvil],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
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
