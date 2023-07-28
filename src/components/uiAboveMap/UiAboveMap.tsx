import { useSelector } from "react-redux";
import LeftProggress from "../leftProggsess/LeftProggress";
import ModalStationType from "../modalStationType/ModalStationType";
import RoofChoose from "../roofChoose/RoofChoose";
import "./uiAboveMap.scss";
import { StoreState } from "../../redux/store";

function UiAboveMap() {
  const state = useSelector((state: StoreState) => state);
  const proggress = state.proggress.data;

  return (
    <div className="UiAboveMapSection">
      <div className="UiAboveMapSection_Wrap">
        <LeftProggress />

        <div className="UiAboveMapSection_Wrap_CenterFields">
          {proggress.stage === 2 ? <ModalStationType /> : null}
          {proggress.stage === 3 ? <RoofChoose /> : null}
        </div>

        <LeftProggress />
      </div>
    </div>
  );
}

export default UiAboveMap;
