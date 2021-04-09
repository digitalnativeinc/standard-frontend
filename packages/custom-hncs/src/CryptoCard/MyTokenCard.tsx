import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import CryptoCardPlaceholder from "./CryptoCardPlaceholder";
import { useTransactionContext } from "../hooks/useTransaction";
import { formatPrice } from "../utils/formats";

interface Props extends BareProps {
  abbr: string;
  image: string;
  value: string;
  loading: boolean;
  name: string;
  amt: string;
}

function MyTokenCard({
  className,
  name = "",
  value = "0.0",
  image = "",
  abbr = "",
  loading = false,
  amt = "",
}: Props): React.ReactElement<Props> {
  const transactionContext = useTransactionContext();

  return (
    <div className={`${className} crypto-card--Wrapper`}>
      {loading ? (
        <CryptoCardPlaceholder />
      ) : (
        <>
          <div className="crypto-image-container">
            <div className="crypto-image-bg" />
            <div className="crypto-image-bg2" />
            <div
              className="crypto-image"
              style={{ background: `url(${image})` }}
            />
          </div>
          <h1 className="crypto-name">
            {name} - {abbr}
          </h1>
          <div className="crypto-amt">{amt}</div>
          <div className="crypto-value">{`= ${formatPrice(value)}`}</div>
          <button
            className="highlight-btn"
            onClick={() => {
              transactionContext.toggleTransfer();
            }}
          >
            Transfer
          </button>
        </>
      )}
    </div>
  );
}

export default React.memo(styled(MyTokenCard)`
  min-height: 256px;
  padding: 24px;
  min-width: 248px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.glassmorphismCard}

  .crypto-price-info {
    text-align: center;
  }

  .crypto-amt {
    color: ${(props) => props.theme.text};
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    margin: 0;
    margin-top: 12px;
  }

  .crypto-name {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.01em;
    color: ${(props) => props.theme.textlight};
  }

  .crypto-value {
    font-size: 16px;
    line-height: 35px;
    letter-spacing: 0.01em;
    color: ${(props) => props.theme.textlight};
    margin-bottom: 12px;
  }

  .crypto-image-container {
    position: relative;
  }

  .crypto-image-bg {
    width: 70px;
    height: 70px;
    background: #ffffff;
    transform: matrix(0.99, -0.05, -0.16, 1, 0, 0);
    border-radius: 50%;
  }

  .crypto-image-bg2 {
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

  .crypto-image {
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

  .crypto-card-container {
    min-height: 256px;
    padding: 24px;
    min-width: 248px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .crypto-info-header {
    color: ${(props) => props.theme.textlight};
  }

  .crypto-info-text {
    color: ${(props) => props.theme.textlight};
    margin-bottom: 6px;
  }

  .crypto-name-container {
    display: flex;

    img {
      width: 25px;
      height: 25px;
    }

    h1 {
      margin: 0;
    }
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
