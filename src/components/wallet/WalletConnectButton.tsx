import { FunctionComponent, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useMetamask } from "../../hooks/useMetamask";
import { STATUS } from "../../model/wallet";

const WalletConnectButton: FunctionComponent = () => {
  const { status, connect, disconnect } = useMetamask();

  const walletButtonText = useMemo(() => {
    switch (status) {
      case STATUS.CONNECTED:
        return "지갑 연결끊기";
      case STATUS.DISCONNECTED:
        return "지갑 연결하기";
      case STATUS.NOT_INSTALL:
        return "지갑 설치하기";
      default:
        return "지갑 연결 끊기";
    }
  }, [status]);

  const onClickButton = useCallback(() => {
    switch (status) {
      case STATUS.CONNECTED: {
        disconnect();
        break;
      }
      case STATUS.DISCONNECTED: {
        connect();
        break;
      }
      case STATUS.NOT_INSTALL: {
        break;
      }
      default: {
        connect();
      }
    }
  }, [status]);

  return <Button onClick={onClickButton}>{walletButtonText}</Button>;
};

const Button = styled.button`
  width: 200px;
  height: 50px;
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
`;

export default WalletConnectButton;
