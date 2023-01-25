import React from "react";

import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import { useTheme, DefaultTheme } from "styled-components";

import {
  Container,
  LeftContainer,
  RightContainer,
  Header,
  Subtitle,
  ModalContainer,
} from "../components/styles/LandingPage";
import { FilledButton, GoogleAuthButton } from "../components/styles/Button";
import {
  LandingImage /* , RightAngle, LeftAngle, LandingImage */,
  GoogleLogo,
  AuthFacebookLogo,
} from "../components/svgs";
import Modal from "../components/Modal";
import { useModals } from "../contexts/Modal";
import queries from "../services/queries/auth";

interface IProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

// TODO: move each to their own components
const GoogleBtn = ({ handleCloseModal }: Partial<IProps>) => {
  const url = "/auth/google/authorize";
  const { mutate, isLoading, data, isSuccess } = queries.read(url);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // console.log(tokenResponse);
      handleCloseModal?.();
      mutate(tokenResponse.access_token);
    },
  });

  return (
    <GoogleAuthButton onClick={() => login()}>
      <GoogleLogo /> Login with Google
    </GoogleAuthButton>
  );
};
interface IFacebookResponse {
  name: string;
  id: string;
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
  graphDomain: string;
  data_access_expiration_time: number;
}
const FaceBookBtn = ({ handleCloseModal }: Partial<IProps>) => {
  const url = "/auth/facebook/authorize";
  const { mutate } = queries.read(url);
  const responseFacebook = (response: IFacebookResponse) => {
    handleCloseModal?.();
    mutate(response.accessToken);
  };
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_CLIENT_APP_ID || ""}
      // autoLoad
      callback={responseFacebook}
      // fields="name,email,picture"
      render={(renderProps) => (
        <GoogleAuthButton onClick={renderProps.onClick}>
          <AuthFacebookLogo /> Login with facebook
        </GoogleAuthButton>
      )}
    />
  );
};

const TemplatesModal = ({ showModal, handleCloseModal }: IProps) => {
  const theme: DefaultTheme = useTheme();
  return (
    <Modal isOpen={showModal} contentLabel="" onRequestClose={handleCloseModal}>
      <ModalContainer>
        <h1 className="modal-header">Login here.</h1>
        <br />
        <br />
        <div className="container">
          <GoogleBtn {...{ handleCloseModal }} />
          {/* <FaceBookBtn {...{ handleCloseModal }} /> */}
          {/* <p className="sign-up">
            No account? <Link to="/">Sign Up</Link>
          </p>
          <p className="privacy">
            By continuing, you agree to the Terms of use, and Privacy Policy of
            double.
          </p> */}
          <style>
            {`
            .modal-header{
              color: ${theme.colors.text.secondary};
            }
          `}
          </style>
        </div>
      </ModalContainer>
    </Modal>
  );
};

const Home = () => {
  const router: NavigateFunction = useNavigate();
  const { showModal, handleOpenModal, handleCloseModal } = useModals();
  return (
    <>
      <Container>
        <LeftContainer>
          <Header>
            Create your Phantom Magazine cover in <span>20 secs</span>
            {/* Create your Idea in <span>seconds</span> */}
          </Header>
          <Subtitle>
            You can now create, edit and share your ideas in just few seconds.
            Be in control of your ideas
          </Subtitle>
          <br />
          <FilledButton onClick={handleOpenModal}>Start Here</FilledButton>
        </LeftContainer>
        <RightContainer>
          <div>
            {/* <img alt="landing" src={LandingImage} height={600} /> */}
            <video
              controls
              muted
              poster="https://ruttl.com/assets/img/index-hero.jpg"
              height={600}
              width={300}
            >
              <source
                src="https://ruttl.com/assets/video/index-hero.webm"
                type="video/mp4"
              />
            </video>
          </div>
        </RightContainer>
      </Container>
      <TemplatesModal {...{ showModal, handleCloseModal }} />
    </>
  );
};

export default Home;
