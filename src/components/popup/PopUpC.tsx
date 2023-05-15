import { FunctionComponent } from "react";
import BasicPopup from "./BasicPopup";

const PopupC: FunctionComponent = () => {
  return <BasicPopup title='Popup C' body={<p>This is Popup C.</p>} />;
};

export default PopupC;
