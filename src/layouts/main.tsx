import React, { ReactNode } from 'react';

// import { useRouter } from 'next/router';

// import { routes } from '../routes';
import { MainContainer } from '../components/styles/Main/Body';
import { Navbar } from '../components/partials';

interface IProps {
  children: ReactNode;
  variant: 1 | 2;
}
const Main = (props: IProps) => {
  const { children, variant = 1 } = props;

  return (
    <div>
      <Navbar variant={variant} />
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default Main;
