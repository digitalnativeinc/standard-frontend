// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React from 'react';
import { Route, Switch } from 'react-router';

import { HelpOverlay } from '@polkadot/react-components';

import { TransferHOC, MyTokenCards, Farm } from '@stnd/custom-hncs'
// import { useAccounts, useIpfs } from '@polkadot/react-hooks';

import basicMd from './md/basic.md';




function VaultApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {

  return <main className='vault--App'>
      <HelpOverlay md={basicMd as string} />
      <Switch>
        <Route>
        <h1 className="home-section-header">My Tokens</h1>
            <TransferHOC>
              <MyTokenCards abbrs={["DOT", "BTC", "ETH", "DAO", "USDT"]} />
            </TransferHOC>
            <h1 className="home-section-header">Top Liquidity Pairs</h1>
            <Farm />
        </Route>
      </Switch>
    </main>

}

export default React.memo(VaultApp);
