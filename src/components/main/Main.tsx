import { Provider } from "react-redux";
import Map from "../Map/Map";
import Header from "../header/Header";
import "./main.scss";
import { store } from "../../redux/store";
import LeftProggress from "../leftProggsess/LeftProggress";
import RoofChoose from "../roofChoose/RoofChoose";
import UiAboveMap from "../uiAboveMap/UiAboveMap";

function Main() {
  return (
    <Provider store={store}>
      <div className="MainSection">
        {/* <Header />
        <Map />

       <UiAboveMap/> */}
       
        <RoofChoose />
      </div>
    </Provider>
  );
}

export default Main;
