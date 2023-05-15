import { FunctionComponent } from "react";
import { usePopup } from "../../hooks/usePopup";
import BasicPopup from "./BasicPopup";
import PopupC from "./PopupC";

const PopupA: FunctionComponent = () => {
  const { openPopup } = usePopup();

  return (
    <BasicPopup
      title='Popup B'
      body={<p>This is Popup B.</p>}
      onOpenNextPopup={() => {
        openPopup(<PopupC />);
      }}
    />
  );
};

export default PopupA;
