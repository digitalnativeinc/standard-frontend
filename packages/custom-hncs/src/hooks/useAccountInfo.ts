import type { DeriveBalancesAll } from '@polkadot/api-derive/types';
import { useApi, useCall } from "@polkadot/react-hooks";

export default function useAccountInfo(address:string) {
  const { api, isApiReady } = useApi();

  const balancesAll = useCall<DeriveBalancesAll>(
    !!address && isApiReady && api.derive.balances.all,
    [address]
  );
  const balance = balancesAll
    ? balancesAll.freeBalance.add(balancesAll.reservedBalance)
    : null;
    
  return [balance];
}
