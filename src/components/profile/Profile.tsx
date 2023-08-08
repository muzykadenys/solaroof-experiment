import { useState } from "react";
import "./profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { SHOWWINDOWS_PROFILE_SET } from "../../redux/redux_consts";

function Profile() {
  const dispatch = useDispatch();
  const dispatchShowWindowsProfileSet = (value: boolean) => {
    dispatch({ type: SHOWWINDOWS_PROFILE_SET, payload: value });
  };
  const state = useSelector((state: StoreState) => state);
  const showWindowsProfile = state.showWindows.profile;

  const hideOnClick = (e: any) => {
    if (e.target == e.currentTarget) {
        dispatchShowWindowsProfileSet(false)
    }
  };
  return (
    <>
      {showWindowsProfile ? (
        <div className="ProfileSection" onClick={hideOnClick}>
          <div className="ProfileSection_Main">profile</div>
        </div>
      ) : null}
    </>
  );
}

export default Profile;
