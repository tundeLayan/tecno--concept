import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";

const ModalsContext = createContext({
  showModal: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const value = useMemo(
    () => ({ showModal, handleOpenModal, handleCloseModal }),
    // eslint-disable-next-line comma-dangle
    [showModal, handleOpenModal, handleCloseModal]
  );
  return (
    <ModalsContext.Provider {...{ value }}>{children}</ModalsContext.Provider>
  );
};

const useModals = () => useContext(ModalsContext);

export { ModalProvider, useModals };
