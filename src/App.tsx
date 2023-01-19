import React, { useState, useEffect } from "react";

import { ThemeProvider } from "styled-components";
// import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { fabric } from "fabric";

import "nprogress/nprogress.css";
// import "react-toastify/dist/ReactToastify.min.css";

import "./styles/globals.css";
import "./styles/fonts.css";

import Pages from "./routes";
import { theme } from "./infrastructure/theme";
import { ModalProvider } from "./contexts/Modal";
import { Box, Grid } from "@mui/material";
import CanvasApp from "./Canvas/Canvas";
import CanvasControls from "./Toolbox/Toolbox";
import ContextMenu from "./Canvas/ContextMenu/ContextMenu";
import { CanvasCTX } from "./Canvas";

function App() {
  const [domLoaded, setDomLoaded] = useState(false);
  // const [canvasVal, setCanvasVal] = useState<fabric.Canvas>();

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  // const setCanvas = (canv: fabric.Canvas) => {
  //   setCanvasVal(canv);
  // };

  if (!domLoaded) return null;

  // TODO: cleanup and remove canvas here
  return (
    <BrowserRouter>
      <ModalProvider>
        <ThemeProvider theme={theme}>
          {/* <ToastContainer /> */}
          <Pages />
          {/* <CanvasCTX.Provider
            value={{
              canvas: canvasVal,
              setCanvas,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <CanvasControls />
              </Grid>
              <div>
                <CanvasApp />
              </div>
            </Grid>
            <ContextMenu />
          </CanvasCTX.Provider> */}
        </ThemeProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
