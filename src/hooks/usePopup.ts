import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { popupsState } from "../stores/popup";

const MAX_POPUP_COUNT = 3;
export const usePopup = () => {
  const [popups, setPopups] = useRecoilState(popupsState);

  const openPopup = useCallback(
    (newPopup: JSX.Element) => {
      if (popups.length < MAX_POPUP_COUNT) {
        setPopups([...popups, newPopup]);
      }
    },
    [popups]
  );

  const closePopup = useCallback(() => {
    setPopups(popups.slice(0, popups.length - 1));
  }, [popups]);

  return {
    popups,
    openPopup,
    closePopup,
  };
};
