import { useEffect, useState } from "react";
import { STATUS } from "../model/wallet";

export const useMetamask = () => {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState();
  const [network, setNetwork] = useState<string | null>();
  const [status, setStatus] = useState<STATUS>(STATUS.DISCONNECTED);

  const connect = async () => {
    if (typeof window.ethereum === "undefined") {
      setStatus(STATUS.NOT_INSTALL);
      return;
    }

    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    setAccount((accounts as string[])?.[0]);
    setStatus(STATUS.CONNECTED);
    setNetwork(window.ethereum.networkVersion);
  };

  const disconnect = () => {
    setAccount("");
    setNetwork(undefined);
    setStatus(STATUS.DISCONNECTED);
  };

  const fetchBalance = async () => {};
  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    connect();
    window.ethereum?.on("chainChanged", (network: unknown) => {
      console.log("network", network);
      setNetwork(network as string);
    });
    window.ethereum?.on("accountsChanged", (account: unknown) => {
      setAccount(account as string);
    });
  }, []);

  return {
    account,
    balance,
    network,
    status,
    connect,
    disconnect,
  };
};
