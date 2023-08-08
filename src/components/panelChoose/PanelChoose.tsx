import { useDispatch, useSelector } from "react-redux";
import "./panelChoose.scss";
import { StoreState } from "../../redux/store";
import { PanelChooseType } from "../../redux/reduxTypes";
import { useEffect, useMemo, useState } from "react";
import {
  PANELCHOOSE_ADD_NEW,
  PANELCHOOSE_CHANGE_PANEL_FIELD_BY_INDEX,
  PANELCHOOSE_CURRENT_SET,
  STATIONINFO_SUBSTATION_ANGLE_SET,
  STATIONINFO_SUBSTATION_ORIENTATIONANGLE_SET,
} from "../../redux/redux_consts";

type inputBlock = {
  value: any;
  setValue: any;
  onLeaveFocus: any;
  title: string;
};
function PanelChoose() {
  const dispatch = useDispatch();
  const dispatchPaneChooseChangePanelFieldByIndex = (data: PanelChooseType) => {
    dispatch({ type: PANELCHOOSE_CHANGE_PANEL_FIELD_BY_INDEX, payload: data });
  };
  const dispatchPaneChooseCurrentSet = (index: number) => {
    dispatch({ type: PANELCHOOSE_CURRENT_SET, payload: index });
  };
  const dispatchPanelChooseAddNew = () => {
    dispatch({ type: PANELCHOOSE_ADD_NEW });
  };
  const dispatchStationInfoSubstationAngleSet = (angle: number) => {
    dispatch({ type: STATIONINFO_SUBSTATION_ANGLE_SET, payload: angle });
  };
  const dispatchStationInfoSubstationOrientationAngle = (angle: number) => {
    dispatch({ type: STATIONINFO_SUBSTATION_ORIENTATIONANGLE_SET, payload: angle });
  };

  const state = useSelector((state: StoreState) => state);
  const panelChoose = state.panelChoose;
  const currentPannel = panelChoose.panelList[panelChoose.currentPanelIndex];
  const stationInfoData = state.stationInfo.data;

  const stationInfoDataAngle =
    stationInfoData.listOfPanelList[stationInfoData.substationIndex].angle;
  const stationInfoDataOrientationAngle =
    stationInfoData.listOfPanelList[stationInfoData.substationIndex].orientationAngle;

  const [isCanUpdatePanel, setIsCanUpdatePanel] = useState<boolean>(true);
  const [inputError, setInputError] = useState<any>({
    angle: null,
    orientationAngle: null,
    wattage: null,
    efficiencyPercents: null,
    temperatureCoefPower: null,
  });

  const [angle, setAngle] = useState<number>(0);
  const [orientationAngle, setOrientationAngle] = useState<number>(180);
  const [wattage, setWattage] = useState<number>(0);
  const [efficiencyPercents, setEfficiencyPercents] = useState<number>(0);
  const [temperatureCoefPower, setTemperatureCoefPower] = useState<number>(0);

  const changeCurrentPanel = (index: number) => {
    dispatchPaneChooseCurrentSet(index);
  };

  const onLeaveFocus = () => {
    if (isCanUpdatePanel) {
      dispatchPaneChooseChangePanelFieldByIndex({
        color: currentPannel.color,
        wattage: wattage,
        efficiencyPercents: efficiencyPercents,
        temperatureCoefPower: temperatureCoefPower,
      });

      dispatchStationInfoSubstationAngleSet(angle);
      dispatchStationInfoSubstationOrientationAngle(orientationAngle);
    }
  };

  const setErrorMessage = (
    keyName: string,
    max: number,
    min: number,
    inputValue: number,
    targetValue: any
  ) => {
    setInputError((value: any) => {
      const result = value;
      if (!(inputValue <= max && inputValue >= min)) {
        result[keyName] = `Enter a angle between ${min} and ${max}`;
      } else if (targetValue === "") {
        result[keyName] = `Field is empty`;
      } else {
        result[keyName] = null;
      }

      return result;
    });
  };

  const onChangeAngle = (e: any) => {
    setAngle(() => {
      const valFromInput = Number.parseInt(e.target.value);
      const max = 90;
      const min = 0;
      setIsCanUpdatePanel(
        valFromInput <= max && valFromInput >= min && e.target.value !== ""
      );

      setErrorMessage("angle", max, min, valFromInput, e.target.value);

      return e.target.value;
    });
  };
  const onChangeOrientationAngle = (e: any) => {
    setOrientationAngle(() => {
      const valFromInput = Number.parseInt(e.target.value);
      const max = 360;
      const min = 0;
      setIsCanUpdatePanel(
        valFromInput <= max && valFromInput >= min && e.target.value !== ""
      );

      setErrorMessage("orientationAngle", max, min, valFromInput, e.target.value);

      return e.target.value;
    });
  };
  const onChangeWattage = (e: any) => {
    setWattage(() => {
      const valFromInput = Number.parseInt(e.target.value);
      const max = 1000;
      const min = 0;
      setIsCanUpdatePanel(
        valFromInput <= max && valFromInput >= min && e.target.value !== ""
      );

      setErrorMessage("wattage", max, min, valFromInput, e.target.value);

      return e.target.value;
    });
  };
  const onChangeEfficiencyPercents = (e: any) => {
    setEfficiencyPercents(() => {
      const valFromInput = Number.parseFloat(e.target.value);
      const max = 100;
      const min = 0;

      setIsCanUpdatePanel(
        valFromInput <= max && valFromInput >= min && e.target.value !== ""
      );
      setErrorMessage(
        "efficiencyPercents",
        max,
        min,
        valFromInput,
        e.target.value
      );

      return e.target.value;
    });
  };
  const onChangeTemperatureCoefPower = (e: any) => {
    setTemperatureCoefPower(() => {
      const valFromInput = Number.parseFloat(e.target.value);
      const max = 100;
      const min = 0;
      setIsCanUpdatePanel(
        valFromInput <= max && valFromInput >= min && e.target.value !== ""
      );

      setErrorMessage(
        "temperatureCoefPower",
        max,
        min,
        valFromInput,
        e.target.value
      );

      return e.target.value;
    });
  };

  // set initial value from current panel
  useEffect(() => {
    setAngle(stationInfoDataAngle);
    setOrientationAngle(stationInfoDataOrientationAngle)
    setWattage(currentPannel.wattage);
    setEfficiencyPercents(currentPannel.efficiencyPercents);
    setTemperatureCoefPower(currentPannel.temperatureCoefPower);
  }, [currentPannel, stationInfoDataAngle, stationInfoDataOrientationAngle]);

  const InputError = ({ errorMessage }: { errorMessage: string }) => {
    return (
      <>
        {errorMessage !== null ? (
          <div className="InputErrorSection">{errorMessage}</div>
        ) : null}
      </>
    );
  };

  return (
    <div className="PanelChooseSection">
      <div className="PanelChooseSection_PanelList">
        <div
          onClick={dispatchPanelChooseAddNew}
          className="PanelChooseSection_PanelList_El PanelChooseSection_PanelList_Add"
        >
          +
        </div>

        {panelChoose.panelList.map((el: PanelChooseType, index: number) => (
          <div
            onClick={() => changeCurrentPanel(index)}
            className={`PanelChooseSection_PanelList_El ${
              panelChoose.currentPanelIndex === index ? "active" : ""
            }`}
            key={`PCSPLE${index}`}
          >
            <div
              className="PanelChooseSection_PanelList_El_Dot"
              style={{ backgroundColor: el.color }}
            ></div>

            <div className="PanelChooseSection_PanelList_El_Main">
              {el.wattage}W
            </div>
          </div>
        ))}
      </div>

      <div className="PanelChooseSection_Configuration">
        <div className="PanelChooseSection_Configuration_Main">
          <div className="PanelChooseSection_Configuration_Main_InputWrap">
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Text">
              <div className="PanelChooseSection_Configuration_Main_InputWrap_Text_Big">
                Tilt angle
              </div>
            </div>
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Wrap">
              <input
                className="PanelChooseSection_Configuration_Main_InputWrap_Wrap_Input"
                value={angle}
                type="number"
                onChange={onChangeAngle}
                onBlur={onLeaveFocus}
              />
              <InputError errorMessage={inputError.angle} />
            </div>
          </div>
          <div className="PanelChooseSection_Configuration_Main_InputWrap">
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Text">
              <div className="PanelChooseSection_Configuration_Main_InputWrap_Text_Big">
                Orientation Angle
              </div>
            </div>
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Wrap">
              <input
                className="PanelChooseSection_Configuration_Main_InputWrap_Wrap_Input"
                value={orientationAngle}
                type="number"
                onChange={onChangeOrientationAngle}
                onBlur={onLeaveFocus}
              />
              <InputError errorMessage={inputError.orientationAngle} />
            </div>
          </div>

          <div className="PanelChooseSection_Configuration_Main_Separator"></div>

          <div className="PanelChooseSection_Configuration_Main_InputWrap">
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Text">
              <div className="PanelChooseSection_Configuration_Main_InputWrap_Text_Big">
                Wattage
              </div>
            </div>
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Wrap">
              <input
                className="PanelChooseSection_Configuration_Main_InputWrap_Wrap_Input"
                value={wattage}
                type="number"
                onChange={onChangeWattage}
                onBlur={onLeaveFocus}
              />
            </div>
          </div>

          <div className="PanelChooseSection_Configuration_Main_InputWrap">
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Text">
              <div className="PanelChooseSection_Configuration_Main_InputWrap_Text_Big">
                Efficiency
              </div>
            </div>
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Wrap">
              <input
                className="PanelChooseSection_Configuration_Main_InputWrap_Wrap_Input"
                value={efficiencyPercents}
                type="number"
                onChange={onChangeEfficiencyPercents}
                onBlur={onLeaveFocus}
              />
            </div>
          </div>

          <div className="PanelChooseSection_Configuration_Main_InputWrap">
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Text">
              <div className="PanelChooseSection_Configuration_Main_InputWrap_Text_Big">
                Temperature Coeficient Power
              </div>
            </div>
            <div className="PanelChooseSection_Configuration_Main_InputWrap_Wrap">
              <input
                className="PanelChooseSection_Configuration_Main_InputWrap_Wrap_Input"
                value={temperatureCoefPower}
                type="number"
                onChange={onChangeTemperatureCoefPower}
                onBlur={onLeaveFocus}
              />
              <InputError errorMessage={inputError.temperatureCoefPower} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelChoose;
