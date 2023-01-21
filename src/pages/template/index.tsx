import React, {
  useLayoutEffect,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";

import { fabric } from "fabric";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { TemplateContainer } from "../../components/styles/Template";
import MenuBar from "../../components/MenuBar";
import { init, CanvasCTX } from "../../Canvas";
import {
  ObjectTypes,
  openContextMenu,
} from "../../Canvas/ContextMenu/contextMenuSlice";

// All things for the canvas will be added here
const Template = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log("search Params", searchParams.get("width"));
  const { setCanvas } = useContext(CanvasCTX);

  const [dimensions, setDimensions] = useState<{ width: any; height: any }>({
    width: null,
    height: null,
  });

  const canvRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get("width") || searchParams.get("height")) {
      setDimensions({
        width: searchParams.get("width") || "100%",
        height: searchParams.get("height") || "100%",
      });
    } else {
    }
  }, [searchParams.get("width"), searchParams.get("height")]);

  useLayoutEffect(() => {
    // TODO: if not new template, load from canvas

    const canvas = new fabric.Canvas("canvas2", {
      height: canvRef.current?.offsetHeight,
      width: canvRef.current?.offsetWidth,
      fireRightClick: true,
      fireMiddleClick: true,
      stopContextMenu: true,
      backgroundColor: "white",
      backgroundImage: undefined,
    });
    // const canvas = new fabric.Canvas("canvas2", {
    //   height: canvRef.current?.offsetHeight,
    //   width: canvRef.current?.offsetWidth,
    //   fireRightClick: true,
    //   fireMiddleClick: true,
    //   stopContextMenu: true,
    //   backgroundColor: "white",
    //   backgroundImage: undefined,
    // });
    // canvas.loadFromJSON(
    //   '{"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(0, 0, 0, 0)"}',
    //   () => {}
    // );
    canvas.renderAll();
    // canvas.on("mouse:down", (event) => {
    //   // double click action
    //   if (event.button === 3) {
    //     if (event.target) {
    //       const { x, y } = canvas.getPointer(event.e);
    //       dispatch(
    //         openContextMenu({
    //           position: {
    //             // @ts-ignore
    //             left: canvRef.current?.offsetLeft + x,
    //             top: y,
    //           },
    //           type: event.target.type as ObjectTypes,
    //           objectID: event.target.name,
    //         })
    //       );
    //     }
    //   }
    // });
    canvas.on("object:modified", function (event) {
      console.log("canvas changed");
      // event.target
    });

    setCanvas(canvas);
    // @ts-ignore
    document.getElementById("canvas2").fabric = canvas;

    dispatch(init("canvas2"));
  }, []);

  // if (dimensions.height === null || dimensions.width === null) return null;
  return (
    <TemplateContainer>
      <div ref={canvRef} className="canvas-container">
        <canvas id="canvas2" style={{ border: "1px solid red" }}>
          canvas
        </canvas>
      </div>

      <MenuBar />
    </TemplateContainer>
  );
};

export default Template;
