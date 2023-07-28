import { useDispatch, useSelector } from "react-redux";
import "./leftProggress.scss";
import {
  PROGGRESS_STAGE_INCREMENT,
  PROGGRESS_STAGE_SET,
} from "../../redux/redux_consts";
import { StoreState } from "../../redux/store";

function LeftProggress() {
  const dispatch = useDispatch();
  const dispatchProggressStageSet = (number: number) => {
    dispatch({ type: PROGGRESS_STAGE_SET, payload: number });
  };
  
  const state = useSelector((state:StoreState) => state)
  const proggress = state.proggress.data

  const onClickContinue = () => {
    dispatchProggressStageSet(proggress.stage + 1)
  }

  return (
    <div className="LeftProggressSection">
      <button className="LeftProggressSection_Continue" onClick={onClickContinue}>continue {proggress.stage}</button>
    </div>
  );
}

export default LeftProggress;
