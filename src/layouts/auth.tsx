import React, { ReactNode } from 'react';

import { Navbar, Logo } from '../components/styles/Auth/Navbar';
import { Button } from '../components/styles/Button';
import { MainContainer } from '../components/styles/Auth/Body';

import logo from '../assets/images/logo.png';

interface IProps {
  children: ReactNode;
}
const Auth = (props: IProps) => {
  const { children } = props;

  return (
    <div>
      <Navbar>
        <Logo>
          <img width={80} height={15} alt="" src={logo} />
          <p>Recreate</p>
        </Logo>
        <Button>Login here</Button>
      </Navbar>
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default Auth;
