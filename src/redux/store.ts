import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import locationInfoReducer from './locationInfoReducer'
import proggressReducer from './proggressReducer'
import stationInfoReducer from './stationInfoReducer'
import messageHandlerReducer from './mesageHandlerReducer'
import panelChooseReducer from './panelChooseReducer'
const rootReducer = combineReducers({
   locationInfo: locationInfoReducer,
   proggress: proggressReducer,
   stationInfo: stationInfoReducer,
   messageHandler: messageHandlerReducer,
   panelChoose: panelChooseReducer
})

export type StoreState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, composeWithDevTools())