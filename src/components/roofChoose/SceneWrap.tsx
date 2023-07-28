import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import "./roofChoose.scss";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type panelType = {
  id: string;
  parent: string | null;
  position: number[];
  top: string | null;
  right: string | null;
  bottom: string | null;
  left: string | null;
};

function SceneWrap() {
  const panelGap = 0.05;
  const panelPosZ = 0.1;
  const panelSize = [0.8, 0.8, 0.1];
  const [panelList, setPanelList] = useState<panelType[]>([
    {
      id: `${uuidv4()}`,
      parent: null,
      position: [0, 0, panelPosZ],
      top: null,
      right: null,
      bottom: null,
      left: null,
    },
  ]);

  const underPanelRef = useRef<any>(null);

  const getIndexOfPanel = (propId: string, list: panelType[]) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === propId) {
        return i;
      }
    }
  };

  const addPanel = (direction: "top" | "right", parentEl: panelType) => {
    setPanelList((el: panelType[]) => {
      const { id, parent, position, top, right, bottom, left } = parentEl;

      const list = el;
      const currentId = `${uuidv4()}`;

      const createPosition = () => {
        const indexOfPanel = getIndexOfPanel(id, list)!;

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
          // case "bottom":
          //   list[indexOfPanel].bottom = currentId;
          //   return [position[0], position[1] - panelSize[1], position[2]];
          //   break;
          // case "left":
          //   list[indexOfPanel].left = currentId;
          //   return [position[0] - panelSize[0], position[1], position[2]];
          //   break;
        }
      };

      const currentPos = createPosition();

      // turn of add button if its nessesary
      const turnOfAddButtons = {
        top: null,
        right: currentPos[1] === 0 ? null : "disable",
        bottom: null,
        left: null,
      };

      const newPanel = {
        id: currentId,
        parent: id,
        position: [currentPos![0], currentPos![1], currentPos![2]],
        top: turnOfAddButtons.top,
        right: turnOfAddButtons.right,
        bottom: turnOfAddButtons.bottom,
        left: turnOfAddButtons.left,
      };

      return [...list, newPanel];
    });
  };

  const deletePanel = (propId: string) => {
    setPanelList((plist: panelType[]) => {
      return plist.filter((el: panelType, index: number) => {
        if (
          el.id === propId &&
          (el.position[0] !== 0 || el.position[1] !== 0)
        ) {
          // if parent exist and this panel have relations
          if (el.parent !== null) {
            const parentIndex = getIndexOfPanel(el.parent!, panelList)!;

            const parentEl = panelList[parentIndex];

            if (parentEl.right === propId) panelList[parentIndex].right = null;
            if (parentEl.top === propId) panelList[parentIndex].top = null;
          }

          // if panel have children
          if (el.right !== null && el.right !== "disable") {
            panelList[getIndexOfPanel(el.right, panelList)!].parent = null;
          }
          if (el.top !== null && el.top !== "disable") {
            panelList[getIndexOfPanel(el.top, panelList)!].parent = null;
          }
        } else {
          return el;
        }
      });
    });
  };

  const PanelObject = (props: panelType) => {
    const { id, parent, position, top, right, bottom, left } = props;

    return (
      <group>
        <mesh
          onClick={() => deletePanel(id)}
          position={[position[0], position[1], position[2]]}
        >
          <boxGeometry args={[panelSize[0], panelSize[1], panelSize[2]]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {top === null ? (
          <Html
            occlude={[underPanelRef]}
            position={[position[0], position[1] + 0.5, 0.2]}
          >
            <div
              onClick={() => {
                addPanel("top", props);
              }}
              style={{
                cursor: "pointer",
                backgroundColor: "white",
                fontSize: "30px",
                borderRadius: 333,
              }}
            >
              +
            </div>
          </Html>
        ) : null}
        {right === null ? (
          <Html
            occlude={[underPanelRef]}
            position={[position[0] + 0.5, position[1], 0.2]}
          >
            <div
              onClick={() => {
                addPanel("right", props);
              }}
              style={{
                cursor: "pointer",
                backgroundColor: "white",
                fontSize: "30px",
                borderRadius: 333,
              }}
            >
              +
            </div>
          </Html>
        ) : null}
      </group>
    );
  };

  // useFrame(() => {
  //   if (!underPanelRef.current) return;

  //   underPanelRef.current.scale.x = 3;
  // });

  return (
    <group>
      <mesh ref={underPanelRef}>
        <boxGeometry args={[1, 1, 0.2]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {panelList.map((e: panelType, index: number) => {
        return <PanelObject {...e} key={`panel_${index}`} />;
      })}
    </group>
  );
}

export default SceneWrap;
