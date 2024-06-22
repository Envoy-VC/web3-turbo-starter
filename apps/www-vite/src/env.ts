import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {},
  clientPrefix: 'VITE_',
  client: {},
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
