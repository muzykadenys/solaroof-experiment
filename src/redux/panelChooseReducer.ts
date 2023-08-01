import {
  ActionType,
  PanelChooseType,
  StatePanelChooseType,
} from "./reduxTypes";
import {
  PANELCHOOSE_ADD_NEW,
  PANELCHOOSE_CHANGE_PANEL_FIELD_BY_INDEX,
  PANELCHOOSE_CURRENT_SET,
} from "./redux_consts";

const randomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

const initialState = {
  panelList: [
    {
      color: "pink",
      wattage: 660,
      efficiencyPercents: 21.2,
      temperatureCoefPower: 0.34,
    },
    {
      color: "green",
      wattage: 540,
      efficiencyPercents: 45.2,
      temperatureCoefPower: 0.34,
    },
  ],
  currentPanelIndex: 0,
};

const panelChooseReducer = (
  state: StatePanelChooseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case PANELCHOOSE_CURRENT_SET:
      return {
        ...state,
        currentPanelIndex: action.payload,
      };
      break;
    case PANELCHOOSE_ADD_NEW:
      return {
        ...state,
        panelList: [
          { ...state.panelList[0], color: randomColor() },
          ...state.panelList,
        ],
      };
      break;
    case PANELCHOOSE_CHANGE_PANEL_FIELD_BY_INDEX:
      return {
        ...state,
        panelList: state.panelList.map((el: PanelChooseType, index: number) => {
          if (index === state.currentPanelIndex)
            return {
              ...el,
              ...action.payload,
            };
          return el;
        }),
      };
      break;
    default:
      return state;
  }
};

export default panelChooseReducer;
