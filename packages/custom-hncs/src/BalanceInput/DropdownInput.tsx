import React, { useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@polkadot/react-components/types";
import BalanceInput, { Values } from "./index";
import DropDown from "../DropDown";

interface DropdownInputProps extends Props {
  onValueChange?: Function;
  onDrodpdownChange?: Function;
  options: Array<any>;
  def: number;
  values: Values;
  decimals: number;
}

function DropdownInput({
  className = "",
  onValueChange,
  onDrodpdownChange,
  options,
  values,
  decimals,
  def = 0,
}: DropdownInputProps): React.ReactElement<DropdownInputProps> {
  const [sel, setSel] = useState(def);

  const _onDropDownChange = (_sel: number) => {
    setSel(_sel);
    onDrodpdownChange && onDrodpdownChange(_sel);
  };

  const onMaxClick = () => {
    onValueChange &&
      onValueChange({
        value: options[sel].max.toString(),
        floatValue: options[sel].max,
        validity: true,
      });
  };

  return (
    <div
      className={`${className} dropwdown-input--Wrapper ${
        !values.validity ? "error-border" : ""
      }`}
    >
      <BalanceInput
        onValueChange={onValueChange}
        values={values}
        decimals={decimals}
        max={options[sel].max}
      />
      <button className="dropdown-input-max" onClick={onMaxClick}>
        MAX
      </button>
      <DropDown menu={options} def={def} onChange={_onDropDownChange} />
    </div>
  );
}

export default React.memo(styled(DropdownInput)`
  width: 100%;
  min-height: 66px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-end;
  border-radius: 12px;
  background: ${(props) => props.theme.backgroundlight} !important;
  color: ${(props) => props.theme.color};
  border: 1px solid transparent;
  padding: 0 16px;

  .dropdown-input-max {
    color: ${(props) => props.theme.textlight};
    border: 0;
    background: transparent;
    outline: none;
    cursor: pointer;
    margin-right: 8px;
  }

  .balance-input--Wrapper {
    flex: 1 1 0;
    input {
      border: 0;
      font-size: 16px;
      background: transparent;
      padding-left: 16px;
      color: ${(props) => props.theme.text};
    }
  }

  .ui.button.dropdown {
    background: ${(props) => props.theme.backgroundlight} !important;
    border-radius: 12px !important;
    border: 1px solid ${(props) => props.theme.highlight} !important;
    color: ${(props) => props.theme.text};

    &:hover {
      color: ${(props) => props.theme.text};
    }
  }

  .ui.primary.buttons .active.button {
    background: ${(props) => props.theme.backgroundlight} !important;
    border-radius: 12px !important;
    border: 1px solid ${(props) => props.theme.highlight} !important;
    color: ${(props) => props.theme.text} !important;
  }

  .ui.dropdown .menu > .item {
    color: ${(props) => props.theme.text};
    background: ${(props) => props.theme.backgroundlight} !important;

    &:hover {
      color: ${(props) => props.theme.text};
      background: ${(props) => props.theme.highlight} !important;
    }
  }

  .ui.selection.active.dropdown .menu {
    border-color: ${(props) => props.theme.textlight} !important;
  }

  .ui.primary.button:focus,
  .ui.primary.buttons .button:focus {
    color: ${(props) => props.theme.text};
  }
`);
