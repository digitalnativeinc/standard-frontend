import { useEffect, useMemo, useState } from "react";
import { Values, INITIAL_STATE } from "../BalanceInput";
import { precisionRoundMod, cutoffDecimals } from "../utils";
import { Decimal } from "decimal.js";

const USER_ASSETS = [
  {
    key: "BTC",
    text: "BTC",
    value: "BTC",
    price: 10000.03,
    image: { avatar: true, src: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" },
    max: 4000000000000
  },
  {
    key: "DOT",
    text: "DOT",
    value: "DOT",
    price: 3333.33,
    image: { avatar: true, src: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" },
    max: 4000000000000
  }
];

const AVAILABLE_ASSETS = [
  {
    key: "BTC",
    text: "BTC",
    value: "BTC",
    price: 10000.03,
    image: { avatar: true, src: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" },
    max: 4000000000000
  },
  {
    key: "DOT",
    text: "DOT",
    value: "DOT",
    price: 3333.33,
    image: { avatar: true, src: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" },
    max: 4000000000000
  },
  {
    key: "ETH",
    text: "ETH",
    value: "ETH",
    price: 500,
    image: { avatar: true, src: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg" },
    max: 4000000000000
  }
];

function useCollateralize(decimals: number = 6): Array<any> {
  const [input1, setInput1] = useState(INITIAL_STATE);
  const [input1Tok, setInput1Tok] = useState(0);
  const [input2, setInput2] = useState(INITIAL_STATE);
  const [input2Tok, setInput2Tok] = useState(0);
  const [liqRatio, setLiqRatio] = useState(1.5);

  const ratio = useMemo(() => {
    return precisionRoundMod(USER_ASSETS[input1Tok].price / AVAILABLE_ASSETS[input2Tok].price, 10);
  }, [input1Tok, input2Tok]);

  // changing i2?
  const calcAndSetOtherInput = (floatValue: number, i2: boolean = true) => {
    let dv = new Decimal(floatValue);
    dv = i2 && liqRatio ? dv.mul(ratio).div(liqRatio) : dv.div(ratio).mul(liqRatio);
    const str = cutoffDecimals(dv.toString(), decimals);

    const validity = dv.toNumber() <= (i2 ? AVAILABLE_ASSETS[input2Tok].max : USER_ASSETS[input1Tok].max);
    console.log(validity);
    i2
      ? setInput2({ value: str, floatValue: dv.toNumber(), validity })
      : setInput1({ value: str, floatValue: dv.toNumber(), validity });
  };

  useEffect(() => {
    calcAndSetOtherInput(input1.floatValue);
  }, [input1Tok]);

  useEffect(() => {
    calcAndSetOtherInput(input1.floatValue);
  }, [input2Tok]);

  useEffect(() => {
    console.log(liqRatio);
    calcAndSetOtherInput(input1.floatValue);
  }, [liqRatio]);

  const onInput1Change = (values: Values) => {
    setInput1({ ...input1, ...values });
    calcAndSetOtherInput(values.floatValue);
  };

  const onInput2Change = (values: Values) => {
    setInput2({ ...input2, ...values });
    calcAndSetOtherInput(values.floatValue, false);
  };

  return [
    input1,
    onInput1Change,
    input2,
    onInput2Change,
    setInput1Tok,
    setInput2Tok,
    liqRatio,
    setLiqRatio,
    USER_ASSETS,
    AVAILABLE_ASSETS,
    decimals
  ];
}

export default useCollateralize;
