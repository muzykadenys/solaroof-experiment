import { ActionType, StateStationInfoType } from "./reduxTypes";
import {
  STATIONINFO_ISHAVESTATION_SET,
  STATIONINFO_ISROOF_SET,
} from "./redux_consts";

const initialState = {
  data: {
    isHaveStation: false,
    isRoof: false,
  },
};

const stationInfoReducer = (
  state: StateStationInfoType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case STATIONINFO_ISHAVESTATION_SET:
      return {
        data: {
          ...state.data,
          isHaveStation: action.payload,
        },
      };
    case STATIONINFO_ISROOF_SET:
      return {
        data: {
          ...state.data,
          isRoof: action.payload,
        },
      };
    default:
      return state;
  }
};

export default stationInfoReducer;
