import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import useCoinData from "./useCoinData";
import CryptoCard from "./CryptoCard";

interface Props extends BareProps {
  abbrs: Array<string>;
}

function CryptoCards({ className, abbrs }: Props): React.ReactElement<Props> {
  const data = useCoinData();

  const renderCards = () => {
    return abbrs.map((abbr) => {
      return (
        <CryptoCard
          key={abbr}
          {...(data === null
            ? { loading: true }
            : {
                name: data[abbr].name,
                abbr: data[abbr].abbr,
                image: data[abbr].image,
                value: data[abbr].value,
                priceChange: data[abbr]["1d"],
                prices: data[abbr].sparkline.prices,
              })}
        />
      );
    });
  };

  return (
    <div className={`${className} crypto-cards--Wrapper`}>{renderCards()}</div>
  );
}

export default React.memo(styled(CryptoCards)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  .crypto-card--Wrapper {
    margin-right: 32px;
  }
`);
