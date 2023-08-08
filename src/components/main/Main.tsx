import { Provider } from "react-redux";
import Map from "../Map/Map";
import Header from "../header/Header";
import "./main.scss";
import { store } from "../../redux/store";
import LeftProggress from "../leftProggsess/LeftProggress";
import RoofChoose from "../roofChoose/RoofChoose";
import UiAboveMap from "../uiAboveMap/UiAboveMap";
import MessageHandler from "../messageHandler/MessageHandler";
import EarthPreview from "../earthPreview/EarthPreview";
import Profile from "../profile/Profile";
import LoginPage from "../loginPage/LoginPage";

function Main() {
  return (
    <Provider store={store}>
      <MessageHandler />

      <div className="MainSection">
        <Header />
        <Map />

        <UiAboveMap />

        <LoginPage isLogin={true} />
        <Profile />

        {/* <EarthPreview /> */}
      </div>
    </Provider>
  );
}

export default Main;
