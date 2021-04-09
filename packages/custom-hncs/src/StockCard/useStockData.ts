import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSocketIO } from "../hooks/useSocketIO";
// import { useConfig } from "@polkadot/apps/config";

function useStockData(symbols?: Array<string>): any | null {
  const [data, setData] = useState(null);
  const io = useSocketIO("stockdata");
  // const config = useConfig();

  const ioListener = useCallback(() => {
    io.on("update", (stocks: any) => {
      const _stocks = stocks.reduce((result: any, stock: any) => {
        result[stock.symbol] = stock;
        return result;
      }, {});
      setData(_stocks);
    });
  }, [io]);

  const getData = () => {
    axios
      .get(
        `${"http://localhost:5000/v1"}/stockdata?${
          symbols ? symbols.join(",") : ""
        }`
      )
      .then((res: any) => {
        const { data } = res;
        const _stocks = data.reduce((result: any, stock: any) => {
          result[stock.symbol] = stock;
          return result;
        }, {});
        setData(_stocks);
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

// function getstockData():{
//   return
// }

export default useStockData;
