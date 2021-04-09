import React, { useEffect, useState, useContext } from "react";
import useInjectedAccounts, { UseAccounts } from "./useInjectedAccounts";
import type { DeriveBalancesAll } from '@polkadot/api-derive/types';
import { useApi, useCall } from "@polkadot/react-hooks";
import { formatTokenDecimals } from "../utils/formats";

import store from "store";

const STORAGE_KEY = "options:InputAddress";

interface UseCurrentUser extends UseAccounts {
  currentAddress: string;
  setCurrentUser: Function;
  getUserBalance: Function;
  isApiReady: boolean;
}

function readOptions(): Record<string, Record<string, string>> {
  return (store.get(STORAGE_KEY) as Record<string, Record<string, string>>) || { defaults: {} };
}

function getLastValue(): any {
  const options = readOptions();
  return options.defaults.account || "";
}

function setLastValue(value: string): void {
  const options = readOptions();
  options.defaults.account = value;
  store.set(STORAGE_KEY, options);
}

export const CurrentUserContext = React.createContext<UseCurrentUser>(({} as unknown) as UseCurrentUser);

export function useCurrentUserContext() {
  return useContext(CurrentUserContext);
}

export default function useCurrentUser(): UseCurrentUser {
  const {allAccounts, getAccount, hasAccounts, isReady} = useInjectedAccounts();
  const [currentAddress, setCurrentAddress] = useState<string>(isReady && hasAccounts ? allAccounts[0].address : '');
  const { api, isApiReady } = useApi()
  // must go two way
  const balancesAll = useCall<DeriveBalancesAll>(!!currentAddress && isApiReady && api.derive.balances.all, [currentAddress]);
  console.log('wee',  balancesAll)
  if (balancesAll) {
    const res = balancesAll.freeBalance.add(balancesAll.reservedBalance)
    console.log('res', res.toString())
  }

  useEffect(() => {
    if (currentAddress === '' && isReady && hasAccounts) {
      setCurrentAddress(allAccounts[0].address)
    }
    if (currentAddress !== '' && !getAccount(currentAddress)) {
      if (isReady && hasAccounts) {
        setCurrentAddress(allAccounts[0].address)
      }
    }
  }, [isReady, hasAccounts, allAccounts, getAccount])

  const getUserBalance = async () => {
    if (currentAddress !== "") {
      try {

        const res = await api.query.system.account(currentAddress);
        console.log('resdata', res.data.free.toString(0))
       
        const amt = formatTokenDecimals(
          res.data.free.toString(),
          Number(
            api.registry
              .getChainProperties()
              ?.tokenDecimals.toJSON()
              ?.toString()
          )
        );
        return amt;
      } catch (err) {
        return err;
      }
    }
    return Promise.reject("No address");
  };

  const setCurrentUser = (address: string) => {
    if (getAccount(address) !== undefined) {
      setCurrentAddress(address);
    }
  };

  useEffect(() => {
    setCurrentAddress(getLastValue());
  }, []);

  // useEffect(() => {
  //   if (accountsInfo.isReady && !accountsInfo.isAccount(lastValue)) {
  //     setCurrentAddress("");
  //   }
  // }, [accountsInfo, lastValue]);

  useEffect(() => {
    if (currentAddress !== "") {
      setLastValue(currentAddress);
    }
  }, [currentAddress]);

  return { currentAddress, allAccounts, getAccount, hasAccounts, isReady, setCurrentUser, getUserBalance, isApiReady };
}
