export type ActionType = {
  type: String;
  payload: any;
  error: any;
};

export type LocationInfoType = {
  lat: Number | null;
  lon: Number | null;
  marker: {
    lat: Number | null;
    lon: Number | null;
  };
};
export type StateLocationInfoType = {
  loading: Boolean;
  data: LocationInfoType;
  error: String;
};

export type ProggressType = {
  stage: number;
};
export type StateProggressType = {
  data: ProggressType;
};

export type StationInfoType = {
  isHaveStation: boolean
  isRoof: boolean
};
export type StateStationInfoType = {
  data: StationInfoType;
};
