import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import "./roofChoose.scss";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import "./sceneWrap.scss";
import { PanelType } from "../../redux/reduxTypes";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { STATIONINFO_PANELLIST_SET } from "../../redux/redux_consts";

function SceneWrap({
  propPanelList,
  angle,
  viewButton,
}: {
  propPanelList: PanelType[];
  angle: number;
  viewButton: boolean;
}) {
  const dispatch = useDispatch();
  const dispatchStationInfoPanelListSet = (data: PanelType[]) => {
    dispatch({ type: STATIONINFO_PANELLIST_SET, payload: data });
  };

  const state = useSelector((state: StoreState) => state);
  const panelChoose = state.panelChoose;
  const currentPannel = panelChoose.panelList[panelChoose.currentPanelIndex];
  const stationInfo = state.stationInfo;
  const stationInfoData = state.stationInfo.data;
  const { panelGap, panelPosZ, buttonPosZ, panelSize } = stationInfo;
  /// =====================================================================

  const { camera } = useThree();
  const gltf = useLoader(GLTFLoader, "./models/solar_panel.glb");
  const [panelList, setPanelList] = useState<PanelType[]>([]);
  const [panelsAmount, setPanelsAmount] = useState<any>([0, 0, 0]);
  const [cameraPos, setCameraPos] = useState<number[]>([0, 0, 3]);
  const [isShowDelete, setIsShowDelete] = useState<string>("");
  const underPanelRef = useRef<any>(null);
  const groupWrapRef = useRef<any>(null);

  const getIndexOfPanelById = (propId: string, list: PanelType[]) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === propId) {
        return i;
      }
    }
  };

  const getPanelIdByPosition = (position: number[]) => {
    for (let i = 0; i < panelList.length; i++) {
      const currentPanel = panelList[i];

      if (
        Math.abs(currentPanel.position[0] - position[0]) < 0.05 &&
        Math.abs(currentPanel.position[1] - position[1]) < 0.05 &&
        Math.abs(currentPanel.position[2] - position[2]) < 0.05
      )
        return currentPanel.id;
    }
    return null;
  };

  const getNeighrsOfPanel = (position: number[]) => {
    const info = {
      top: getPanelIdByPosition([
        position[0],
        position[1] + panelSize[1] + panelGap,
        position[2],
      ]),
      right: getPanelIdByPosition([
        position[0] + panelSize[0] + panelGap,
        position[1],
        position[2],
      ]),
      bottom: getPanelIdByPosition([
        position[0],
        position[1] - panelSize[1] - panelGap,
        position[2],
      ]),
      left: getPanelIdByPosition([
        position[0] - panelSize[0] - panelGap,
        position[1],
        position[2],
      ]),
    };

    return info;
  };

  const addPanel = (
    direction: "top" | "right" | "bottom",
    parentEl: PanelType
  ) => {
    setPanelList((el: PanelType[]) => {
      const { id, parent, position, top, right, bottom, left } = parentEl;

      const list = el;
      const currentId = `${uuidv4()}`;

      const createPosition = () => {
        const indexOfPanel = getIndexOfPanelById(id, list)!;

        switch (direction) {
          case "top":
            list[indexOfPanel].top = currentId;
            return [
              position[0],
              position[1] + panelSize[1] + panelGap,
              position[2],
            ];
            break;
          case "right":
            list[indexOfPanel].right = currentId;
            return [
              position[0] + panelSize[0] + panelGap,
              position[1],
              position[2],
            ];
            break;
          case "bottom":
            list[indexOfPanel].bottom = currentId;
            return [
              position[0],
              position[1] - panelSize[1] - panelGap,
              position[2],
            ];
            break;
          // case "left":
          //   list[indexOfPanel].left = currentId;
          //   return [position[0] - panelSize[0], position[1], position[2]];
          //   break;
        }
      };
      const disableButtons = (currentPos: number[]) => {
        const panelNeighbors = getNeighrsOfPanel(currentPos);
      };

      //current position of created panel
      const currentPos = createPosition();
      const panelNeighbors = getNeighrsOfPanel(currentPos);
      // turn of add button if its nessesary
      const turnOfAddButtons = {
        top: panelNeighbors.top === null ? null : "disable",
        right:
          currentPos[1] === 0 && panelNeighbors.right === null
            ? null
            : "disable",
        bottom: "disable",
        left: "disable",
      };

      const newPanel = {
        id: currentId,
        parent: id,
        position: [currentPos![0], currentPos![1], currentPos![2]],
        top: turnOfAddButtons.top,
        right: turnOfAddButtons.right,
        bottom: turnOfAddButtons.bottom,
        left: turnOfAddButtons.left,
        panelTypeIndex: panelChoose.currentPanelIndex,
        color: currentPannel.color,
      };

      return [...list, newPanel];
    });
  };

  const deletePanel = (propId: string) => {
    setPanelList((plist: PanelType[]) => {
      return plist.filter((el: PanelType, index: number) => {
        if (
          el.id === propId &&
          (el.position[0] !== 0 || el.position[1] !== 0)
        ) {
          const neighborsOfCurrentPanel = getNeighrsOfPanel(el.position);

          // if parent exist and this panel have relations
          if (el.parent !== null) {
            const parentIndex = getIndexOfPanelById(el.parent!, panelList)!;

            const parentEl = panelList[parentIndex];

            if (parentEl.right === propId) panelList[parentIndex].right = null;
            if (parentEl.top === propId) panelList[parentIndex].top = null;
            // if(parentEl)
          }

          // if panel have children
          if (el.right !== null && el.right !== "disable") {
            panelList[getIndexOfPanelById(el.right, panelList)!].parent = null;
          }
          if (neighborsOfCurrentPanel.top !== null) {
            const indexOfTopChild = getIndexOfPanelById(
              neighborsOfCurrentPanel.top,
              panelList
            )!;

            if (panelList[indexOfTopChild].parent === el.id)
              panelList[indexOfTopChild].parent = null;
            // panelList[indexOfTopChild].top = null;
          }
          if (neighborsOfCurrentPanel.bottom !== null) {
            const indexOfTopChild = getIndexOfPanelById(
              neighborsOfCurrentPanel.bottom,
              panelList
            )!;

            if (panelList[indexOfTopChild].parent === el.id)
              panelList[indexOfTopChild].parent = null;
            panelList[indexOfTopChild].top = null;
          }
          if (neighborsOfCurrentPanel.left !== null && el.position[1] === 0) {
            const indexOfTopChild = getIndexOfPanelById(
              neighborsOfCurrentPanel.left,
              panelList
            )!;

            if (panelList[indexOfTopChild].parent === el.id)
              panelList[indexOfTopChild].parent = null;
            panelList[indexOfTopChild].right = null;
          }
        } else {
          return el;
        }
      });
    });
  };

  const ModelGlft = () => {
    return (
      <primitive
        object={gltf.scene.clone()}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        args={[panelSize[0], panelSize[1], panelSize[2]]}
      />
    );
  };

  const getAmountOfAllChildren = () => {
    const maxCoords = panelList.reduce(
      (accumulator: any, current: PanelType) => {
        return [
          Math.max(current.position[0], accumulator[0]),
          Math.max(current.position[1], accumulator[1]),
          Math.max(current.position[2], accumulator[2]),
        ];
      },
      [0, 0, 0]
    );

    return [
      Math.round(maxCoords[0] / (panelSize[0] + panelGap)) + 1,
      Math.round(maxCoords[1] / (panelSize[1] + panelGap)) + 1,
      Math.round(maxCoords[2] / (panelSize[2] + panelGap)),
    ];
  };

  const changeColorPanelTypeIndex = () => {
    setPanelList((list: PanelType[]) => {
      const copyList = list;
      copyList[getIndexOfPanelById(isShowDelete, list)!].panelTypeIndex =
        currentPannel.panelTypeIndex;
      copyList[getIndexOfPanelById(isShowDelete, list)!].color =
        currentPannel.color;

      return copyList;
    });
  };

  const PanelObject = (props: PanelType) => {
    const {
      id,
      parent,
      position,
      top,
      right,
      bottom,
      left,
      color,
      panelTypeIndex,
    } = props;

    return (
      <group>
        <mesh
          onClick={() => setIsShowDelete(id)}
          position={[position[0], position[1], position[2]]}
        >
          <boxGeometry args={[panelSize[0], panelSize[1], panelSize[2]]} />
          <meshStandardMaterial color="red" transparent opacity={0} />

          <ModelGlft />
        </mesh>

        {viewButton ? (
          <Html
            position={[
              position[0] + panelSize[0] / 2 - 0.2,
              position[1] + panelSize[1] / 2 - 0.2,
              buttonPosZ,
            ]}
          >
            <div
              className="SceneWrap_ColorMarker"
              style={{ backgroundColor: color }}
            ></div>
          </Html>
        ) : null}

        {viewButton &&
        isShowDelete === id &&
        (position[0] !== 0 || position[1] !== 0) ? (
          <Html position={[position[0], position[1], buttonPosZ]}>
            <div
              className="SceneWrap_Button SceneWrap_ButtonDelelete"
              onPointerLeave={() => setIsShowDelete("")}
              onClick={() => deletePanel(id)}
            >
              +
            </div>
          </Html>
        ) : null}
        {viewButton && top === null ? (
          <Html
            occlude={[underPanelRef]}
            position={[position[0], position[1] + panelSize[1], buttonPosZ]}
          >
            <div
              className="SceneWrap_Button SceneWrap_ButtonTop"
              onClick={() => {
                addPanel("top", props);
              }}
            >
              +
            </div>
          </Html>
        ) : null}
        {viewButton && right === null ? (
          <Html
            occlude={[underPanelRef]}
            position={[position[0] + panelSize[0], position[1], buttonPosZ]}
          >
            <div
              onClick={() => {
                addPanel("right", props);
              }}
              className="SceneWrap_Button SceneWrap_ButtonRight"
            >
              +
            </div>
          </Html>
        ) : null}
      </group>
    );
  };

  useFrame(() => {
    if (!underPanelRef.current && !groupWrapRef.current) return;

    // change scale on under panel
    underPanelRef.current.scale.x = panelsAmount[0] * (panelSize[0] + panelGap);
    underPanelRef.current.scale.y = panelsAmount[1] * (panelSize[0] + panelGap);

    // change position of undel panel
    underPanelRef.current.position.x =
      ((panelsAmount[0] - 1) * (panelSize[0] + panelGap)) / 2;
    underPanelRef.current.position.y =
      ((panelsAmount[1] - 1) * (panelSize[1] + panelGap)) / 2;

    groupWrapRef.current.position.x = underPanelRef.current.position.x * -1;
    groupWrapRef.current.position.y = underPanelRef.current.position.y * -1;
    gsap.to(groupWrapRef.current.rotation, {
      x: -(angle * (Math.PI / 180)),
    });
    // set camera position
    gsap.to(camera.position, {
      x: cameraPos[0],
      y: cameraPos[1],
      z:
        cameraPos[2] +
        (panelsAmount[0] > panelsAmount[1]
          ? panelsAmount[0] * 1.5
          : panelsAmount[1] * 1.5),
    });
  });

  useEffect(() => {
    setPanelList((prevValue: PanelType[]) => {
      const result =
        propPanelList.length === 0
          ? [
              {
                id: `${uuidv4()}${stationInfoData.substationIndex}`,
                parent: null,
                position: [0, 0, panelPosZ],
                top: null,
                right: null,
                bottom: "disable",
                left: "disable",
                panelTypeIndex: panelChoose.currentPanelIndex,
                color: currentPannel.color,
              },
            ]
          : propPanelList;

      return result;
    });
  }, [stationInfoData.substationIndex]);

  useEffect(() => {
    groupWrapRef.current.rotation.x = -(angle * (Math.PI / 180));

    setPanelsAmount(getAmountOfAllChildren());
    dispatchStationInfoPanelListSet(panelList);
  }, [panelList]);
  return (
    <mesh ref={groupWrapRef}>
      <mesh ref={underPanelRef}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#ededed" transparent opacity={0} />
      </mesh>

      {panelList.map((e: PanelType, index: number) => {
        return <PanelObject {...e} key={`panel_${index}`} />;
      })}
    </mesh>
  );
}

export default SceneWrap;
