import { useDispatch, useSelector } from "react-redux";
import "./leftProggress.scss";
import {
  PROGGRESS_STAGE_INCREMENT,
  PROGGRESS_STAGE_SET,
} from "../../redux/redux_consts";
import { StoreState } from "../../redux/store";
import {
  earthOutline,
  earth,
  locateOutline,
  locate,
  grid,
  gridOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

function LeftProggress() {
  const dispatch = useDispatch();
  const dispatchProggressStageSet = (number: number) => {
    dispatch({ type: PROGGRESS_STAGE_SET, payload: number });
  };

  const state = useSelector((state: StoreState) => state);
  const proggress = state.proggress.data;

  const onClickContinue = () => {
    dispatchProggressStageSet(proggress.stage + 1);
  };

  return (
    <div className="LeftProggressSection">
      {/* <button
        className="LeftProggressSection_Continue"
        onClick={onClickContinue}
      >
        continue {proggress.stage}
      </button> */}
      <div className="LeftProggressSection_Main">
        <div
          className={`LeftProggressSection_Main_El ${
            proggress.stage === 0 ? "active" : ""
          }`}
          onClick={() => dispatchProggressStageSet(0)}
        >
          <IonIcon icon={proggress.stage === 0 ? earth : earthOutline} />
        </div>
        <div
          className={`LeftProggressSection_Main_El ${
            proggress.stage === 1 ? "active" : ""
          }`}
          onClick={() => dispatchProggressStageSet(1)}
        >
          <IonIcon icon={proggress.stage === 1 ? locate : locateOutline} />
        </div>
        <div
          className={`LeftProggressSection_Main_El ${
            proggress.stage === 2 ? "active" : ""
          }`}
          onClick={() => dispatchProggressStageSet(2)}
        >
          <IonIcon icon={proggress.stage === 2 ? grid : gridOutline} />
        </div>
      </div>
    </div>
  );
}

export default LeftProggress;
