import React, { useLayoutEffect, useRef, useContext } from "react";
import { fabric } from "fabric";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { init, CanvasCTX } from ".";
import { ObjectTypes, openContextMenu } from "./ContextMenu/contextMenuSlice";

export default function CanvasApp() {
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
    const textbox = new fabric.Textbox("New text", {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 28,
      fill: "black",
      name: "jek",
    });

    canvas.centerObject(textbox);
    canvas.add(textbox);
    canvas.renderAll();
    canvas.on("mouse:down", (event) => {
      // double click action
      if (event.button === 3) {
        if (event.target) {
          const { x, y } = canvas.getPointer(event.e);
          dispatch(
            openContextMenu({
              position: {
                // @ts-ignore
                left: canvRef.current?.offsetLeft + x,
                top: y,
              },
              type: event.target.type as ObjectTypes,
              objectID: event.target.name,
            })
          );
        }
      }
    });

    setCanvas(canvas);
    // @ts-ignore
    document.getElementById("canvas2").fabric = canvas;

    dispatch(init("canvas2"));
  }, []);

  return (
    <div
      ref={canvRef}
      style={{
        position: "relative",
        margin: "auto",
        height: "80vh",
        width: "100%",
        border: "1px solid green",
      }}
    >
      <canvas id="canvas2" style={{ border: "3px solid red" }}>
        canvas
      </canvas>
    </div>
  );
}
