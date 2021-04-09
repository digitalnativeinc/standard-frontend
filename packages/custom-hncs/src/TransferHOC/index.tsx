import React from "react";
import styled from "styled-components";
import { BareProps as Props } from "@polkadot/react-components/types";
import { useToggle } from "@polkadot/react-hooks";
import { TransactionContext } from "../hooks/useTransaction";
import useCurrentUser from "../hooks/useCurrentUser";
import TransferModal from "./TransferModal";

function TransferHOC({
  className,
  children,
}: Props): React.ReactElement<Props> {
  const { currentAddress, isApiReady } = useCurrentUser();
  const [isTransferOpen, toggleTransfer] = useToggle();

  return (
    <TransactionContext.Provider value={{ toggleTransfer }}>
      {children}
      {isTransferOpen && (
        <TransferModal
          key="modal-transfer"
          senderId={currentAddress}
          onClose={toggleTransfer}
        />
      )}
    </TransactionContext.Provider>
  );
}

export default React.memo(styled(TransferHOC)``);
