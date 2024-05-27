import { Config, defineConfig } from '@wagmi/cli';
import { foundry } from '@wagmi/cli/plugins';

export type MaybeArray<T> = T | T[];
export type MaybePromise<T> = T | Promise<T>;

const config: MaybeArray<Config> | (() => MaybePromise<MaybeArray<Config>>) =
  defineConfig({
    out: 'wagmi/generated.ts',
    contracts: [],
    plugins: [
      foundry({
        project: './',
      }),
    ],
  });

export default config;
