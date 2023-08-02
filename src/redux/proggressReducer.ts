import { ActionType, StateProggressType } from "./reduxTypes";
import { PROGGRESS_STAGE_INCREMENT, PROGGRESS_STAGE_SET } from "./redux_consts";


const initialState = {
  data: {
    stage: 0
  }
};

const proggressReducer = (
  state: StateProggressType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case PROGGRESS_STAGE_SET:
      return {
        data: {
            stage: action.payload
        }
      };
    case PROGGRESS_STAGE_INCREMENT:
      return {
        data: {
            stage: state.data.stage + 1
        }
      };
    default:
      return state;
  }
};

export default proggressReducer