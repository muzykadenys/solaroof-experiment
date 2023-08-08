import * as THREE from "three";
import {
  OrbitControls,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./earthPreview.scss";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ModelGlft = React.memo((props: any) => {
  const gltf = useLoader(GLTFLoader, "../models/earth_2.glb");
  const gltf_moon = useLoader(GLTFLoader, "../models/moon.glb");
  const earthRef = useRef<any>();
  const moonRef = useRef<any>();
  const earthRotation = useRef<any>(-Math.PI * 1.2);
  let orbitValue = 0;
  const orbitSpeed = 0.005;
  const orbitRadius = 3;

  // Traverse through the model and adjust properties
  const adjustMaterialProperties = (node: any) => {
    if (node.isMesh) {
      // Enable casting and receiving shadows
      node.castShadow = true;
      node.receiveShadow = true;

      //   Adjust metalness of materials
      if (node.material) {
        node.material.metalness = 0; // Adjust the metalness value as needed
        node.material.roughness = 3; // Adjust the metalness value as needed
      }
    }
  };

  // Traverse through the model hierarchy
  gltf.scene.traverse(adjustMaterialProperties);
  gltf_moon.scene.traverse(adjustMaterialProperties);

  useFrame(() => {
    if (
      !earthRef.current &&
      !moonRef.current &&
      !earthRotation.current &&
      props.isShow
    )
      return;

    earthRef.current.rotation.y += 0.005;
    // earthRef.current.rotation.y = earthRotation.current;
    // earthRotation.current = earthRotation.current + 0.005;
    orbitValue += orbitSpeed;
    moonRef.current.position.x = Math.cos(orbitValue) * orbitRadius;
    moonRef.current.position.z = Math.sin(orbitValue) * orbitRadius;

    moonRef.current.rotation.y += 0.005;
  });

  return (
    <group>
      <primitive
        ref={earthRef}
        object={gltf.scene}
        // scale={0.3}
        scale={1.5}
        rotation={[Math.PI / 4, -Math.PI * 1.9, 0]}
      />

      <group rotation={[0, 0, Math.PI / 8]}>
        <primitive
          ref={moonRef}
          object={gltf_moon.scene}
          scale={0.02}
          // position={[2, 0,0]}
        />
      </group>
    </group>
  );
});

function EarthPreview() {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [startFade, setStartFade] = useState<boolean>(false);
  const earthWrapRef = useRef<any>();

  const CameraAnimate = React.memo(() => {
    const { camera } = useThree();

    useFrame(() => {
      if (startFade) {
        if (camera.position.z > 1.7) camera.position.z -= 0.03;
      }
    });

    return null;
  });

  useEffect(() => {
    setTimeout(() => setStartFade(true), 3000);
  }, []);

  useEffect(() => {
    if (!earthWrapRef.current) return;
    if (startFade) {
      earthWrapRef.current.classList.add("EarthPreviewSection_active");
      setTimeout(() => setIsShow(false), 800);
    }
  }, [startFade]);

  return (
    <>
      {isShow ? (
        <div className="EarthPreviewSection" ref={earthWrapRef}>
          <Canvas
            shadows
            // onClick={() => setStartFade(true)}
          >
            <OrbitControls />
            <ambientLight />
            {/* <pointLight position={[10, 5, 20]} intensity={1} castShadow /> */}
            <directionalLight
              position={[1, 1, 3.2]}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-far={10}
            />
            <fog attach="fog" args={["#000000", 3.2, 8]} />

            {/* <PresentationControls
              global
              azimuth={[-Math.PI / 2.2, Math.PI / 2.2]}
              polar={[0, 0]}
                
            >
              
            </PresentationControls> */}

            <ModelGlft isShow={isShow} />
            <CameraAnimate />
          </Canvas>
        </div>
      ) : null}
    </>
  );
}

export default EarthPreview;
