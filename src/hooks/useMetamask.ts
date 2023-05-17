import { useCallback, useEffect } from "react";
import { STATUS } from "../model/wallet";
import { Web3Provider } from "@ethersproject/providers";
import { useRecoilState } from "recoil";
import {
  accountState,
  balancetState,
  networktState,
  statustState,
} from "../stores/wallet";
import { MAIN_NET_ID } from "../constants/wallet";

export const useMetamask = () => {
  const [account, setAccount] = useRecoilState(accountState);
  const [balance, setBalance] = useRecoilState(balancetState);
  const [network, setGlobalNetwork] = useRecoilState(networktState);
  const [status, setStatus] = useRecoilState(statustState);

  const setNetwork = useCallback(
    (newNetwork: string | null | undefined) => {
      const newNetworkInNum =
        typeof newNetwork === "string" ? parseInt(newNetwork) : undefined;
      if (network !== newNetworkInNum && newNetworkInNum === MAIN_NET_ID) {
        alert("이더리움 메인넷에 연결되었습니다. ");
      }
      setGlobalNetwork(newNetworkInNum);
    },
    [status, network]
  );

  const connect = useCallback(async () => {
    if (status === STATUS.CONNECTED) return;
    if (
      typeof window.ethereum === "undefined" ||
      !window.ethereum?.isMetaMask
    ) {
      setStatus(STATUS.NOT_INSTALL);
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount((accounts as string[])?.[0]);
      setStatus(STATUS.CONNECTED);
      setNetwork(window.ethereum.networkVersion);
    } catch (err: any) {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    }
  }, [status]);

  const disconnect = useCallback(() => {
    setAccount("");
    setNetwork(undefined);
    setStatus(STATUS.DISCONNECTED);
    setBalance(undefined);
  }, []);

  const fetchBalance = useCallback(async () => {
    if (!account) return;

    const provider = new Web3Provider(window.ethereum as any);
    const balance = await provider.getBalance(account);
    setBalance(balance);
  }, [account, network]);

  useEffect(() => {
    fetchBalance();
  }, [account, network]);

  return {
    account: status === STATUS.CONNECTED && account,
    balance: status === STATUS.CONNECTED ? balance : undefined,
    network: status === STATUS.CONNECTED && network,
    status,
    connect,
    disconnect,
    setNetwork,
  };
};
