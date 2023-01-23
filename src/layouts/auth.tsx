import React, { ReactNode, useEffect } from "react";

import { useNavigate, NavigateFunction } from "react-router-dom";

import { Navbar, Logo } from "../components/styles/Auth/Navbar";
import { Button } from "../components/styles/Button";
import { MainContainer } from "../components/styles/Auth/Body";

import logo from "../assets/images/logo.png";
import { getLocalStorage } from "../services/helper";
import config from "../config";
import { useModals } from "../contexts/Modal";

interface IProps {
  children: ReactNode;
}
const Auth = (props: IProps) => {
  const { children } = props;
  const router: NavigateFunction = useNavigate();
  const { handleOpenModal } = useModals();

  useEffect(() => {
    if (getLocalStorage(config.tokenKey) !== null) {
      router("/templates");
    }
  }, []);

  return (
    <div>
      <Navbar>
        <Logo>
          <img width={80} height={15} alt="" src={logo} />
          <p>Recreate</p>
        </Logo>
        <Button onClick={handleOpenModal}>Login here</Button>
      </Navbar>
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default Auth;
