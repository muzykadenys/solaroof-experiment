import { useEffect, useState } from "react";
import "./header.scss";
import { API_KEY } from "../../settings/CONSTS";
import { useDispatch } from "react-redux";
import { LOCATIONINFO_LATLON_SET } from "../../redux/redux_consts";

function Header() {
  const dispatch = useDispatch();
  const dispatchLocationInfoLatLonSet = (lat: Number, lon: number) => {
    dispatch({ type: LOCATIONINFO_LATLON_SET, payload: { lat, lon } });
  };

  const [locInput, setLocInput] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocInput(e.target.value);
  };

  useEffect(() => {
    if (locInput !== "") {
      const locUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${locInput}&limit=5&appid=${API_KEY}`;

      fetch(locUrl)
        .then((res) => res.json())
        .then((data) => {
          //   const def = [...data];

          const firstCorrect = data[0];

          if (firstCorrect)
            dispatchLocationInfoLatLonSet(firstCorrect.lat, firstCorrect.lon);

          //   console.log(data[0]);
        });
    }
  }, [locInput]);

  return (
    <div className="HeaderSection">
      <div className="HeaderSection_InputWrap">
        <input
          className="HeaderSection_InputWrap_Input"
          placeholder="search"
          onChange={onChangeSearch}
        />
      </div>
    </div>
  );
}

export default Header;
