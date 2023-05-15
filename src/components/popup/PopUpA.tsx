import { FunctionComponent } from "react";
import { usePopup } from "../../hooks/usePopup";
import BasicPopup from "./BasicPopup";
import PopupB from "./PopupB";

const PopupA: FunctionComponent = () => {
  const { openPopup } = usePopup();

  return (
    <BasicPopup
      title='Popup A'
      body={<p>This is Popup A.</p>}
      onOpenNextPopup={() => {
        openPopup(<PopupB />);
      }}
    />
  );
};

export default PopupA;
