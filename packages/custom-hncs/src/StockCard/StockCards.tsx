import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import useStockData from "./useStockData";
import StockCard from "./StockCard";

interface Props extends BareProps {
  symbols: Array<string>;
}

function StockCards({ className, symbols }: Props): React.ReactElement<Props> {
  const data = useStockData();

  const renderCards = () => {
    return symbols.map((symbol) => {
      return (
        <StockCard
          key={symbol}
          {...(data === null
            ? { loading: true }
            : {
                symbol: data[symbol].symbol,
                price: data[symbol].price,
                priceChange: data[symbol]["1d"],
                prices: data[symbol].sparkline.prices,
              })}
        />
      );
    });
  };

  return (
    <div className={`${className} stock-cards--Wrapper`}>{renderCards()}</div>
  );
}

export default React.memo(styled(StockCards)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  .stock-card--Wrapper {
    margin-right: 32px;
  }
`);
