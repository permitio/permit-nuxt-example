import { Permit } from 'permitio';

const config = useRuntimeConfig(); // using Nuxt runtime to get env vars
export const permit = new Permit({
  pdp: 'http://localhost:7766', // config.permitPdp,
  token: config.permitToken
});
