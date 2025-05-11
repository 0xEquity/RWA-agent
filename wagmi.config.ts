/* eslint-disable camelcase */
import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { erc20Abi } from 'viem';
import { RentShare_Abi } from './app/abi/RentShare_Abi';
import { RENT_POSITION_AUTOMATER_Abi } from './app/abi/RentPositionAutomater_Abi';

export default defineConfig({
  out: 'app/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20Abi,
    },
    {
      name: 'rentShare',
      abi: RentShare_Abi,
    },
    {
      name: 'RentPositionAutomater',
      abi: RENT_POSITION_AUTOMATER_Abi
    }
    
  ],
  plugins: [react()],
});
