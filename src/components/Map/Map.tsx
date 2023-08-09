import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import "./map.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { Icon, point } from "leaflet";
import {
  LOCATIONINFO_LATLON_SET,
  LOCATIONINFO_MARKER_SET,
} from "../../redux/redux_consts";

function UpdateMapCentre(props: any) {
  const map = useMap();
  if (props.isDragable && props.mapCentre[0] && props.mapCentre[1])
    map.panTo(props.mapCentre);
  return null;
}
function SetCenterOnDragg(props: any) {
  const map = useMap();

  useMapEvents({
    dragend(e) {
      const center = map.getCenter();
      props.dispatchLocationInfoLatLonSet(center.lat, center.lng);
    },
  });
  return null;
}
function DisableDragging(props: any) {
  const map = useMap();

  if (!props.isDragable) {
    map.dragging.disable();
    map.doubleClickZoom.disable();
    map.keyboard.disable();
  } else {
    map.dragging.enable();
    map.doubleClickZoom.enable();
    map.keyboard.enable();
  }

  return null;
}

function Map() {
  const dispatch = useDispatch();
  const dispatchLocationInfoLatLonSet = (lat: number, lon: number) => {
    dispatch({ type: LOCATIONINFO_LATLON_SET, payload: { lat, lon } });
  };
  const dispatchLocationInfoMarkerSet = (lat: number, lon: number) => {
    dispatch({ type: LOCATIONINFO_MARKER_SET, payload: { lat, lon } });
  };

  const state = useSelector((state: StoreState) => state);
  const locationInfo = state.locationInfo.data;
  const proggress = state.proggress.data;

  const [isDragable, setIsDragable] = useState(true);
  const mapSectionRef = useRef<any>(null);

  // ================================================
  const customIcon = new Icon({
    iconUrl: "./marker.svg",
    iconSize: [40, 40],
  });

  function LocationMarker() {
    const mapCenter = useMap().getCenter();

    if (
      !isDragable &&
      locationInfo.marker.lat === 0 &&
      locationInfo.marker.lon === 0
    ) {
      dispatchLocationInfoMarkerSet(mapCenter.lat, mapCenter.lng);
    }

    useMapEvents({
      click(e) {
        if (
          !isDragable &&
          locationInfo.marker.lat !== 0 &&
          locationInfo.marker.lon !== 0
        ) {
          const point = e.latlng;

          dispatchLocationInfoMarkerSet(point.lat, point.lng);
        }
      },
    });

    // return position && proggress.stage === 1 ? (
    //   <Marker position={position} icon={customIcon}></Marker>
    // ) : null;
    return null;
  }

  useEffect(() => {
    if (proggress.stage === 0) {
      setIsDragable(true);
    } else {
      setIsDragable(false);
    }
  }, [proggress.stage]);

  return (
    <div
      className={`MapSection ${
        proggress.stage === 1 ? "MapSection__active" : ""
      }`}
    >
      <MapContainer
        zoomControl={false}
        className={`MapSection_MapContainer`}
        center={[49.774579, 24.0447]}
        // center={[locationInfo.lat, locationInfo.lon]}
        zoom={20}
      >
        <TileLayer
          // attribution="Tilespmmunity"
          // url="https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}.png?key=dwM7o8CZob5MpxrD4AjU"

          attribution=""
          url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=dwM7o8CZob5MpxrD4AjU"

          // attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          // attribution='&copy; <a href="https://www.openstreetmap.de/copyright">OpenStreetMap</a> contributors'
          // url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        ></TileLayer>

        <LocationMarker />
        {proggress.stage === 1 ? (
          <Marker
            position={{
              lat: locationInfo.marker.lat,
              lng: locationInfo.marker.lon,
            }}
            icon={customIcon}
          ></Marker>
        ) : null}

        <SetCenterOnDragg
          dispatchLocationInfoLatLonSet={dispatchLocationInfoLatLonSet}
        />
        <DisableDragging isDragable={isDragable} />
        <UpdateMapCentre
          mapCentre={[locationInfo.lat, locationInfo.lon]}
          isDragable={isDragable}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
