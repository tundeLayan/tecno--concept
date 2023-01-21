import React, { ReactNode, useEffect } from "react";

import { useNavigate, NavigateFunction } from "react-router-dom";

import { MainContainer } from "../components/styles/Main/Body";
import { Navbar } from "../components/partials";
import { getLocalStorage } from "../services/helper";
import config from "../config";

interface IProps {
  children: ReactNode;
  variant: 1 | 2;
}
const Main = (props: IProps) => {
  const { children, variant = 1 } = props;
  const router: NavigateFunction = useNavigate();
  // TODO: if not logged in, redirect to the landing page

  useEffect(() => {
    if (getLocalStorage(config.tokenKey) === null) {
      router("/");
    }
  }, []);

  return (
    <div>
      <Navbar variant={variant} />
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default Main;
