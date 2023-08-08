import { ActionType, ShowWindows } from "./reduxTypes";
import {
  SHOWWINDOWS_LOGIN_SET,
  SHOWWINDOWS_PROFILE_SET,
  SHOWWINDOWS_STATISTIC_SET,
} from "./redux_consts";

const initialState = {
  profile: false,
  statistic: false,
  login: false,
};

const showWindowsReducer = (
  state: ShowWindows = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case SHOWWINDOWS_PROFILE_SET:
      return {
        ...state,
        profile: action.payload,
      };
    case SHOWWINDOWS_STATISTIC_SET:
      return {
        ...state,
        statistic: action.payload,
      };
    case SHOWWINDOWS_LOGIN_SET:
      return {
        ...state,
        login: action.payload,
      };

    default:
      return state;
  }
};

export default showWindowsReducer;
