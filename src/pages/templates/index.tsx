import { useTheme, DefaultTheme } from "styled-components";
import {
  useRoutes,
  useLocation,
  Location,
  useNavigate,
} from "react-router-dom";

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
} from "../../components/svgs";
import Modal from "../../components/Modal";
import { useModals } from "../../contexts/Modal";
import RenderIf from "../../utils";

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
    <Modal isOpen={showModal} contentLabel="" onRequestClose={handleCloseModal}>
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
          iconText="Templates"
          label="Launch Ad"
          onClick={() => {
            handleCloseModal();
            router("/template/campaign");
          }}
        />
        <Card iconText="Templates" label="Phone Launch" onClick={() => {}} />
        <Card iconText="Templates" label="Engagement Ad" onClick={() => {}} />
        <style>
          {`
          .modal-header{
            color: ${theme.colors.text.secondary};
          }
        `}
        </style>
      </div>
    </Modal>
  );
};
export default function Home() {
  const { showModal, handleOpenModal, handleCloseModal } = useModals();
  return (
    <>
      <Container>
        <RenderIf condition={showModal}>
          <TemplatesModal {...{ showModal, handleCloseModal }} />
        </RenderIf>
        <div className="top">
          <div className="top__greetings">
            <h1>Welcome, Gabriel</h1>
            <p>Let&apos;s start creating</p>
          </div>
          <div className="top__templates">
            <Card
              iconText="Templates"
              label="Browse all"
              onClick={handleOpenModal}
            />
            {Icons.map((Icon, idx) => (
              <Card key={idx} iconText={<Icon.Icon />} label={Icon.label} />
            ))}
          </div>
        </div>
        <div className="bottom">
          <h1>Recent Designs</h1>
          <div className="bottom__recent-designs">
            <CardV2 icon={RecentDesign1} />
            <CardV2 icon={RecentDesign2} />
            <CardV2 icon={RecentDesign3} />
            <CardV2 icon={RecentDesign4} />
          </div>
        </div>
      </Container>
    </>
  );
}
