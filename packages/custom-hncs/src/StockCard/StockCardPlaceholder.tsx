import React from "react";
import styled from "styled-components";
import { TextBlock, RoundShape } from "react-placeholder/lib/placeholders";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

const CardPlaceholder = (
  <div className="sc-placeholder">
    <RoundShape className="sc-placeholder-shape" color="#6143bc" style={{ width: 70, height: 70 }} />
    <TextBlock className="sc-placeholder-shape" rows={2} color="#6143bc" style={{ width: 160, height: 25 }} />
    <TextBlock className="sc-placeholder-shape" rows={2} color="#6143bc" style={{ width: 160, height: 25 }} />
    <TextBlock className="sc-placeholder-shape" rows={2} color="#6143bc" style={{ width: 160, height: 25 }} />
  </div>
);

const CryptoCardPlaceholder = ({ className }: any) => {
  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      ready={false}
      customPlaceholder={CardPlaceholder}
      className={`${className}`}
    >
      <></>
    </ReactPlaceholder>
  );
};

export default React.memo(styled(CryptoCardPlaceholder)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .sc-placeholder-shape {
    margin-bottom: 20px;
  }
`);
