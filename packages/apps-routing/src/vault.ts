// Copyright 2017-2021 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@stnd/app-vault';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'vault',
    icon: 'home',
    name: 'vault',
    text: t('nav.vault', 'Vault', { ns: 'apps-routing' }),
  };
}
