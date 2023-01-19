import { ReactNode } from "react";

import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import ReactModal from "react-modal";
import { useTheme, DefaultTheme } from "styled-components";
import GoogleLogin from "react-google-login";

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
} from "../components/svgs";
import Modal from "../components/Modal";
import { useModals } from "../contexts/Modal";

interface IProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

const GoogleBtn = () => {
  const googleResponseSuccess = (response: any) => {
    console.log("success", response);
  };

  console.log("process", process.env);
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY || ""}
      render={(renderProps) => (
        <GoogleAuthButton
          onClick={() => {
            renderProps.onClick();
          }}
          disabled={renderProps.disabled}
        >
          <GoogleLogo /> Login with Google
        </GoogleAuthButton>
      )}
      buttonText="Login"
      onSuccess={googleResponseSuccess}
      onFailure={googleResponseSuccess}
      cookiePolicy={"single_host_origin"}
    />
  );
};

const TemplatesModal = ({ showModal, handleCloseModal }: IProps) => {
  const router = useNavigate();

  const theme: DefaultTheme = useTheme();
  return (
    <Modal isOpen={showModal} contentLabel="" onRequestClose={handleCloseModal}>
      <ModalContainer>
        <h1 className="modal-header">Login here.</h1>
        <br />
        <br />
        <div className="container">
          <GoogleBtn />
          <GoogleAuthButton>
            <GoogleLogo /> Login with facebook
          </GoogleAuthButton>
          <p className="sign-up">
            No account? <Link to="/">Sign Up</Link>
          </p>
          <p className="privacy">
            By continuing, you agree to the Terms of use, and Privacy Policy of
            double.
          </p>
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
      {/* <button onClick={handleOpenModal}>Show Modal</button> */}
      <Container>
        <LeftContainer>
          <Header>
            Create your Idea in <span>seconds</span>
          </Header>
          <Subtitle>
            You can now create, edit and share your ideas in just few seconds.
            Be in control of your ideas
          </Subtitle>
          <br />
          <FilledButton onClick={() => router("/templates")}>
            Start Here
          </FilledButton>
        </LeftContainer>
        <RightContainer>
          <div>
            <img alt="landing" src={LandingImage} height={600} />
          </div>
        </RightContainer>
      </Container>
      <TemplatesModal {...{ showModal, handleCloseModal }}>Hey</TemplatesModal>
    </>
  );
};

export default Home;
