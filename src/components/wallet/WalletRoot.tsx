import { ReactNode, useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useMetamask } from "../../hooks/useMetamask";
import { accountState } from "../../stores/wallet";

type WalletRootProps = {
  children: ReactNode;
};

export const WalletRoot = ({ children }: WalletRootProps) => {
  const setAccount = useSetRecoilState(accountState);
  const { connect, setNetwork } = useMetamask();

  const setEvents = useCallback(() => {
    window.ethereum?.addListener("chainChanged", (network: unknown) => {
      setNetwork(network as string);
    });
    window.ethereum?.addListener("accountsChanged", (accounts: unknown) => {
      setAccount((accounts as string[])[0] as string);
    });
  }, []);

  const clearEvents = useCallback(() => {
    window.ethereum?.removeListener("chainChanged", (network: unknown) => {
      setNetwork(network as string);
    });
    window.ethereum?.removeListener("accountsChanged", (accounts: unknown) => {
      setAccount((accounts as string[])[0] as string);
    });
  }, []);

  useEffect(() => {
    connect();
    setEvents();

    return () => {
      clearEvents();
    };
  }, []);

  return <>{children}</>;
};
