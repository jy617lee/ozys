import { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import { TOKEN } from "../model/token";
import Dropdown from "./Dropdown";

interface TokenDropdownProps {
  tokens: TOKEN[];
  maxVisible?: number;
  onSelect: (index: number) => void;
}

const TokenDropdown: FunctionComponent<TokenDropdownProps> = ({
  tokens,
  maxVisible = 10,
  onSelect,
}) => {
  const menuButton = useMemo(() => <PlaceHolder>Select Token</PlaceHolder>, []);

  const menuList = useMemo(
    () =>
      tokens.map((tokenInfo) => (
        <TokenInfo
          url={tokenInfo.token_image}
          name={tokenInfo.token_name}
          price={tokenInfo.token_price}
        />
      )),
    [tokens]
  );

  return (
    <Dropdown
      menuButton={menuButton}
      menuList={menuList}
      maxVisible={maxVisible}
      onSelect={onSelect}
    />
  );
};

interface TokenInfoProps {
  url: string;
  name: string;
  price: number;
}

const TokenInfo: FunctionComponent<TokenInfoProps> = ({ url, name, price }) => {
  return (
    <TokenContainer>
      <TokenImage src={url} alt={name} />
      <Token>
        <TokenName>{name}</TokenName>
        <TokenPrice>{price}</TokenPrice>
      </Token>
    </TokenContainer>
  );
};

const PlaceHolder = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TokenImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Token = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const TokenName = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
`;

const TokenPrice = styled.span`
  font-size: 14px;
  line-height: 17px;
  color: #888;
`;

export default TokenDropdown;
