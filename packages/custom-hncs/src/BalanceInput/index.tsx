import React, { useState } from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { BareProps as Props } from "@polkadot/react-components/types";

export interface Values {
  value: string;
  floatValue: number;
  validity: Boolean;
}

interface BalanceProps extends Props {
  max?: number;
  decimals: number;
  onValueChange?: Function;
  values?: Values;
}

export const INITIAL_STATE: Values = {
  value: "",
  floatValue: 0,
  validity: true,
};

function BalanceInput({
  className = "",
  max,
  onValueChange,
  values,
  decimals,
}: BalanceProps): React.ReactElement<BalanceProps> {
  const [data, setData] = useState(INITIAL_STATE);
  const [focused, setFocused] = useState(false);

  return (
    <div className={`${className} balance-input--Wrapper`}>
      <NumberFormat
        thousandSeparator={true}
        allowEmptyFormatting={true}
        allowNegative={false}
        allowLeadingZeros={false}
        isNumericString={true}
        value={values ? values.value : data.value}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onValueChange={({ value, floatValue }) => {
          if (floatValue === undefined) floatValue = 0;
          const validity = max === undefined || floatValue <= max;

          if (!values) setData({ value, floatValue, validity });
          if (values && focused)
            onValueChange && onValueChange({ value, floatValue, validity });
        }}
      />
    </div>
  );
}

export default React.memo(styled(BalanceInput)`
  input {
    &:focus {
      color: #131523;
      outline: 0;
    }
    color: #131523;
  }
`);
