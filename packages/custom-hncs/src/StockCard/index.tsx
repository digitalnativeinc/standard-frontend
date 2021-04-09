import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import StockCard from "./StockCard";
import useStockData from "./useStockData";

interface Props extends BareProps {
  symbol: string;
}

function StockCardWrapper({
  className,
  symbol = "",
}: Props): React.ReactElement<Props> {
  const data = useStockData([symbol]);

  return (
    <div className={`${className} stock-card--Wrapper`}>
      <StockCard
        {...(data === null
          ? { loading: true }
          : {
              symbol: data[symbol].symbol,
              price: data[symbol].price,
              priceChange: data[symbol]["1d"],
              prices: data[symbol].sparkline.prices,
            })}
      />
    </div>
  );
}

export default React.memo(styled(StockCardWrapper)``);
