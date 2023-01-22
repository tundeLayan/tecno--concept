import React, {
  useLayoutEffect,
  useRef,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { fabric } from "fabric";
import { useDispatch } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";
import debounce from "lodash.debounce";

import { TemplateContainer } from "../../components/styles/Template";
import MenuBar from "../../components/MenuBar";
import {
  init,
  CanvasCTX,
  deserialize,
  deleteSelectedLayer,
  moveObjectFoward,
  moveObjectBackward,
} from "../../Canvas";
import queries from "../../services/queries/templates";
import { template1 } from "../../Templates/template1";
import { template2 } from "../../Templates/template2";
import { template3 } from "../../Templates/template3";
// import {
//   ObjectTypes,
//   openContextMenu,
// } from "../../Canvas/ContextMenu/contextMenuSlice";

const parseToJson = (str: string) => {
  try {
    let obj = JSON.parse(str); // this is how you parse a string into JSON
    return obj;
  } catch (ex) {
    console.error(ex);
  }
};

// All things for the canvas will be added here
const Template = () => {
  const [searchParams] = useSearchParams();
  const { setCanvas, canvas } = useContext(CanvasCTX);
  const params = useParams();

  const { data } = queries.readOne(params.id);
  const { mutate } = queries.update();

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

  function isEmptyObject(obj: any) {
    return JSON.stringify(obj) === "{}";
  }

  const debouncedSearch = useCallback(debounce(mutate, 1500), []);

  function handleSubmit() {
    console.log("data", data);
    let dataObj = {
      title: searchParams.get("name") || "",
      media_hash: JSON.stringify({ objects: canvas?.toJSON().objects }),
      _method: "PUT",
      // background: canvas.toJSON()?.background
    };
    mutate(dataObj, params?.id || "");
  }
  useLayoutEffect(() => {
    // TODO: if not new template, load from canvas
    // console.log("media hash", parseToJson(data?.data?.media_hash));
    const canvas = new fabric.Canvas("canvas2", {
      height: canvRef.current?.offsetHeight,
      width: canvRef.current?.offsetWidth,
      fireRightClick: true,
      fireMiddleClick: true,
      stopContextMenu: true,
      backgroundColor: "white",
      backgroundImage: undefined,
      preserveObjectStacking: true,
    });

    canvas.renderAll();

    let canvasWrapper = document.getElementById("canvas-wrap") as any;
    canvasWrapper.tabIndex = 1000;
    canvasWrapper.addEventListener(
      "keydown",
      (event: any) => {
        // console.log("event.keyCode", event.keyCode);
        if (event.keyCode === 8) {
          dispatch(deleteSelectedLayer());
        }
        if (event.keyCode === 39) {
          dispatch(moveObjectFoward());
        }
        if (event.keyCode === 37) {
          dispatch(moveObjectBackward());
        }
        // if up arrow, move selected object front
        // if down arrow, move selected object back
      },
      false
    );

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
      // handleSubmit();
    });

    setCanvas(canvas);
    // @ts-ignore
    document.getElementById("canvas2").fabric = canvas;

    dispatch(init("canvas2"));
  }, []);

  useEffect(() => {
    if (data && !isEmptyObject(parseToJson(data?.data?.media_hash))) {
      dispatch(deserialize({ data: data?.data?.media_hash }));
      // dispatch(deserialize({ data: JSON.stringify(template1) }));
    }
    return () => {};
  }, [data]);

  // if (dimensions.height === null || dimensions.width === null) return null;

  return (
    <TemplateContainer>
      <div ref={canvRef} className="canvas-container" id="canvas-wrap">
        <canvas id="canvas2">canvas</canvas>
      </div>
      <div style={{ width: "10%", margin: "auto" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <MenuBar />
    </TemplateContainer>
  );
};

export default Template;
