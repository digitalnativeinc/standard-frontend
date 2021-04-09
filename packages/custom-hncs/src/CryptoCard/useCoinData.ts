import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSocketIO } from "../hooks/useSocketIO";
// import { useConfig } from "@polkadot/apps/config";

function useCoinData(abbrs?: Array<string>): any | null {
  const [data, setData] = useState(null);
  const io = useSocketIO("coindata");
  // const config = useConfig();

  const ioListener = useCallback(() => {
    io.on("update", (coins: any) => {
      const _coins = coins.reduce((result: any, coin: any) => {
        result[coin.abbr] = coin;
        return result;
      }, {});
      setData(_coins);
    });
  }, [io]);

  const getData = () => {
    axios
      .get(
        `${"http://localhost:5000/v1"}/coindata?${abbrs ? abbrs.join(",") : ""}`
      )
      .then((res: any) => {
        const { data } = res;
        const _coins = data.reduce((result: any, coin: any) => {
          coin.sparkline.prices = coin.sparkline.prices.map((price: string) =>
            parseFloat(price)
          );
          result[coin.abbr] = coin;
          return result;
        }, {});
        setData(_coins);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    ioListener();
    return () => {
      io.disconnect();
    };
  }, [io]);

  return data;
}

// function getCoinData():{
//   return
// }

export default useCoinData;
