import { FunctionComponent } from "react";
import styled from "styled-components";
import { usePopup } from "../../hooks/usePopup";

interface BasicPopupProps {
  title: string;
  body: JSX.Element;
  onOpenNextPopup?: () => void;
}

const BasicPopup: FunctionComponent<BasicPopupProps> = ({
  title = 10,
  body,
  onOpenNextPopup,
}) => {
  const { closePopup } = usePopup();

  return (
    <PopupContainer onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={closePopup}>Close</CloseButton>

      <h1>{title}</h1>
      {body}
      {onOpenNextPopup && (
        <NextButton onClick={onOpenNextPopup}>Open Next Popup</NextButton>
      )}
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const NextButton = styled.button`
  margin-top: 10px;
`;

export default BasicPopup;
