import BN from "bn.js";
import { BN_ZERO } from "@polkadot/util";

export function isValidNumber(bn: BN, isZeroable: boolean, maxValue?: BN): boolean {
  if (
    // cannot be negative
    bn.lt(BN_ZERO) ||
    // check if 0 and it should be a value
    (!isZeroable && bn.isZero()) ||
    // cannot be > max (if specified)
    (maxValue && maxValue.gtn(0) && bn.gt(maxValue))
  ) {
    return false;
  }

  return true;
}

export default function inputToBn(input: string, isZeroable: boolean, maxValue?: BN): BN {
  return new BN(input.replace(/[^\d]/g, ""));
}
