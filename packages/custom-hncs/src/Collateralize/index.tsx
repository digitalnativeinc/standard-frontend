import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import DropdownInput from "../BalanceInput/DropdownInput";
import LiqRatioInput from "../BalanceInput/LiqRatioInput";

import useCollateralize from "./useCollateralize";
import { useApi } from "@polkadot/react-hooks";

interface Props extends BareProps {
  abbr: string;
}

function Collateralize({
  className,
  abbr = "",
}: Props): React.ReactElement<Props> {
  const [
    input1,
    onInput1Change,
    input2,
    onInput2Change,
    setInput1Tok,
    setInput2Tok,
    liqRatio,
    setLiqRatio,
    USER_OPTIONS,
    AVAILABLE_OPTIONS,
    decimals,
  ] = useCollateralize();
  const api = useApi().api;

  return (
    <div className={`${className} clltrlz--Wrapper`}>
      <div className="clltrlz-section">
        <div className="clltrlz-section-headers ">
          <div className="clltrlz-section-header">Collateralize</div>{" "}
          <div className="clltrlz-section-sub">Balance $00.00</div>
        </div>
        <DropdownInput
          options={USER_OPTIONS}
          def={0}
          onValueChange={onInput1Change}
          onDrodpdownChange={setInput1Tok}
          values={input1}
          decimals={decimals}
        />
      </div>
      <div className="clltrlz-section">
        <div className="clltrlz-section-header clltrlz-section-header2">
          Receive
        </div>
        <DropdownInput
          options={AVAILABLE_OPTIONS}
          def={0}
          onValueChange={onInput2Change}
          onDrodpdownChange={setInput2Tok}
          values={input2}
          decimals={decimals}
        />
        {/* <UnitInput unit={"MTR"} onValueChange={onInput2Change} values={input2} max={600} /> */}
      </div>
      <div className="clltrlz-section">
        <div className="clltrlz-section-header clltrlz-section-header2">
          Collateralization Ratio
        </div>
        <LiqRatioInput def={liqRatio * 100} onLiqRatioChange={setLiqRatio} />
      </div>
      <br />
      <button className="highlight-btn">Collateralize</button>
    </div>
  );
}

export default React.memo(styled(Collateralize)`
  max-width: 500px;
  background: #fff;
  display: inline-block;
  padding: 24px;
  ${(props) => props.theme.glassmorphismCard}
  background: ${(props) => props.theme.backgroundcard2};

  .balance-input--Wrapper {
    input {
    }
  }

  .clltrlz-section {
    display: flex;
    flex-direction: column;
  }

  .clltrlz-section-headers {
    display: flex;
    margin-bottom: 12px;
  }

  .clltrlz-section-header {
    font-size: 16px;
    line-height: 16px;
    color: ${(props) => props.theme.text};
    flex: 1 1 0;
  }

  .clltrlz-section-header2 {
    margin-top: 32px;
    margin-bottom: 12px;
  }

  .clltrlz-section-sub {
    color: ${(props) => props.theme.text};
    font-size: 14px;
    line-height: 16px;
  }
`);
