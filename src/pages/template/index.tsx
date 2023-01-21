import React, { useLayoutEffect, useRef, useContext, useState } from "react";

import { fabric } from "fabric";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { TemplateContainer } from "../../components/styles/Template";
import MenuBar from "../../components/MenuBar";
import { init, CanvasCTX } from "../../Canvas";
import queries from "../../services/queries/templates";
// import {
//   ObjectTypes,
//   openContextMenu,
// } from "../../Canvas/ContextMenu/contextMenuSlice";

// All things for the canvas will be added here
const Template = () => {
  const [searchParams] = useSearchParams();
  // console.log("search Params", searchParams.get("width"));
  const { setCanvas } = useContext(CanvasCTX);

  const [dimensions, setDimensions] = useState<{ width: any; height: any }>({
    width: null,
    height: null,
  });

  const canvRef = useRef<any>(null);
  const dispatch = useDispatch();

  function zoomCanvas(canvas: fabric.Canvas, factorX: any, factorY: any) {
    canvas.setHeight(canvas.getHeight() * factorX);
    canvas.setWidth(canvas.getWidth() * factorY);
    if (canvas.backgroundImage) {
      // Need to scale background images as well
      let bi = canvas.backgroundImage;
      canvas.setDimensions({
        width: canvas.getWidth() * factorY,
        height: canvas.getHeight() * factorX,
      });
    }
    let objects = canvas.getObjects();

    let tcounter = 0;

    for (let i in objects) {
      tcounter++;
      let scaleX = objects[i].scaleX;
      let scaleY = objects[i].scaleY;
      let left = objects[i].left;
      let top = objects[i].top;

      let tempScaleX = scaleX || 1 * factorX;
      let tempScaleY = scaleY || 1 * factorY;
      let tempLeft = left || 1 * factorX;
      let tempTop = top || 1 * factorY;

      objects[i].scaleX = tempScaleX;
      objects[i].scaleY = tempScaleY;
      objects[i].left = tempLeft;
      objects[i].top = tempTop;

      objects[i].setCoords();
    }
    canvas.renderAll();
    canvas.calcOffset();
  }

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
        <canvas id="canvas2">canvas</canvas>
      </div>

      <MenuBar />
    </TemplateContainer>
  );
};

export default Template;
