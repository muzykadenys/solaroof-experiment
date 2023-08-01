import { ActionType, PanelType, StateStationInfoType } from "./reduxTypes";
import {
  STATIONINFO_ISHAVESTATION_SET,
  STATIONINFO_ISROOF_SET,
  STATIONINFO_PANELLIST_ADD,
  STATIONINFO_PANELLIST_SET,
  STATIONINFO_SUBSTATIONINDEX_SET,
} from "./redux_consts";

const initialState = {
  panelGap: 0.05,
  panelPosZ: 0.15,
  buttonPosZ: 0.3,
  panelSize: [1.42, 2.1, 0.1],
  data: {
    isHaveStation: false,
    isRoof: false,
    listOfPanelList: [[]],
    substationIndex: 0,
  },
};

const stationInfoReducer = (
  state: StateStationInfoType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case STATIONINFO_ISHAVESTATION_SET:
      return {
        ...state,
        data: {
          ...state.data,
          isHaveStation: action.payload,
        },
      };
    case STATIONINFO_ISROOF_SET:
      return {
        ...state,
        data: {
          ...state.data,
          isRoof: action.payload,
        },
      };
    case STATIONINFO_SUBSTATIONINDEX_SET:
      return {
        ...state,
        data: {
          ...state.data,
          substationIndex: action.payload,
        },
      };
    case STATIONINFO_PANELLIST_ADD:
      return {
        ...state,
        data: {
          ...state.data,
          listOfPanelList: [...state.data.listOfPanelList, []],
        },
      };
    case STATIONINFO_PANELLIST_SET:
      return {
        ...state,
        data: {
          ...state.data,
          listOfPanelList: state.data.listOfPanelList.map(
            (el: PanelType[], index: number) => {
              if (state.data.substationIndex === index) {
                return action.payload;
              }
              return el;
            }
          ),
          // listOfPanelList: [...state.data.listOfPanelList, action.payload],
        },
      };
    default:
      return state;
  }
};

export default stationInfoReducer;
