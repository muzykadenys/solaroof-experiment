import { useDispatch, useSelector } from "react-redux";
import "./modalStationType.scss";
import {
  PROGGRESS_STAGE_INCREMENT,
  PROGGRESS_STAGE_SET,
  STATIONINFO_ISHAVESTATION_SET,
  STATIONINFO_ISROOF_SET,
} from "../../redux/redux_consts";
import { StoreState } from "../../redux/store";
import { useState } from "react";

const Question_1 = (props: any) => {
  const { clickOnButton } = props;

  return (
    <div className="ModalStationTypeSection_Main">
      <div className="ModalStationTypeSection_Main_Text">Choose build mode</div>

      <div className="ModalStationTypeSection_Main_Buttons">
        <div
          onClick={() => clickOnButton(true)}
          className="ModalStationTypeSection_Main_Buttons_El"
        >
          have solar panels
        </div>

        <div
          onClick={() => clickOnButton(false)}
          className="ModalStationTypeSection_Main_Buttons_El"
        >
          plan to have solar panels
        </div>
      </div>
    </div>
  );
};
const Question_2 = (props: any) => {
  const { clickOnButton } = props;

  return (
    <div className="ModalStationTypeSection_Main">
      <div className="ModalStationTypeSection_Main_Text">Choose where you want place solar panels</div>

      <div className="ModalStationTypeSection_Main_Buttons">
        <div
          onClick={() => clickOnButton(true)}
          className="ModalStationTypeSection_Main_Buttons_El"
        >
          want place on roof
        </div>

        <div
          onClick={() => clickOnButton(false)}
          className="ModalStationTypeSection_Main_Buttons_El"
        >
          want place on ground
        </div>
      </div>
    </div>
  );
};

function ModalStationType() {
  const dispatch = useDispatch();
  const dispatchStationInfoIsHaveStationSet = (value: boolean) => {
    dispatch({ type: STATIONINFO_ISHAVESTATION_SET, payload: value });
  };
  const dispatchStationInfoIsRoofSet = (value: boolean) => {
    dispatch({ type: STATIONINFO_ISROOF_SET, payload: value });
  };
  const dispatchProggressStageIncrement = () => {
    dispatch({ type: PROGGRESS_STAGE_INCREMENT });
  };

  const [sequence, setSequence] = useState<number>(0);

  const clickOnButton = (value: boolean) => {
    dispatchStationInfoIsHaveStationSet(value);
    setSequence((e: number) => e + 1);
  };

  const clickFinishButton = (isRoof: boolean) => {
    dispatchStationInfoIsRoofSet(isRoof);
    dispatchProggressStageIncrement();
  };

  return (
    <div className="ModalStationTypeSection">
      {sequence === 0 ? <Question_1 clickOnButton={clickOnButton} /> : null}
      {sequence === 1 ? <Question_2 clickOnButton={clickFinishButton} /> : null}
    </div>
  );
}

export default ModalStationType;
