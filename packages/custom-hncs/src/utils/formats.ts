export const formatPrice = (val: string, cutoff: number = 3) => {
  const _val = val.split(".");
  if (_val[0].startsWith("-")) {
    _val[0] = `-$${_val[0].substring(1)}`;

    return _val[0] + (_val[1] !== undefined ? `.${_val[1].substr(0, cutoff !== -1 ? cutoff : undefined)}` : "");
  }
  return "$" + _val[0] + (_val[1] !== undefined ? `.${_val[1].substr(0, cutoff !== -1 ? cutoff : undefined)}` : "");
};

export const formatTokenDecimals = (val: string, decimals: number = 0) => {
  if (val === "0" || decimals === 0) return val;
  const left = val.substr(0, val.length - decimals);
  const right = val.substr(val.length - decimals).replace(/0+$/, "");
  return `${left}${right ? `.${right}` : ""}`;
};

export const cutoffDecimals = (val: string, decimals: number = 6) => {
  const decIndex = val.indexOf(".");
  if (decIndex === -1) return val;
  return val.substr(0, decIndex + 7);
};

export const padTokenInput = (val: string, decimals: number = 0) => {
  if (decimals === 0) return val;
  let valSplit = val.split(".");
  // if right of decimal does exist, zero pad the bignumber.
  if (valSplit[1] !== undefined) {
    // why + 1? for join('0') calling new Array(2),join('0') will give one 0
    const zeroPads = decimals - valSplit[1].length + 1;
    if (zeroPads > 0) {
      valSplit[1] += new Array(zeroPads).join("0");
    } else {
      valSplit[1] = valSplit[1].substr(0, decimals);
    }
  } else {
    valSplit[1] = new Array(decimals + 1).join("0");
  }

  return valSplit.join("");
};

export const precisionRoundMod = (number: number, precision: number) => {
  var factor = Math.pow(10, precision);
  var n = precision < 0 ? number : 0.01 / factor + number;
  return Math.round(n * factor) / factor;
};
