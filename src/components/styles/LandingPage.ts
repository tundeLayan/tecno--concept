import styled, { keyframes } from "styled-components";

const up_down = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-30px); }
`;

const Container = styled.main`
  display: flex;
  /* border: 1px solid green; */
  height: calc(100vh - 4.8813rem);
  padding: ${(props) => props.theme.space[5]};
  position: relative;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: ${(props) => props.theme.space[6]};
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  position: relative;
  z-index: 2;
  @media screen and (max-width: 900px) {
    text-align: center;
    align-items: center;
  }
`;

const Header = styled.h1`
  font-size: ${(props) => props.theme.sizes[3]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  line-height: 6.125rem;
  color: ${(props) => props.theme.colors.text.secondary};
  span {
    color: ${(props) => props.theme.colors.text.primary} !important;
  }
  @media screen and (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSizes.h4};
    line-height: 2rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-weight: ${(props) => props.theme.fontWeights.small};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 2.8125rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.space[3]};
  @media screen and (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSizes.body};
    line-height: 1.5rem;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  /* border: 1px solid green; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  div {
    position: "absolute";
    top: "50%";
    left: "50%";
    transform: "translate(-50%, -50%)";
    /* border: 1px solid red; */
    animation: ${up_down} 1s infinite alternate;
    -webkit-animation: ${up_down} 1s infinite alternate;
    /* height: 100%; */
    /* width: 100%; */

    /* background-image: url('images/landing_image.png');
    object-fit: cover; */
    @media screen and (max-width: 1200px) and (min-width: 900px) {
    }
    img {
      width: 100% !important;
      @media screen and (max-width: 1200px) and (min-width: 900px) {
        width: 80%;
        font-size: ${(props) => props.theme.fontSizes.h4};
        line-height: 1.5rem;
      }
      @media screen and (max-width: 900px) {
        font-size: ${(props) => props.theme.fontSizes.body};
        line-height: 1.5rem;
        height: 80%;
        width: 80%;
      }
    }
  }
`;

const ModalContainer = styled.div`
  .modal-header {
    text-align: center;
  }
  .container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    .sign-up {
      font-family: "AvertaStd-Semibold";
      font-size: ${(props) => props.theme.fontSizes.body};
      line-height: 24px;
      color: rgba(0, 0, 0, 0.56);
    }
    .privacy {
      text-align: center;
      font-family: "AvertaStd-Regular";
      font-size: ${(props) => props.theme.fontSizes.caption};
      line-height: 16px;
      color: rgba(0, 0, 0, 0.56);
    }
    @media screen and (max-width: 900px) {
      width: 100% !important;
    }
  }
  @media screen and (max-width: 900px) {
    width: 100% !important;
  }
`;

export {
  Container,
  LeftContainer,
  RightContainer,
  Header,
  Subtitle,
  ModalContainer,
};
