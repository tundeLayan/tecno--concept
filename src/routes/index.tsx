import React, { lazy, Suspense, useState } from "react";

import { useLocation, Routes, Route } from "react-router-dom";
import { fabric } from "fabric";

import { MainLayout, AuthLayout } from "../layouts";
import CanvasApp from "../Canvas/Canvas";
import { CanvasCTX } from "../Canvas";

const Landing = lazy(() => import("../pages/index"));

const Templates = lazy(() => import("../pages/templates/index"));

const Template = lazy(() => import("../pages/template/index"));

const Pages = () => {
  const { pathname } = useLocation();

  const [canvasVal, setCanvasVal] = useState<fabric.Canvas>();

  const isMainLayout = pathname.includes("/template");
  const isVariant1 = pathname.includes("/templates");

  const setCanvas = (canv: fabric.Canvas) => {
    setCanvasVal(canv);
  };

  return (
    <Routes>
      <Route
        index
        element={
          <React.Suspense fallback={<h1>Loading...</h1>}>
            <AuthLayout>
              <Landing />
            </AuthLayout>
          </React.Suspense>
        }
      />
      <Route
        path="templates"
        element={
          <React.Suspense fallback={<h1>Loading...</h1>}>
            <MainLayout variant={isVariant1 ? 1 : 2}>
              <Templates />
            </MainLayout>
          </React.Suspense>
        }
      />
      <Route
        path="template/:id"
        element={
          <React.Suspense fallback={<h1>Loading...</h1>}>
            <CanvasCTX.Provider
              value={{
                canvas: canvasVal,
                setCanvas,
              }}
            >
              <MainLayout variant={isVariant1 ? 1 : 2}>
                <Template />
              </MainLayout>
            </CanvasCTX.Provider>
          </React.Suspense>
        }
      />
      {/* <Route path="*" element={<NoPage />} /> */}
    </Routes>
  );
};

export default Pages;
