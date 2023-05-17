import { BigNumber, ethers } from "ethers";

export const formatEther = (ether?: BigNumber) => {
  if (!ether) return "";
  return ethers.utils.formatEther(ether);
};
