import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { PanelType, SubstationType } from "../../redux/reduxTypes";
import "./substationChoose.scss";
import {
  STATIONINFO_PANELLIST_ADD,
  STATIONINFO_SUBSTATIONINDEX_SET,
} from "../../redux/redux_consts";

function SubstationChoose() {
  const dispatch = useDispatch();
  const dispatchStationInfoSubstationIndexSet = (index: number) => {
    dispatch({ type: STATIONINFO_SUBSTATIONINDEX_SET, payload: index });
  };
  const dispatchStationInfoPanelListAdd = () => {
    dispatch({ type: STATIONINFO_PANELLIST_ADD });
  };

  const state = useSelector((state: StoreState) => state);
  const stationInfoData = state.stationInfo.data;

  const changeSubstation = (index: number) => {
    dispatchStationInfoSubstationIndexSet(index);
  };

  const addSubStation = () => {
    dispatchStationInfoPanelListAdd();
  };

  return (
    <div className="SubstationChooseSection">
      <div className="SubstationChooseSection_Main">
        <div
          onClick={addSubStation}
          className="SubstationChooseSection_Main_El SubstationChooseSection_Main_Add"
        >
          +
        </div>

        {stationInfoData.listOfPanelList.map(
          (el: SubstationType, index: number) => {
            return (
              <div
                onClick={() => changeSubstation(index)}
                className={`SubstationChooseSection_Main_El ${
                  stationInfoData.substationIndex === index ? "active" : ""
                }`}
                key={`SCS${index}`}
              >
                {el.panelList.length === 0 ? 1 : el.panelList.length}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default SubstationChoose;
