import { useState } from "react";
import TokenDropdown from "./components/TokenDropdown";
import { TOKENS } from "./data/tokens";
import { TOKEN } from "./model/token";
import styled from "styled-components";
import { usePopup } from "./hooks/usePopup";
import PopupA from "./components/popup/PopupA";

function App() {
  const [selectedToken, setSelectedToken] = useState<TOKEN>();

  const { popups, openPopup, closePopup } = usePopup();

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
        <OpenModalButton
          onClick={() => {
            openPopup(<PopupA />);
          }}
        >
          Open Modal A
        </OpenModalButton>

        {popups.length > 0 && <ModalOverlay onClick={closePopup} />}
        {popups.map((popup, index) => (
          <div key={index}>{popup}</div>
        ))}
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

const OpenModalButton = styled.button`
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
