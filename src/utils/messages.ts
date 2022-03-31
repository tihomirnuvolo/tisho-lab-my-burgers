import {
  NuvoMessageOptsProp,
  NuvoMessageProvider,
} from "@nuvolo/nuux/types/services";

export const getMessage = (
  msg: NuvoMessageProvider,
  key: string,
  args?: NuvoMessageOptsProp | string[] | undefined
): string => {
  let value = "";
  try {
    value = msg.get(key, args as NuvoMessageOptsProp);
  } catch {
    value =
      key +
      (args && Object.keys(args as {}).length > 0
        ? ` ${Object.values(args as {}).join(" ")}`
        : "");
    console.warn(`Missing key ${key} in translations`);
  }

  return value;
};
