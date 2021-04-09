// Copyright 2017-2021 @polkadot/react-hooks authors & contributors
// and @canvas-ui/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

export { default as CryptoCard } from "./CryptoCard";
export { default as CryptoCards } from "./CryptoCard/CryptoCards";
export { default as StockCard } from "./StockCard";
export { default as StockCards } from "./StockCard/StockCards";

export { default as MyTokenCards } from "./CryptoCard/MyTokenCards";
export { default as Swap } from "./Swap";
export { default as Collateralize } from "./Collateralize";

export { default as Farm } from "./Farm";
export { default as Scroller } from "./Scroller";
export { default as News } from "./News";
export { default as UserContextHOC } from "./UserContextHOC";
export { default as TransferHOC } from "./TransferHOC";
export { default as ThemeChanger } from "./ThemeChanger";

// hooks
export { default as useCoinData } from "./CryptoCard/useCoinData";
export { default as useInjectedAccounts } from "./hooks/useInjectedAccounts";
export {
  default as useCurrentUser,
  useCurrentUserContext,
  CurrentUserContext,
} from "./hooks/useCurrentUser";
export {
  default as useTransaction,
  useTransactionContext,
  TransactionContext,
} from "./hooks/useTransaction";
export { default as useAccount } from "./hooks/useAccount";
export { useSocketIO } from "./hooks/useSocketIO";
export { default as useStorage } from "./hooks/useStorage";
export { default as useAccountInfo } from "./hooks/useAccountInfo";

// functions
export { default as inputToBn, isValidNumber } from "./inputToBn";
export { formatPrice, formatTokenDecimals, padTokenInput } from "./utils";
