import { useState, useMemo, useEffect } from "react";
import { Values, INITIAL_STATE } from "../BalanceInput";
import { useApi } from "@polkadot/react-hooks";
import { precisionRoundMod } from "../utils";

const USER_ASSETS = [
  {
    key: "BTC",
    text: "BTC",
    value: "BTC",
    price: 10000,
    image: {
      avatar: true,
      src:
        "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
    },
    max: 4000000000000,
  },
  {
    key: "DOT",
    text: "DOT",
    value: "DOT",
    price: 3333,
    image: {
      avatar: true,
      src:
        "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
    },
    max: 4000000000000,
  },
];

const AVAILABLE_ASSETS = [
  {
    key: "BTC",
    text: "BTC",
    value: "BTC",
    price: 10000,
    image: {
      avatar: true,
      src:
        "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
    },
    max: 4000000000000,
  },
  {
    key: "DOT",
    text: "DOT",
    value: "DOT",
    price: 3333,
    image: {
      avatar: true,
      src:
        "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
    },
    max: 4000000000000,
  },
  {
    key: "ETH",
    text: "ETH",
    value: "ETH",
    price: 500,
    image: {
      avatar: true,
      src:
        "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg",
    },
    max: 4000000000000,
  },
];

function useSwap(decimals: number = 6): Array<any> {
  const [input1, setInput1] = useState(INITIAL_STATE);
  const [input1Tok, setInput1Tok] = useState(0);
  const [input2, setInput2] = useState(INITIAL_STATE);
  const [input2Tok, setInput2Tok] = useState(0);

  const ratio = useMemo(() => {
    return USER_ASSETS[input1Tok].price / AVAILABLE_ASSETS[input2Tok].price;
  }, [input1Tok, input2Tok]);

  useEffect(() => {
    calcAndSetOtherInput(input2.floatValue, false);
  }, [input1Tok]);

  useEffect(() => {
    calcAndSetOtherInput(input1.floatValue);
  }, [input2Tok]);

  const calcAndSetOtherInput = (floatValue: number, i2: boolean = true) => {
    const fv = precisionRoundMod(
      i2 ? floatValue * ratio : floatValue / ratio,
      decimals
    );
    const str = String(fv);
    const validity =
      fv <= (i2 ? AVAILABLE_ASSETS[input2Tok].max : USER_ASSETS[input1Tok].max);
    i2
      ? setInput2({ value: str, floatValue: fv, validity })
      : setInput1({ value: str, floatValue: fv, validity });
  };

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
    USER_ASSETS,
    AVAILABLE_ASSETS,
    decimals,
  ];
}

export default useSwap;
