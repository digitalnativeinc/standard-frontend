import { io } from "socket.io-client";
// import { useConfig } from "@polkadot/apps/config";

export function useSocketIO(namespace: string) {
  // const config = useConfig();
  return io(`${"http://localhost:5000"}/${namespace}`);
}
