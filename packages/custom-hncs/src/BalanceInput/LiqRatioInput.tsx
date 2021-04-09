import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { BareProps as Props } from "@polkadot/react-components/types";
import NumberFormat from "react-number-format";
import { Values } from "./index";

import "react-circular-progressbar/dist/styles.css";

interface LiqRatioInputProps extends Props {
  onValueChange?: Function;
  unit: string;
  values: Values;
  decimals: number;
  max: number;
  min: number;
  def: number;
  onLiqRatioChange?: Function;
}

function LiqNumberFormat(props: any): React.ReactElement {
  const withValueLimit = (inputObj: any) => {
    const { value } = inputObj;
    if (value <= props.max && value >= 0) return inputObj;
  };

  return (
    <NumberFormat
      suffix={"%"}
      className={`${
        props.liqRatio < props.min ? "error-text" : "success-text"
      }`}
      decimalScale={2}
      isAllowed={withValueLimit}
      value={props.liqRatio}
      onValueChange={({ value, floatValue }) => {
        if (floatValue === undefined) floatValue = 0;
        if (floatValue && floatValue > props.max) {
          floatValue = props.max;
        }
        props.setLiqRatio(floatValue);
      }}
    />
  );
}

function LiqRatioInput({
  className = "",
  max = 400,
  min = 150,
  def,
  onLiqRatioChange,
}: LiqRatioInputProps): React.ReactElement<LiqRatioInputProps> {
  const [liqRatio, setLiqRatio] = useState(def);
  const fill = (liqRatio / max) * 100;
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    onLiqRatioChange && onLiqRatioChange(liqRatio / 100);
  }, [liqRatio]);

  return (
    <div
      className={`${className} liq-input--Wrapper`}
      onClick={(e) => {
        if (!e.target.className.baseVal.includes("cPLiq")) return;
        let rect = e.target.getBoundingClientRect();
        let rectCX = rect.x + rect.width / 2;
        let rectCY = rect.y + rect.height / 2;
        let x = e.clientX - rectCX; //x position within the element.
        let y = e.clientY - rectCY; //
        const degFromTan = (opp: number, adj: number) =>
          (Math.atan(opp / adj) * 180) / Math.PI;
        let ang;
        if (x < 0) {
          // 1st quad
          if (y < 0) {
            ang = 360 - degFromTan(Math.abs(x), Math.abs(y));
          }
          // 4th quad
          else {
            ang = 270 - degFromTan(Math.abs(y), Math.abs(x));
          }
        } else {
          // 2nd quad
          if (y < 0) {
            ang = 90 - degFromTan(Math.abs(y), Math.abs(x));
          }
          // 3rd quad
          else {
            ang = 180 - degFromTan(Math.abs(x), Math.abs(y));
          }
        }
        setLiqRatio((ang / 360) * 100 * 4);
      }}
    >
      <CircularProgressbarWithChildren
        value={37.5}
        strokeWidth={1}
        styles={buildStyles({
          backgroundColor: "transparent",
          trailColor: "transparent",
          pathColor: themeContext.highlight2,
        })}
      >
        <div style={{ width: "calc(90%)", position: "relative" }}>
          <CircularProgressbar
            value={fill}
            strokeWidth={6}
            styles={buildStyles({
              trailColor: themeContext.backgroundlight,
              pathColor: `${
                fill < 37.5 ? themeContext.red : themeContext.green
              }`,
            })}
            classes={{
              root: "CircularProgressbar cPLiq",
              trail: "CircularProgressbar-trail cPLiq",
              path: "CircularProgressbar-path cPLiq",
              text: "CircularProgressbar-text",
              background: "CircularProgressbar-background",
            }}
          />

          <div className="liq-ratio-cont">
            <LiqNumberFormat
              max={max}
              min={min}
              liqRatio={liqRatio}
              setLiqRatio={setLiqRatio}
            />
            <div className="min-ratio-cont">
              <div className="min-ratio-ind" />
              <p className="min-ratio">Min Ratio ({String(min)}%)</p>
            </div>
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default React.memo(styled(LiqRatioInput)`
  width: auto;
  min-height: 66px;
  color: ${(props) => props.theme.color};
  padding: 0 16px;

  .liq-ratio-cont {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
  }

  .min-ratio-cont {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .min-ratio-ind {
    width: 15px;
    height: 15px;
    background-color: ${(props) => props.theme.highlight2};
    margin-right: 10px;
    border-radius: 4px;
  }

  .min-ratio {
    font-size: 16px;
    color: ${(props) => props.theme.highlight2};
  }

  .cPLiq {
    cursor: pointer;
  }

  input {
    background: transparent;
    outline: 0;
    border: 0;
    font-size: 36px;
    width: 100%;
    text-align: center;
  }

  .unit-input-max {
    color: ${(props) => props.theme.textlight};
    border: 0;
    background: transparent;
    outline: none;
    cursor: pointer;
  }

  .unit-input-unit {
    color: ${(props) => props.theme.text};
    border: 0;
    background: transparent;
    outline: none;
    cursor: pointer;
    padding-left: 12px;
    padding-right: 16px;
  }

  .balance-input--Wrapper {
    flex: 1 1 0;
    input {
      border: 0;
      font-size: 16px;
      background: transparent;
      padding: 8px;
      padding-left: 16px;
      color: ${(props) => props.theme.text};
    }
  }
`);
