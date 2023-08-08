import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { PanelType, SubstationType } from "../../redux/reduxTypes";
import "./substationChoose.scss";
import {
  STATIONINFO_PANELLIST_ADD,
  STATIONINFO_SUBSTATIONINDEX_SET,
  STATIONINFO_SUBSTATION_DELETE_BY_INDEX,
} from "../../redux/redux_consts";
import { closeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

function SubstationChoose() {
  const dispatch = useDispatch();
  const dispatchStationInfoSubstationIndexSet = (index: number) => {
    dispatch({ type: STATIONINFO_SUBSTATIONINDEX_SET, payload: index });
  };
  const dispatchStationInfoPanelListAdd = () => {
    dispatch({ type: STATIONINFO_PANELLIST_ADD });
  };
  const dispatchStationInfoSubstationDeleteByIndex = () => {
    dispatch({ type: STATIONINFO_SUBSTATION_DELETE_BY_INDEX });
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
                {stationInfoData.substationIndex === index &&
                stationInfoData.listOfPanelList.length > 1 ? (
                  <div
                    onClick={() => {
                      dispatchStationInfoSubstationDeleteByIndex();
                    }}
                    className="SubstationChooseSection_Main_El_Close"
                  >
                    <IonIcon icon={closeOutline} />
                  </div>
                ) : null}

                <div className="SubstationChooseSection_Main_El_Main">
                  {el.panelList.length === 0 ? 1 : el.panelList.length}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default SubstationChoose;
