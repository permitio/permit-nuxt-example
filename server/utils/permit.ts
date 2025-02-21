import { Permit } from 'permitio';

const config = useRuntimeConfig(); // using Nuxt runtime to get env vars
export const permit = new Permit({
  pdp: config.permitPdp,
  token: config.permitToken
});
