import { useEffect, useState } from "react";
import "./header.scss";
import { API_KEY } from "../../settings/CONSTS";
import { useDispatch, useSelector } from "react-redux";
import {
  LOCATIONINFO_LATLON_SET,
  MESSAGEHANDLER_ADD,
} from "../../redux/redux_consts";
import { searchOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { StoreState } from "../../redux/store";

function Header() {
  const dispatch = useDispatch();
  const dispatchLocationInfoLatLonSet = (lat: Number, lon: number) => {
    dispatch({ type: LOCATIONINFO_LATLON_SET, payload: { lat, lon } });
  };
  const state = useSelector((state: StoreState) => state);
  const proggress = state.proggress.data;

  const [locInput, setLocInput] = useState("");
  const [searchVariants, setSearchVariants] = useState<any>([]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocInput(e.target.value);
  };

  const onClickCooseVariant = (choose: any) => {
    dispatchLocationInfoLatLonSet(choose.lat, choose.lon);
    setLocInput("");
  };

  useEffect(() => {
    if (locInput !== "") {
      const locUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${locInput}&limit=5&appid=${API_KEY}`;

      fetch(locUrl)
        .then((res) => res.json())
        .then((data) => {
          //   const def = [...data];
          setSearchVariants(data);
          // console.log(data);

          const firstCorrect = data[0];

          // if (firstCorrect)
          //   dispatchLocationInfoLatLonSet(firstCorrect.lat, firstCorrect.lon);

          //   console.log(data[0]);
        });
    }
  }, [locInput]);

  return (
    <div className="HeaderSection">
      <div className="HeaderSection_InputWrap">
        <div className="HeaderSection_InputWrap_Wrap">
          <IonIcon
            className="HeaderSection_InputWrap_Wrap_Icon"
            icon={searchOutline}
          />
          <input
            style={{ pointerEvents: proggress.stage === 0 ? "all" : "none" }}
            className="HeaderSection_InputWrap_Wrap_Input"
            placeholder="search"
            onChange={onChangeSearch}
          />
        </div>
        {proggress.stage === 0 && locInput !== "" ? (
          <div className="HeaderSection_InputWrap_Variants">
            {searchVariants.map((el: any, index: number) => {
              const keyNames = Object.keys(el);
              return (
                <div
                  onClick={() => onClickCooseVariant(el)}
                  className="HeaderSection_InputWrap_Variants_El"
                  key={`HSIWVE${index}`}
                >
                  {keyNames.includes("country") ? `${el.country}, ` : ""}
                  {keyNames.includes("name") ? `${el.name}, ` : ""}
                  {keyNames.includes("state") ? `${el.state}` : ""}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
