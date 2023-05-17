import { BigNumber } from "ethers";
import { atom } from "recoil";
import { ZERO_ETH } from "../constants/bigNum";
import { STATUS } from "../model/wallet";

export const accountState = atom<string>({
  key: "accountState",
  default: "",
});

export const balancetState = atom<BigNumber | undefined>({
  key: "balancetState",
  default: ZERO_ETH,
});

export const networktState = atom<number | null | undefined>({
  key: "networktState",
  default: 0,
});

export const statustState = atom<STATUS>({
  key: "statustState",
  default: STATUS.DISCONNECTED,
});
