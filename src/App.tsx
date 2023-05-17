import { useCallback, useMemo, useState } from "react";
import TokenDropdown from "./components/dropdown/TokenDropdown";
import { TOKENS } from "./data/tokens";
import { TOKEN } from "./model/token";
import styled from "styled-components";
import { usePopup } from "./hooks/usePopup";
import PopupA from "./components/popup/PopupA";
import { useMetamask } from "./hooks/useMetamask";
import { STATUS } from "./model/wallet";
import { formatEther } from "./utils/formatEther";

function App() {
  const [selectedToken, setSelectedToken] = useState<TOKEN>();
  const { popups, openPopup, closePopup } = usePopup();
  const { account, balance, network, status, connect, disconnect } =
    useMetamask();
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

  return (
    <div className='App'>
      <Container>
        <Title>1. 드랍다운</Title>
        <HStack height={40}>
          선택된 토큰:
          {selectedToken && (
            <>
              <TokenImage src={selectedToken.token_image} />
              <p>
                {selectedToken.token_name} (${selectedToken.token_price})
              </p>
            </>
          )}
        </HStack>
        <TokenDropdown
          tokens={TOKENS}
          onSelect={(index: number) => {
            setSelectedToken(TOKENS[index]);
          }}
        />
      </Container>

      <Container>
        <Title>2. 모달</Title>
        <Button
          onClick={() => {
            openPopup(<PopupA />);
          }}
        >
          Open Modal A
        </Button>

        {popups.length > 0 && <ModalOverlay onClick={closePopup} />}
        {popups.map((popup, index) => (
          <div key={index}>{popup}</div>
        ))}
      </Container>

      <Container>
        <Title>3. 지갑연결</Title>
        <Button onClick={onClickButton}>{walletButtonText}</Button>
        <VStack height={40}>
          <p>계정: {account}</p>
          <p>네트워크: {network}</p>
          <p>이더리움 잔고: {formatEther(balance)}</p>
        </VStack>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const HStack = styled.div<{ height: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${({ height }) => height}px;
`;

const VStack = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: ${({ height }) => height}px;
`;

const Title = styled.span`
  font-size: 20px;
  color: black;
  font-weight: bold;
  margin-bottom: 15px;
`;

const TokenImage = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 50%;
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default App;
