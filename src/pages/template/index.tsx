import React, { useLayoutEffect, useRef, useContext, useState } from "react";

import { fabric } from "fabric";
import { useDispatch } from "react-redux";

import { TemplateContainer } from "../../components/styles/Template";
import MenuBar from "../../components/MenuBar";
import { init, CanvasCTX } from "../../Canvas";
import {
  ObjectTypes,
  openContextMenu,
} from "../../Canvas/ContextMenu/contextMenuSlice";

// All things for the canvas will be added here
const Template = () => {
  const { setCanvas } = useContext(CanvasCTX);

  const canvRef = useRef<any>(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas("canvas2", {
      height: canvRef.current?.offsetHeight,
      width: canvRef.current?.offsetWidth,
      fireRightClick: true,
      fireMiddleClick: true,
      stopContextMenu: true,
      backgroundColor: "white",
      backgroundImage: undefined,
    });
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

    setCanvas(canvas);
    // @ts-ignore
    document.getElementById("canvas2").fabric = canvas;

    dispatch(init("canvas2"));
  }, []);
  return (
    <TemplateContainer>
      <div
        ref={canvRef}
        style={{
          position: "relative",
          margin: "auto",
          height: "70vh",
          width: "50%",
        }}
      >
        <canvas id="canvas2" style={{ width: "100%", height: "100%" }}>
          canvas
        </canvas>
      </div>

      <MenuBar />
    </TemplateContainer>
  );
};

export default Template;
