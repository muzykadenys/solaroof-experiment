import { ActionType, StateLocationInfoType } from "./reduxTypes";
import {
  LOCATIONINFO_LATLON_SET,
  LOCATIONINFO_MARKER_SET,
  LOCATIONINFO_SET_SUCCESS,
} from "./redux_consts";

const initialState = {
  loading: false,
  data: {
    lat: null,
    lon: null,
    marker: {
      lat: 0,
      lon: 0,
    },
  },
  error: "",
};

const locationInfoReducer = (
  state: StateLocationInfoType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case LOCATIONINFO_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case LOCATIONINFO_LATLON_SET:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          lat: action.payload.lat,
          lon: action.payload.lon,
        },
        error: "",
      };
    case LOCATIONINFO_MARKER_SET:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          marker: {
            lat: action.payload.lat,
            lon: action.payload.lon,
          },
        },
        error: "",
      };
    default:
      return state;
  }
};

export default locationInfoReducer;
