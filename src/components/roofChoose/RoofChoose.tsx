import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, PresentationControls } from "@react-three/drei";
import "./roofChoose.scss";
import { useEffect, useRef, useState } from "react";
import SceneWrap from "./SceneWrap";
import PanelChoose from "../panelChoose/PanelChoose";
import { IonIcon } from "@ionic/react";
import { gridOutline, grid, cubeOutline, cube } from "ionicons/icons";
import SubstationChoose from "../substationChoose/SubstationChoose";
import { StoreState } from "../../redux/store";
import { useSelector } from "react-redux";
import { PanelType } from "../../redux/reduxTypes";

function RoofChoose() {
  const state = useSelector((state: StoreState) => state);
  const stationInfoData = state.stationInfo.data;
  const [switchMode, setSwitchMode] = useState<boolean>(true);

  return (
    <div className="RoofChooseSection">
      <div className="RoofChooseSection_Left">
        {switchMode ? <PanelChoose /> : <SubstationChoose />}
      </div>

      <div className="RoofChooseSection_Right">
        <div className="RoofChooseSection_Right_SwitchMode">
          <div
            className="RoofChooseSection_Right_SwitchMode_El"
            onClick={() => setSwitchMode(true)}
          >
            <IonIcon icon={switchMode ? grid : gridOutline} />
          </div>
          <div
            className="RoofChooseSection_Right_SwitchMode_El"
            onClick={() => setSwitchMode(false)}
          >
            <IonIcon icon={switchMode ? cubeOutline : cube} />
          </div>
        </div>

        <Canvas
          camera={
            {
              // position: [2, 2, 4],
              // fov: 75,
            }
          }
        >
          {/* <OrbitControls /> */}
          <ambientLight />
          <pointLight position={[10, 10, -10]} />

          <PresentationControls
            global
            azimuth={[-Math.PI / 3, Math.PI / 3]}
            polar={[0, 0]}
            // snap={true}
            // config={{ mass: 1, tension: 1000, friction: 1 }}
          >
            {stationInfoData.listOfPanelList.map(
              (el: PanelType[], index: number) => {
                if (stationInfoData.substationIndex === index) {
                  return <SceneWrap propPanelList={el} key={`SISW${index}`} />;
                }
              }
            )}
          </PresentationControls>
        </Canvas>
      </div>
    </div>
  );
}

export default RoofChoose;
