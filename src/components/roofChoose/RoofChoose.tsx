import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, PresentationControls } from "@react-three/drei";
import "./roofChoose.scss";
import { useEffect, useRef, useState } from "react";
import SceneWrap from "./SceneWrap";
import PanelChoose from "../panelChoose/PanelChoose";
import { IonIcon } from "@ionic/react";
import {
  gridOutline,
  grid,
  duplicateOutline,
  duplicate,
  caretUpOutline,
} from "ionicons/icons";
import SubstationChoose from "../substationChoose/SubstationChoose";
import { StoreState } from "../../redux/store";
import { useSelector } from "react-redux";
import { PanelType, SubstationType } from "../../redux/reduxTypes";
import { gsap } from "gsap";

function RoofChoose() {
  const state = useSelector((state: StoreState) => state);
  const stationInfoData = state.stationInfo.data;
  const proggress = state.proggress.data;
  const [switchMode, setSwitchMode] = useState<boolean>(true);
  const arrowRef = useRef<any>(null);

  const stationInfoDataOrientationAngle =
    stationInfoData.listOfPanelList[stationInfoData.substationIndex]
      .orientationAngle;


  useEffect(() => {
    if(!arrowRef.current)return

    gsap.to(arrowRef.current, {duration: 0.5, rotate: `${stationInfoDataOrientationAngle}deg`})

  }, [stationInfoDataOrientationAngle]);

  return (
    <div className="RoofChooseSection">
      <div className="RoofChooseSection_Left">
        {switchMode ? <PanelChoose /> : <SubstationChoose />}
      </div>

      <div className="RoofChooseSection_Right">
        <div className="RoofChooseSection_Right_SwitchMode">
          <div
            className={`RoofChooseSection_Right_SwitchMode_El ${
              switchMode ? "active" : ""
            }`}
            onClick={() => setSwitchMode(true)}
          >
            <IonIcon icon={switchMode ? grid : gridOutline} />
          </div>
          <div
            className={`RoofChooseSection_Right_SwitchMode_El ${
              !switchMode ? "active" : ""
            }`}
            onClick={() => setSwitchMode(false)}
          >
            <IonIcon icon={switchMode ? duplicateOutline : duplicate} />
          </div>
        </div>

        <div className="RoofChooseSection_Right_Compass">
          <div className="RoofChooseSection_Right_Compass_Arrow">
            <IonIcon
              ref={arrowRef}
              className="RoofChooseSection_Right_Compass_Arrow_Icon"
              icon={caretUpOutline}
            />
          </div>

          <div className="RoofChooseSection_Right_Compass_North ">N</div>
          <div className="RoofChooseSection_Right_Compass_Side">
            <div className="RoofChooseSection_Right_Compass_West">W</div>
            <div className="RoofChooseSection_Right_Compass_East">E</div>
          </div>
          <div className="RoofChooseSection_Right_Compass_South ">S</div>
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
            azimuth={[-Math.PI / 2.2, Math.PI / 2.2]}
            polar={[0, 0]}
            // snap={true}
            // config={{ mass: 1, tension: 1000, friction: 1 }}
          >
            {stationInfoData.listOfPanelList.map(
              (el: SubstationType, index: number) => {
                if (stationInfoData.substationIndex === index) {
                  return (
                    <SceneWrap
                      propPanelList={el.panelList}
                      angle={el.angle}
                      viewButton={switchMode}
                      key={`SISW${index}`}
                    />
                  );
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
