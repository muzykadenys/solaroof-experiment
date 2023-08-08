import { useDispatch, useSelector } from "react-redux";
import "./loginPage.scss";
import { SHOWWINDOWS_LOGIN_SET } from "../../redux/redux_consts";
import { StoreState } from "../../redux/store";
import { useState } from "react";

import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

function LoginPage({ isLogin }: { isLogin: boolean }) {
  const dispatch = useDispatch();
  const dispatchShowWindowsLoginSet = (value: boolean) => {
    dispatch({ type: SHOWWINDOWS_LOGIN_SET, payload: value });
  };
  const state = useSelector((state: StoreState) => state);
  const showWindowsLogin = state.showWindows.login;

  // =============================================

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const hideOnClick = (e: any) => {
    if (e.target == e.currentTarget) {
      dispatchShowWindowsLoginSet(false);
    }
  };

  const hidePasswordOnClick = () => {
    setHidePassword((el: boolean) => !el);
  };

  return (
    <>
      {showWindowsLogin ? (
        <div className="LoginPageSection" onClick={hideOnClick}>
          <form className="LoginPageSection_Main">
            <div className="LoginPageSection_Main_FormName">
              {isLogin ? "Login" : "Sign up"}
            </div>

            <div className="LoginPageSection_Main_InputWrap">
              <div className="LoginPageSection_Main_InputWrap_Title">Email</div>
              <input className="LoginPageSection_Main_InputWrap_Input" />
            </div>

            <div className="LoginPageSection_Main_InputWrap">
              <div className="LoginPageSection_Main_InputWrap_Title">
                Password
              </div>
              <div className="LoginPageSection_Main_InputWrap_PassWrap">
                <input
                  type={hidePassword ? "password" : "text"}
                  className="LoginPageSection_Main_InputWrap_Input"
                />
                <IonIcon onClick={hidePasswordOnClick} className="LoginPageSection_Main_InputWrap_Icon" icon={hidePassword ? eyeOffOutline : eyeOutline} />
              </div>
            </div>

            <button className="LoginPageSection_Main_Submit">submit</button>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default LoginPage;
