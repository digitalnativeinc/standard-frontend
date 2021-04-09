import React, { useState } from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";

interface Props extends BareProps {
  children: any;
}

function Button({ className, children }: Props): React.ReactElement<Props> {
  return (
    <button className={`${className} custom-button--Wrapper`}>
      {children}
    </button>
  );
}

export default React.memo(styled(Button)`
  padding: 8px;
  background: ${(props) => props.theme.highlight};
  color: ${(props) => props.theme.text};
  font-size: 16px;
  outline: 0;
  cursor: pointer;
`);
