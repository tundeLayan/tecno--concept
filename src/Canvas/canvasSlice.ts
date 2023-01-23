import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export type CanvasState = {
  canvasId: string;
  elements: {
    [x: string]: {
      type: "text" | "image";
      id: string;
    };
  };
  elemIndexes: number[];
  canvasObjects: fabric.Object[];
};

export const getCanvas = (id: string): { fabric: fabric.Canvas } => {
  const elem = document.getElementById(id) as unknown as {
    fabric: fabric.Canvas;
  };

  return elem;
};
const initialState: CanvasState = {
  canvasId: "",
  elements: {},
  elemIndexes: [],
  canvasObjects: [],
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<string>) => {
      state.canvasId = action.payload;
    },
    reset: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.clear();
      canvas.requestRenderAll();
    },
    addText: (state, { payload }) => {
      // TODO: handle color, fontSize, bold, Italize, underline
      const { fabric: canvas } = getCanvas(state.canvasId);
      // console.log("payload", payload);
      const id = uuidv4();
      const textbox = new fabric.Textbox("New text", {
        left: 50,
        top: 50,
        width: 200,
        fontSize: payload.selectedFontSize,
        fill: payload.selectedColor,
        name: id,
        underline: payload.isUnderlined,
        fontWeight: payload.isBold ? "bold" : "normal",
        fontStyle: payload.isItalized ? "italic" : "normal",
        textAlign: payload.textAlign,
      });

      canvas.centerObject(textbox);
      canvas.add(textbox);
      canvas.requestRenderAll();
      state.canvasObjects = canvas
        .getObjects()
        .map((i) => i.toObject(["name", "type"]));
    },
    addTextWithFont: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      let fonts = [
        "Pacifico",
        "Aero",
        "Arial",
        "Futura",
        "Garamond",
        "Montserrat",
        "Silka",
        "Times New Roman",
      ];
      const id = uuidv4();
      const textbox = new fabric.Textbox("New text", {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 28,
        fill: "black",
        name: id,
      });

      canvas.centerObject(textbox);
      canvas.add(textbox);
      canvas.requestRenderAll();
      state.canvasObjects = canvas
        .getObjects()
        .map((i) => i.toObject(["name", "type"]));
    },
    addImgURL: (state, action: PayloadAction<string>) => {
      const elem = getCanvas(state.canvasId);
      if (elem && elem.fabric) {
        const { fabric: canvas } = elem;

        const imgElem = action.payload;
        // const id = uuidv4();
        // const options: fabric.IImageOptions = {
        //   name: id,
        // };

        fabric.Image.fromURL(
          action.payload,
          (image) => {
            // @ts-ignore
            if (canvas?.width < image.width) {
              // @ts-ignore
              const ratio = canvas.width / image.width;
              // @ts-ignore
              image.scaleToWidth(canvas.width);
              // @ts-ignore
              image.scaleToHeight(image.height * ratio);
              // @ts-ignore
            } else if (canvas.height < imgElem.naturalHeight) {
              // @ts-ignore
              const ratio = canvas.height / image.height;
              // @ts-ignore
              image.scaleToHeight(canvas.height);
              // @ts-ignore
              image.scaleToWidth(image.width * ratio);
            }
            canvas.centerObject(image);
            canvas.add(image);
            canvas.requestRenderAll();
          },
          {
            crossOrigin: "anonymous",
          }
        );

        state.canvasObjects = canvas
          .getObjects()
          .map((i) => i.toObject(["name", "type"]));
      }
    },
    addImg: (state, action: PayloadAction<HTMLImageElement>) => {
      const elem = getCanvas(state.canvasId);
      if (elem && elem.fabric) {
        const { fabric: canvas }: { fabric: any } = elem;
        const imgElem = action.payload;
        const id = uuidv4();
        const options: fabric.IImageOptions = {
          name: id,
        };
        // @ts-ignore
        const image = new fabric.Image(action.payload, options);
        if (
          canvas?.width < imgElem.naturalWidth &&
          canvas.height < imgElem.naturalHeight
        ) {
          image.scale(0.1);
          // @ts-ignore
          // const ratio = canvas.width / imgElem.naturalWidth;
          // options.width = canvas.width;
          // options.height = imgElem.naturalHeight * ratio;
          // @ts-ignore
        }
        // else if (canvas.height < imgElem.naturalHeight) {
        //   // @ts-ignore
        //   // const ratio = canvas.height / imgElem.naturalHeight;
        //   // options.height = canvas.height;
        //   // options.width = imgElem.naturalWidth * ratio;
        // }

        canvas.centerObject(image);
        canvas.add(image);
        canvas.requestRenderAll();
        state.canvasObjects = canvas
          .getObjects()
          .map((i: any) => i.toObject(["name", "type"]));
      }
    },
    deleteItem: (state, { payload: id }: PayloadAction<string>) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const item = canvas.getObjects().find((obj) => obj.name === id);
      if (item) {
        canvas.remove(item);
        canvas.requestRenderAll();
        state.canvasObjects = canvas
          .getObjects()
          .map((i) => i.toObject(["name", "type"]));
      }
    },
    deleteSelectedLayer: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const item = canvas.getActiveObject();
      if (item) {
        canvas.remove(item);
        canvas.requestRenderAll();
        state.canvasObjects = canvas
          .getObjects()
          .map((i) => i.toObject(["name", "type"]));
      }
    },
    selectLayer: (state, { payload: id }: PayloadAction<string>) => {
      // console.log("layer selected");
      const { fabric: canvas } = getCanvas(state.canvasId);
      const item = canvas.getObjects().find((obj) => obj.name === id);
      if (item) {
        canvas.setActiveObject(item);
        canvas.requestRenderAll();
      }
    },
    changeTextColor: (state, { payload }: PayloadAction<string>) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.getActiveObject()?.set("fill", payload);
      canvas.requestRenderAll();
    },
    textAlignFn: (state, { payload }: PayloadAction<string>) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.getActiveObject()?.setOptions({ textAlign: payload });
      canvas.requestRenderAll();
    },
    setFontSize: (state, { payload }) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.getActiveObject()?.set("");
      canvas.requestRenderAll();
    },
    setFontFamily: (state, { payload }) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.getActiveObject()?.setOptions({ fontFamily: payload });
      let myfont = new FontFaceObserver(payload);
      myfont
        .load()
        .then(() => {
          canvas.getActiveObject()?.setOptions({ fontFamily: payload });
          canvas.requestRenderAll();
        })
        .catch(function (e) {
          console.log(e);
          alert("font loading failed " + payload.fontFamily);
        });
    },
    setToBold: () => {},
    setToItalic: () => {},
    underlineText: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      if (!canvas.getActiveObject()) return;
    },
    serialize: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      // console.log("canvas.toJSON()", canvas.toJSON());
      // console.log("stringify canvas.toJSON()", canvas.toObject());
    },
    deserialize: (state, { payload }) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      // console.log("payload", payload);
      // if(payload.data){
      canvas.loadFromJSON(payload.data, () => {});
      // // }
      canvas.renderAll();
    },
    zoom: (state, { payload }) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.setZoom(payload.zoomValue);
    },
    setBackgroundImage: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.backgroundColor = "pink";
      canvas.requestRenderAll();
      // fabric.Image.fromURL(
      //   "http://fabricjs.com/assets/honey_im_subtle.png",
      //   (img: fabric.Image) => {
      //     img.set({
      //       width: canvas.width,
      //       height: canvas.height,
      //       originX: "left",
      //       originY: "top",
      //     });
      //     canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      //   }
      // );

      // canvas.requestRenderAll();
    },
    moveObjectFoward: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.getActiveObject()?.bringToFront();
      canvas.getActiveObject()?.bringForward(true);
      canvas.requestRenderAll();
    },
    moveObjectBackward: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.getActiveObject()?.sendToBack();
      canvas.getActiveObject()?.sendBackwards(true);
      canvas.requestRenderAll();
    },
  },
});

export const {
  init,
  selectLayer,
  addText,
  addImg,
  addImgURL,
  deleteItem,
  deleteSelectedLayer,
  reset,
  changeTextColor,
  setFontSize,
  setFontFamily,
  setToBold,
  setToItalic,
  underlineText,
  zoom,
  setBackgroundImage,
  serialize,
  deserialize,
  moveObjectFoward,
  moveObjectBackward,
  textAlignFn,
} = canvasSlice.actions;
export const canvasReducer = canvasSlice.reducer;
