import { useEffect, useState } from "react";
import { useTheme, DefaultTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

import { Container } from "../../components/styles/Templates";
import { Card, CardV2 } from "../../components/Cards";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  RecentDesign1,
  RecentDesign2,
  RecentDesign3,
  RecentDesign4,
  TemplateCard,
  EmptyState,
  Template1,
} from "../../components/svgs";
import Modal from "../../components/Modal";
import { useModals } from "../../contexts/Modal";
import RenderIf from "../../utils";
import queries from "../../services/queries/templates";
import { getLocalStorage } from "../../services/helper";
import config from "../../config";
import { FilledButton } from "../../components/styles/Button";
import { EmptyContainer } from "../../components/styles/EmptyRecentDesigns";

const Icons = [
  { Icon: Facebook, label: "Facebook Post", type: "icon" },
  { Icon: Twitter, label: "Twitter Post", type: "icon" },
  { Icon: Instagram, label: "Instagram Post", type: "icon" },
  { Icon: Linkedin, label: "Linkedin Post", type: "icon" },
];

interface IProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

const TemplatesModal = ({ showModal, handleCloseModal }: IProps) => {
  const router = useNavigate();

  const theme: DefaultTheme = useTheme();

  return (
    <Modal
      width="75%"
      isOpen={showModal}
      contentLabel=""
      onRequestClose={handleCloseModal}
    >
      <>
        <h1 className="modal-header">All Templates</h1>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Card
            label="Launch Ad"
            iconText={<img src={Template1} alt="" />}
            onClick={() => {
              handleCloseModal();
              router("/template/campaign?width=1080&height=1080");
            }}
          />
          <Card
            label="Phone Launch"
            onClick={() => {
              handleCloseModal();
              router("/template/campaign?width=1080&height=1080");
            }}
            iconText={<img src={Template1} alt="" />}
          />
          <Card
            label="Engagement Ad"
            onClick={() => {
              handleCloseModal();
              router("/template/campaign?width=1080&height=1080");
            }}
            iconText={<img src={Template1} alt="" />}
          />
        </div>
      </>
      <style>
        {`
          .modal-header{
            color: ${theme.colors.text.secondary};
          }
        `}
      </style>
    </Modal>
  );
};

const generateArray = (size: number = 4) => {
  return Array(size).fill(null);
};
export default function Home() {
  const { showModal, handleOpenModal, handleCloseModal } = useModals();
  const { data, isLoading } = queries.read();
  const [userDetails] = useState(() => {
    return getLocalStorage(config.tokenKey);
  });
  useEffect(() => {
    handleCloseModal();
  }, []);
  return (
    <>
      <Container>
        <RenderIf condition={showModal}>
          <TemplatesModal {...{ showModal, handleCloseModal }} />
        </RenderIf>
        <div className="top">
          <div className="top__greetings">
            <h1>Welcome, {userDetails.first_name}</h1>
            <p>Let&apos;s start creating</p>
          </div>
          <div className="top__templates">
            <RenderIf condition={!isLoading}>
              <Card
                iconText="Templates"
                label="Browse all"
                onClick={handleOpenModal}
                bgImage={"/images/template_card.png"}
              />
              {Icons.map((Icon) => (
                <Card
                  key={Icon.label}
                  iconText={<Icon.Icon />}
                  label={Icon.label}
                />
              ))}
            </RenderIf>
            <RenderIf condition={isLoading}>
              {generateArray(5).map((_, idx) => (
                <Card key={idx} loading={true} />
              ))}
            </RenderIf>
          </div>
        </div>
        <div className="bottom">
          <h1>Recent Designs</h1>

          <div className="bottom__recent-designs">
            {data?.data?.data.length > 0 ? (
              <>
                <CardV2 icon={RecentDesign1} />
                <CardV2 icon={RecentDesign2} />
                <CardV2 icon={RecentDesign3} />
                <CardV2 icon={RecentDesign4} />
              </>
            ) : (
              <EmptyRecentDesigns />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

const EmptyRecentDesigns = () => {
  return (
    <EmptyContainer>
      <EmptyState />
      <h5>No design created yet!</h5>
      <p>Start Creating your designs</p>
    </EmptyContainer>
  );
};
