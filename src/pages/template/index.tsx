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
import { init, CanvasCTX, deserialize } from "../../Canvas";
import queries from "../../services/queries/templates";
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
  const { setCanvas } = useContext(CanvasCTX);
  const params = useParams();

  const { isLoading, data, isSuccess, isFetching } = queries.readOne(params.id);
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

  const debouncedSearch = useCallback(debounce(mutate, 1000), []);

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
    canvas.on("object:modified", function (event) {
      let dataObj = {
        title: searchParams.get("name") || "",
        media_hash: JSON.stringify({ objects: canvas.toJSON().objects }),
        _method: "PUT",
        // background: canvas.toJSON()?.background
      };
      debouncedSearch(dataObj, params?.id || "");
    });

    setCanvas(canvas);
    // @ts-ignore
    document.getElementById("canvas2").fabric = canvas;

    dispatch(init("canvas2"));
  }, []);
  useEffect(() => {
    if (data && !isEmptyObject(parseToJson(data?.data?.media_hash))) {
      // console.log("not empty", data?.data?.media_hash);
      dispatch(deserialize({ data: data?.data?.media_hash }));
    }
    return () => {};
  }, [data]);

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
