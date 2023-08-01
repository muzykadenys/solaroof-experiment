export type ActionType = {
  type: String;
  payload: any;
  error: any;
};

//location
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

// progress creation
export type ProggressType = {
  stage: number;
};
export type StateProggressType = {
  data: ProggressType;
};

// station info
export type PanelType = {
  id: string;
  parent: string | null;
  position: number[];
  top: string | null;
  right: string | null;
  bottom: string | null;
  left: string | null;
  panelTypeIndex: number
  color: string
};
export type StationInfoType = {
  isHaveStation: boolean;
  isRoof: boolean;
  listOfPanelList: PanelType[][]
  substationIndex: number
};
export type StateStationInfoType = {
  panelGap: number
  panelPosZ: number
  buttonPosZ: number
  panelSize: number[]
  data: StationInfoType;
};

// message handler
export type MessageHandlerType = {
  id: string;
  text: string;
};
export type StateMessageHandlerType = {
  data: MessageHandlerType[];
  time: number;
};

// panel choose
export type PanelChooseType = {
  color: string;
  wattage: number;
  efficiencyPercents: number;
  temperatureCoefPower: number;
};
export type StatePanelChooseType = {
  panelList: PanelChooseType[];
  currentPanelIndex: number;
};
