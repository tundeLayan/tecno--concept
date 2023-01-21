import React, { ReactNode } from "react";

import ReactModal from "react-modal";
import { useTheme, DefaultTheme } from "styled-components";

interface IProps {
  children: any;
  isOpen: boolean;
  contentLabel: string;
  onRequestClose: () => void;
  width?: string;
}

const Modal = ({
  children,
  isOpen,
  contentLabel,
  onRequestClose,
  width = "50%",
}: IProps) => {
  const theme: DefaultTheme = useTheme();
  return (
    <>
      <ReactModal
        {...{ isOpen, contentLabel, onRequestClose }}
        className="Modal"
        overlayClassName="Overlay"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,.6)",
            zIndex: 10000,
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            border: "1px solid #ccc",
            background: `${theme.colors.bg.secondary}`,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: `${theme.space[5]}`,
            transform: "translate(-50%, -50%)",
            width: width,
          },
        }}
      >
        {children}
      </ReactModal>
      {/* <style>{`
          .Modal {
            position: absolute;
            left: 50%;
            top: 50%;
            height: 400px;
            transform: translate(-50%, -50%);
            width: 50%;
            background-color: ${theme.colors.bg.secondary};
            padding: ${theme.space[5]}
          }
        
          .Overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255,255,255,.6);
          }
    `}</style> */}
    </>
  );
};

export default Modal;
