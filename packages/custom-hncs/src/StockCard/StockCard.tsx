import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import { Sparklines, SparklinesLine } from "react-sparklines";
import StockCardPlaceholder from "./StockCardPlaceholder";
import { formatPrice } from "../utils";

interface Props extends BareProps {
  symbol: string;
  price: number;
  loading: boolean;
  priceChange: number;
  prices: Array<number>;
}

function StockCard({
  className,
  symbol = "",
  price = 0,
  loading = false,
  priceChange = 0,
  prices = [],
}: Props): React.ReactElement<Props> {
  // useMemo
  const renderPriceChange = () => {
    return (
      <div
        className={`stock-change
          ${
            priceChange > 0
              ? "stock-change-up"
              : priceChange == 0
              ? "stock-change-normal"
              : "stock-change-down"
          }`}
      >
        {formatPrice(String(priceChange), 5)}
      </div>
    );
  };

  const renderPriceChart = () => {
    return (
      <div className="stock-chart">
        <Sparklines data={prices.length > 0 ? prices : [0, 0, 0, 0, 0]}>
          <SparklinesLine
            color={
              priceChange > 0
                ? "#6FCF97"
                : priceChange == 0
                ? "#bab8c0"
                : "#EB5757"
            }
          />
        </Sparklines>
      </div>
    );
  };

  return (
    <div className={`${className} stock-card--Wrapper`}>
      {loading ? (
        <StockCardPlaceholder />
      ) : (
        <>
          <h1 className="stock-name">{symbol}</h1>
          <div className="stock-price">{formatPrice(String(price))}</div>
          <div className="stock-price-info">
            {renderPriceChange()}
            {renderPriceChart()}
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(styled(StockCard)`
  min-height: 256px;
  padding: 24px;
  min-width: 248px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.glassmorphismCard}

  .stock-price-info {
    text-align: center;
  }

  .stock-chart {
    width: 100px;
    height: 20px;
    margin-top: 16px;
  }

  .stock-name {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.01em;
    color: ${(props) => props.theme.textlight};
  }

  .stock-price {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    letter-spacing: 0.01em;
    color: ${(props) => props.theme.text};
    margin: 12px 0;
  }

  .stock-image-container {
    position: relative;
  }

  .stock-image-bg {
    width: 70px;
    height: 70px;
    background: #ffffff;
    transform: matrix(0.99, -0.05, -0.16, 1, 0, 0);
    border-radius: 50%;
  }

  .stock-image-bg2 {
    position: absolute;
    width: 76.6px;
    height: 75.77px;
    top: 0.58px;
    left: 2.56px;
    z-index: -1;
    background: linear-gradient(
      195.55deg,
      #8c8c8c 7.56%,
      #8c8c8c 26.23%,
      #ffffff 44.94%,
      #8c8c8c 61.77%,
      #929292 91.54%
    );
    transform: matrix(1, -0.1, 0, 0.99, 0, 0);
    border-radius: 50%;
    filter: drop-shadow(5px 12px 24px rgba(255, 255, 255, 0.25));
  }

  .stock-image {
    position: absolute;
    width: 70px;
    height: 70px;
    background-repeat: no-repeat !important;
    transform: matrix(0.99, -0.05, -0.16, 1, 0, 0);
    border-radius: 50%;
    background-size: contain !important;
    background-position: center !important;
    top: 0;
    left: 0;
  }

  .stock-card-container {
    min-height: 256px;
    padding: 24px;
    min-width: 248px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .stock-info-header {
    color: ${(props) => props.theme.textlight};
  }

  .stock-info-text {
    color: ${(props) => props.theme.textlight};
    margin-bottom: 6px;
  }

  .stock-name-container {
    display: flex;

    img {
      width: 25px;
      height: 25px;
    }

    h1 {
      margin: 0;
    }
  }

  .stock-change-up {
    color: ${(props) => props.theme.green} !important;
  }

  .stock-change {
    color: ${(props) => props.theme.text};
  }

  .stock-change-down {
    color: ${(props) => props.theme.red} !important;
  }

  .ui.loader {
    display: block;
  }

  .ui.loader:before {
    // border: ${(props) => props.theme.backgroundlight};
  }

  .ui.loader:after{
    border-color ${(props) => props.theme.highlight} transparent transparent;
  }
`);
