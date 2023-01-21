import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CirclePicker } from "react-color";
import Select from "react-dropdown-select";

import { MenuBarStyle } from "./styles/MenuBar";
import { DarkButton } from "./styles/Button";
import {
  AddImageIcon,
  AddTextIcon,
  ZoomInIcon,
  ZoomOutIcon,
  RightAlign,
  LeftAlign,
  CenterAlign,
  Italize,
  Bold,
  Underline,
} from "./svgs";
import RenderIf from "../utils";
import { RootState } from "../redux/store";
import {
  addText,
  getCanvas,
  reset,
  selectLayer,
  changeTextColor,
  setFontSize,
  setFontFamily,
  setToBold,
  setToItalic,
  underlineText,
  zoom,
  setBackgroundImage,
  serialize,
} from "../Canvas";
import ImageUploadButton from "./AddImage";

const fonts: Array<{ label: string; value: string }> = [
  { label: "Aero", value: "Aero" },
  { label: "Arial", value: "Arial" },
  { label: "Futura", value: "Futura" },
  { label: "Garamond", value: "Garamond" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Silka", value: "Silka" },
  { label: "Times New Roman", value: "Times New Roman" },
];

const fontSizes: Array<{ label: number; value: number }> = [
  { label: 12, value: 12 },
  { label: 13, value: 13 },
  { label: 14, value: 14 },
  { label: 16, value: 16 },
  { label: 17, value: 17 },
  { label: 18, value: 18 },
  { label: 20, value: 20 },
  { label: 22, value: 22 },
  { label: 24, value: 24 },
  { label: 26, value: 26 },
  { label: 28, value: 28 },
  { label: 30, value: 30 },
];

const colorList: Array<string> = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  // "#cddc39",
  // "#ffeb3b",
  // "#ffc107",
  // "#ff9800",
  // "#ff5722",
  // "#795548",
  // "#607d8b",
];

const MenuBar = () => {
  const dispatch = useDispatch();
  const elem = useSelector((state: RootState) =>
    getCanvas(state.canvas.canvasId)
  );

  // color pallette
  const [showColorPallete, setShowColorPallete] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");

  // fonts(family, size)
  const [selectedFontSize, setSelectedFontSize] = useState(28);
  const [showFonts, setShowFonts] = useState(false);

  //
  const [isBold, setIsBold] = useState(false);
  const [isItalized, setIsItalized] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  const [showTextAlign, setShowTextAlign] = useState(false);
  const [textAlign, setTextAlign] = useState<"center" | "left" | "right">(
    "left"
  );

  const [zoomValue, setZoomValue] = useState(1);

  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    dispatch(zoom({ zoomValue }));
  }, [zoomValue]);

  if (!elem) return null;
  const { fabric: canvas } = elem;

  const download = () => {
    const url = canvas?.toDataURL({
      format: "png",
    });

    if (url) {
      const link = document.createElement("a");
      link.download = `tecno-${new Date().toISOString()}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleAddText = () => {
    dispatch(
      addText({
        selectedColor,
        selectedFontSize,
        isBold,
        isItalized,
        isUnderlined,
        textAlign,
      })
    );
  };

  const handleFont = () => {
    setShowFonts((prev) => !prev);
  };
  const handleColor = () => {
    setShowColorPallete((prev) => !prev);
  };

  const handleTextAlign = () => {};
  const handleAddZoomIn = () => {
    setZoomValue((prev) => prev + 1);
  };
  const handleAddZoomOut = () => {
    if (zoomValue <= 1) return;
    setZoomValue((prev) => prev - 1);
  };
  const handleDownload = () => {};
  return (
    <>
      <MenuBarStyle>
        {/* upload image */}
        <ImageUploadButton />
        {/* add text */}
        <DarkButton textSize="md" onClick={() => handleAddText()} variant={1}>
          Add Text <AddTextIcon />
        </DarkButton>
        <hr />
        {/* fonts(family, size, bold, italize) */}
        <DarkButton textSize="md" variant={2}>
          <RenderIf condition={showFonts}>
            <div className="fonts-action-bar">
              <span className="font-family">
                <Select
                  options={fonts}
                  values={[]}
                  onChange={(value) => dispatch(setFontFamily(value[0].value))}
                  style={{ width: "100%" }}
                  dropdownPosition="top"
                />
              </span>
              <span className="font-size">
                <Select
                  options={fontSizes}
                  values={[]}
                  onChange={(value) => {
                    setSelectedFontSize(value[0].value);
                    dispatch(setFontSize(value[0].value));
                  }}
                  style={{ width: "100%" }}
                  dropdownPosition="top"
                />
              </span>
              <span
                onClick={() => {
                  setIsBold((prev) => !prev);
                  dispatch(setToBold());
                }}
              >
                <Bold width={15} height={15} />
              </span>
              <span
                onClick={() => {
                  setIsItalized((prev) => !prev);
                  dispatch(setToItalic());
                }}
              >
                <Italize width={15} height={15} />
              </span>
              <span
                onClick={() => {
                  setIsUnderlined((prev) => !prev);
                  dispatch(underlineText());
                }}
              >
                <Underline width={15} height={15} />
              </span>
            </div>
          </RenderIf>

          <span role="none" onClick={handleFont}>
            Font
          </span>
        </DarkButton>
        {/* color palette */}
        <DarkButton textSize="md" onClick={() => handleColor()} variant={2}>
          <RenderIf condition={showColorPallete}>
            <div className="color-action-bar">
              <CirclePicker
                color={selectedColor}
                onChangeComplete={(color) => {
                  setSelectedColor(color.hex);
                  dispatch(changeTextColor(color.hex));
                }}
                width="470px"
                colors={colorList}
              />
            </div>
          </RenderIf>
          Color{" "}
          <div
            style={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              background: `${selectedColor}`,
            }}
          ></div>
        </DarkButton>
        {/* Text Align */}
        <DarkButton textSize="md" onClick={() => handleTextAlign()} variant={2}>
          <RenderIf condition={showTextAlign && activeMenu === "textAlign"}>
            <div className="action-bar">
              <LeftAlign
                // style={{ background: "pink" }}
                onClick={() => setTextAlign("left")}
              />
              <CenterAlign onClick={() => setTextAlign("center")} />
              <RightAlign onClick={() => setTextAlign("right")} />
            </div>
          </RenderIf>
          <span
            role="none"
            onClick={() => {
              setActiveMenu("textAlign");
              setShowTextAlign((prev) => !prev);
            }}
          >
            Align
          </span>
        </DarkButton>
        <DarkButton
          textSize="md"
          onClick={() => handleAddZoomOut()}
          variant={2}
        >
          <ZoomOutIcon />
        </DarkButton>
        <DarkButton textSize="md" onClick={() => handleAddZoomIn()} variant={2}>
          <ZoomInIcon />
        </DarkButton>
        <DarkButton textSize="md" onClick={() => download()} variant={2}>
          Download
        </DarkButton>
        <DarkButton
          textSize="md"
          onClick={() => dispatch(setBackgroundImage())}
          variant={2}
        >
          Set background
        </DarkButton>
        {/* <DarkButton
          textSize="md"
          onClick={() => dispatch(serialize())}
          variant={2}
        >
          Serialize
        </DarkButton> */}
      </MenuBarStyle>
    </>
  );
};

export default MenuBar;
