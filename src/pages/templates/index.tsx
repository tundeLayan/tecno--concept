import { useEffect, useState } from "react";

import { useTheme, DefaultTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

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
  Template2,
  Template3,
  FacebookLogo,
  InstagramLogo,
  LinkedInLogo,
  TwitterLogo,
} from "../../components/svgs";
import Modal from "../../components/Modal";
import { useModals } from "../../contexts/Modal";
import RenderIf from "../../utils";
import queries from "../../services/queries/templates";
import { getLocalStorage } from "../../services/helper";
import config from "../../config";
import { FilledButton } from "../../components/styles/Button";
import { EmptyContainer } from "../../components/styles/EmptyRecentDesigns";
import { template2 } from "../../Templates/template2";

const Icons = [
  {
    Icon: <img src={FacebookLogo} alt="facebook icon" />,
    label: "Facebook Post",
    type: "icon",
    name: "facebook",
  },
  {
    Icon: <img src={TwitterLogo} alt="twitter icon" />,
    label: "Twitter Post",
    type: "icon",
    name: "twitter",
  },
  {
    Icon: <img src={InstagramLogo} alt="facebook icon" />,
    label: "Instagram Post",
    type: "icon",
    name: "instagram",
  },
  {
    Icon: <img src={LinkedInLogo} alt="facebook icon" />,
    label: "Linkedin Post",
    type: "icon",
    name: "linkedin",
  },
];

interface IProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

const generateName = () => {
  const shortName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
    length: 2,
  });
  return shortName;
};

const TemplatesModal = ({ showModal, handleCloseModal }: IProps) => {
  const router = useNavigate();

  const { mutate, isLoading, data, isSuccess } = queries.create(
    (path, name) => {
      handleCloseModal();
      router(`/template/${path}?width=1080&height=1080`);
    }
  );
  const theme: DefaultTheme = useTheme();
  const handleCreate = (template: string) => {
    const tempName = generateName();
    mutate({
      title: tempName,
      media_hash: JSON.stringify({}),
      template_type: template,
    });
  };

  return (
    <Modal
      className="modal-main"
      // width="75%"
      isOpen={showModal}
      contentLabel=""
      onRequestClose={handleCloseModal}
    >
      <>
        <h1 className="modal-header">All Templates</h1>
        <br />
        <br />
        <div
          className="modal-child-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <Card
            label="Template 1"
            iconText={<img src={Template1} width={"100%"} alt="" />}
            onClick={() => handleCreate("template1")}
          />
          <Card
            label="Template 2"
            onClick={() => handleCreate("template2")}
            iconText={<img src={Template2} width={"100%"} alt="" />}
          />
          <Card
            label="Template 3"
            onClick={() => handleCreate("template3")}
            iconText={<img src={Template3} width={"100%"} alt="" />}
          />
        </div>
      </>
      <style>
        {`
          .modal-header{
            color: ${theme.colors.text.secondary};
          }
          .modal-child-container{
            width: 100%;
            flex-wrap: wrap;
            
          }
          .modal-child-container > div{
              width: 50% !important;
            }
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
  const router = useNavigate();
  const { showModal, handleOpenModal, handleCloseModal } = useModals();
  const { data, isLoading } = queries.read();
  const [userDetails] = useState(() => {
    return getLocalStorage(config.tokenKey);
  });

  useEffect(() => {
    handleCloseModal();
  }, []);

  const { mutate } = queries.create((path, name) => {
    handleCloseModal();
    router(`/template/${path}?width=1080&height=1080`);
  });
  const handleCreate = (template: string) => {
    const tempName = generateName();
    mutate({
      title: tempName,
      media_hash: JSON.stringify({}),
      template_type: template,
    });
  };
  return (
    <>
      {/* {console.log("!data", !data)} */}
      <Container isEmpty={!data}>
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
                  iconText={Icon.Icon}
                  label={Icon.label}
                  onClick={() => handleCreate(Icon.name)}
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
              data?.data?.data?.map((dt: any, idx: number) => (
                <CardV2
                  icon={RecentDesign1}
                  key={idx}
                  onClick={() =>
                    router(`/template/${dt.id}?width=1080&height=1080`)
                  }
                  label={dt.title}
                  subTitle={`${dt.template_type.toUpperCase()} POST`}
                />
              ))
            ) : (
              <div className="bottom__emptydesign">
                <EmptyRecentDesigns />
              </div>
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
