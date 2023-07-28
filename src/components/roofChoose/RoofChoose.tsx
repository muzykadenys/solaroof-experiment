import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import "./roofChoose.scss";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SceneWrap from "./SceneWrap";

function RoofChoose() {
  return (
    <div className="RoofChooseSection">
      {/* <div className="RoofChooseSection_Left"></div> */}

      <div className="RoofChooseSection_Right">
        <Canvas
          camera={{
            position: [3, 2, 3],
            fov: 75,
          }}
        >
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, -10]} />

          <SceneWrap />
        </Canvas>
      </div>
    </div>
  );
}

export default RoofChoose;
