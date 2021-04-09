// Copyright 2017-2021 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@stnd/app-home';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'home',
    icon: 'home',
    name: 'home',
    text: t('nav.home', 'Home', { ns: 'apps-routing' }),
  };
}
