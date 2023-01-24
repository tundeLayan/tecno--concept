/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled from "styled-components";

interface IButton {
  // variant: 'outlined' | 'filled';
}
interface IDarkButton {
  variant: 1 | 2;
  textSize: "sm" | "md" | "lg";
}

const Button = styled.button.attrs(() => ({
  // variant: props.variant || 'outlined',
}))<IButton>`
  border-radius: ${(props) => props.theme.sizes[0]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[4]}`};
  border: ${(props) => `1px solid ${props.theme.colors.brand.primary}`};
  color: ${(props) => props.theme.colors.brand.primary};
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: fit-content;
  /* display: inline-block; */
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
  .simple-spinner {
    width: 20px;
    height: 20px;
    position: relative;
    /* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
  }

  .simple-spinner span {
    display: block;
    width: 20px;
    height: 20px;
    border: 3px solid transparent;
    border-radius: 50%;
    border-right-color: rgba(255, 255, 255, 0.7);
    animation: spinner-anim 0.8s linear infinite;
  }

  @keyframes spinner-anim {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  div {
    .simple-spinner {
      width: 20px;
      height: 20px;
      position: relative;
      /* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    }

    .simple-spinner span {
      display: block;
      width: 20px;
      height: 20px;
      border: 3px solid transparent;
      border-radius: 50%;
      border-right-color: rgba(255, 255, 255, 0.7);
      animation: spinner-anim 0.8s linear infinite;
    }

    @keyframes spinner-anim {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

const FilledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.ui.primary};
  border: ${(props) => `1px solid ${props.theme.colors.ui.primary}`};
  color: ${(props) => props.theme.colors.ui.quaternary};
`;

const InverseButton = styled(Button)`
  box-shadow: ${(props) => props.theme.colors.box_shadow.primary2};
  border: ${(props) => `1px solid ${props.theme.colors.ui.disabled}`};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const GoogleAuthButton = styled(Button)`
  border: 1px solid #999ca0;
  color: ${(props) => props.theme.colors.text.secondary};
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[5]};
  width: 53%;
  @media screen and (max-width: 900px) {
    width: 79% !important;
  }
`;

const DarkButton = styled(Button)<IDarkButton>`
  position: relative;
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[2]}`};
  background-color: ${(props) =>
    props.variant === 1
      ? props.theme.colors.bg.dark2
      : props.theme.colors.bg.dark1};
  color: ${(props) =>
    props.variant === 1
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.tertiary};
  border: ${(props) =>
    props.variant === 1
      ? "none !important"
      : `1px solid ${props.theme.colors.ui.tertiary}`};
  font-weight: ${(props) =>
    props.textSize === "md"
      ? props.theme.fontWeights.small
      : props.theme.fontWeights.medium};
  font-size: ${(props) =>
    props.textSize === "md"
      ? props.theme.fontSizes.caption
      : props.theme.fontSizes.body};
  :hover {
    opacity: 1;
  }
  .action-bar {
    position: absolute;
    background: ${(props) => props.theme.colors.bg.dark1};
    top: -130%;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem;
    border-radius: ${(props) => props.theme.sizes[0]};
    display: flex;
    width: fit-content;
    gap: ${(props) => props.theme.space[3]};
    :hover {
      /* .action-bar { */
      opacity: 1;
      /* } */
    }
  }

  .fonts-action-bar {
    position: absolute;
    background: ${(props) => props.theme.colors.bg.dark1};
    top: -160%;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem;
    border-radius: ${(props) => props.theme.sizes[4]};
    display: flex;
    width: fit-content;
    gap: ${(props) => props.theme.space[3]};
    :hover {
      /* .action-bar { */
      opacity: 1;
      /* } */
    }
    @media screen and (max-width: 900px) {
      gap: ${(props) => props.theme.space[1]};
      padding: 0.5rem;
    }
  }
  .color-action-bar {
    position: absolute;
    /* background: ${(props) => props.theme.colors.bg.dark1}; */
    top: -470%;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem;
    border-radius: ${(props) => props.theme.sizes[4]};
    display: flex;
    width: fit-content;
    gap: ${(props) => props.theme.space[3]};
    :hover {
      opacity: 1;
    }
    @media screen and (max-width: 900px) {
      left: -120%;
      top: -530%;
      gap: ${(props) => props.theme.space[1]};
      padding: 0.5rem;
    }
  }
  .fonts-action-bar {
    display: flex;
    align-items: center;
    top: -180%;
    padding: 0.5rem 1rem;
    border-radius: ${(props) => props.theme.sizes[2]};
    & > span {
      width: fit-content;
      padding: 0.2rem;
      :hover {
        cursor: pointer;
      }
    }
    .font-family {
      width: 100px;
    }
    .font-size {
      width: 100px;
    }
  }
  .list {
    position: absolute;
    background: ${(props) => props.theme.colors.bg.dark1};
    bottom: 140%;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem;
    border-radius: ${(props) => props.theme.sizes[0]};
    list-style: none;
    li {
      padding: 1rem;
      :hover {
        opacity: 0.7;
      }
    }
  }
`;

export { Button, FilledButton, InverseButton, DarkButton, GoogleAuthButton };
