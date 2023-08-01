import {
  ActionType,
  MessageHandlerType,
  StateMessageHandlerType,
  StateProggressType,
} from "./reduxTypes";
import {
  MESSAGEHANDLER_ADD,
  MESSAGEHANDLER_REMOVE_BY_ID,
} from "./redux_consts";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  data: [],
  time: 1000,
};

const messageHandlerReducer = (
  state: StateMessageHandlerType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case MESSAGEHANDLER_ADD:
      return {
        ...state,
        data: [...state.data, { text: action.payload, id: uuidv4() }],
      };
      break;
    case MESSAGEHANDLER_REMOVE_BY_ID:
      return {
        ...state,
        data: state.data.filter(
          (el: MessageHandlerType) => el.id !== action.payload
        ),
      };
      break;
    default:
      return state;
  }
};

export default messageHandlerReducer;
