import { useDispatch, useSelector } from "react-redux";
import "./panelChoose.scss";
import { StoreState } from "../../redux/store";
import { PanelChooseType } from "../../redux/reduxTypes";
import { useEffect, useMemo, useState } from "react";
import {
  PANELCHOOSE_ADD_NEW,
  PANELCHOOSE_CHANGE_PANEL_FIELD_BY_INDEX,
  PANELCHOOSE_CURRENT_SET,
} from "../../redux/redux_consts";

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

  const state = useSelector((state: StoreState) => state);
  const panelChoose = state.panelChoose;
  const currentPannel = panelChoose.panelList[panelChoose.currentPanelIndex];

  const [isCanUpdatePanel, setIsCanUpdatePanel] = useState<boolean>(true);
  //   const [locCurrentPanel, setLocCurrentPanel] = useState<PanelChooseType>({
  //     color: currentPannel.color,
  //     wattage: 0,
  //     efficiencyPercents: 0,
  //     temperatureCoefPower: 0,
  //   });
  const [wattage, setWattage] = useState<number>(0);
  const [efficiencyPercents, setEfficiencyPercents] = useState<number>(0);
  const [temperatureCoefPower, setTemperatureCoefPower] = useState<number>(0);

  const changeCurrentPanel = (index: number) => {
    dispatchPaneChooseCurrentSet(index);
  };

  const onLeaveFocus = () => {
    if (isCanUpdatePanel)
      dispatchPaneChooseChangePanelFieldByIndex({
        color: currentPannel.color,
        wattage: wattage,
        efficiencyPercents: efficiencyPercents,
        temperatureCoefPower: temperatureCoefPower,
      });
  };

  const onChangeWattage = (e: any) => {
    setWattage(() => {
      const valFromInput = Number.parseInt(e.target.value);

      setIsCanUpdatePanel(
        valFromInput <= 2000 && valFromInput > 0 && e.target.value !== ""
      );

      return e.target.value;
    });
  };
  const onChangeEfficiencyPercents = (e: any) => {
    setEfficiencyPercents(() => {
      const valFromInput = Number.parseFloat(e.target.value);

      setIsCanUpdatePanel(
        valFromInput <= 100 && valFromInput > 0 && e.target.value !== ""
      );

      return e.target.value;
    });
  };
  const onChangeTemperatureCoefPower = (e: any) => {
    setTemperatureCoefPower(() => {
      const valFromInput = Number.parseFloat(e.target.value);

      setIsCanUpdatePanel(
        valFromInput <= 100 && valFromInput > 0 && e.target.value !== ""
      );

      return e.target.value;
    });
  };

  // set initial value from current panel
  useEffect(() => {
    setWattage(currentPannel.wattage);
    setEfficiencyPercents(currentPannel.efficiencyPercents);
    setTemperatureCoefPower(currentPannel.temperatureCoefPower);
  }, [currentPannel]);

  return (
    <div className="PanelChooseSection">
      <div className="PanelChooseSection_PanelList">
        <div onClick={dispatchPanelChooseAddNew} className="PanelChooseSection_PanelList_El PanelChooseSection_PanelList_Add">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelChoose;
