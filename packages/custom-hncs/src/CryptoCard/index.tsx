import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import CryptoCard from "./CryptoCard";
import useCoinData from "./useCoinData";

interface Props extends BareProps {
  abbr: string;
}

function CryptoCardWrapper({
  className,
  abbr = "",
}: Props): React.ReactElement<Props> {
  const data = useCoinData([abbr]);

  return (
    <div className={`${className} crypto-card--Wrapper`}>
      <CryptoCard
        {...(data === null
          ? { loading: true }
          : {
              abbr: data[abbr].abbr,
              image: data[abbr].image,
              value: data[abbr].value,
              priceChange: data[abbr]["1d"],
              prices: data[abbr].sparkline.prices,
            })}
      />
    </div>
  );
}

export default React.memo(styled(CryptoCardWrapper)``);
