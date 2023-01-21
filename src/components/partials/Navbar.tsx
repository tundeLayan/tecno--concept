/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useRef, ReactNode } from "react";

import { useNavigate, NavigateFunction, useParams } from "react-router-dom";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

import { Logo, Navbar, NavbarV2 } from "../styles/Main/Navbar";
import { InverseButton, DarkButton } from "../styles/Button";
import {
  BackArrow,
  FacebookShare,
  TwitterShare,
  InstagramShare,
  LinkedinShare,
  ShareIcon,
} from "../svgs";
import logo from "../../assets/images/logo.png";
import { getLocalStorage } from "../../services/helper";
import config from "../../config";
import RenderIf from "../../utils";
interface IProps {
  variant: 1 | 2;
}

const SocialShare = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: "1.5rem",
        position: "absolute",
        background: "white",
        padding: "1rem",
        left: "-25%",
        top: "120%",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: ".3rem",
          }}
        >
          <FacebookShareButton
            url={`https://facebook.com`}
            quote={`Hiii🤗 sharing on facebook`}
            // hashtag={hashTagsWithHash[0]}
          >
            <span
              style={{
                flex: "1",
                borderRadius: "50%",
                padding: "1rem",
                backgroundColor: "#EBECF0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FacebookShare />
            </span>
          </FacebookShareButton>
          <p
            style={{
              fontWeight: "600",
              fontSize: "12px",
              color: "#222222",
            }}
          >
            Facebook
          </p>
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: ".3rem",
          }}
        >
          <TwitterShareButton
            url={`url here`}
            title={`Hi This is exciting! `}
            via={"tecno-phantom"}
            // hashtags={hashTagsWithoutHash}
          >
            <span
              style={{
                flex: "1",
                borderRadius: "50%",
                padding: "1rem",
                backgroundColor: "#EBECF0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <TwitterShare />
            </span>
          </TwitterShareButton>
          <p
            style={{
              fontWeight: "600",
              fontSize: "12px",
              color: "#222222",
            }}
          >
            Twitter
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: ".3rem",
          }}
        >
          <LinkedinShareButton url="" title="" summary="" source="">
            <span
              style={{
                flex: "1",
                borderRadius: "50%",
                padding: "1rem",
                backgroundColor: "#EBECF0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <LinkedinShare />
            </span>
          </LinkedinShareButton>
          <p
            style={{
              fontWeight: "600",
              fontSize: "12px",
              color: "#222222",
            }}
          >
            Linkedin
          </p>
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: ".3rem",
          }}
        >
          <span
            style={{
              flex: "1",
              borderRadius: "50%",
              padding: "1rem",
              backgroundColor: "#EBECF0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <InstagramShare />
          </span>
          <p
            style={{
              fontWeight: "600",
              fontSize: "12px",
              color: "#222222",
            }}
          >
            Instagram
          </p>
        </div>
      </div>
    </div>
  );
};

const NavbarComp = ({ variant }: IProps) => {
  const router: NavigateFunction = useNavigate();
  const params = useParams();
  const token = getLocalStorage(config.tokenKey);

  const [openShareModal, setOpenShareModal] = useState(false);
  return (
    <div>
      {variant === 1 ? (
        <Navbar>
          <Logo>
            <img width={80} height={15} alt="" src={logo} />
            <p>Recreate</p>
          </Logo>
          <InverseButton>Logout</InverseButton>
        </Navbar>
      ) : (
        <NavbarV2>
          <DarkButton
            onClick={() => router("/templates")}
            variant={1}
            textSize="lg"
          >
            <BackArrow />
            <p className="home-button">Home</p>
          </DarkButton>

          <h3
            className="canvas-title"
            // contentEditable
            // onInput={(e) =>
            //   console.log("Text inside div", e.currentTarget.textContent)
            // }
          >
            {params.id || "Untitled Design"}
          </h3>
          <div className="profile-actions">
            <span className="profile-actions__profile-image">
              {token.first_name[0]}
              {token.last_name[0]}
            </span>

            <span style={{ position: "relative" }}>
              <span className="desktop-share">
                <InverseButton
                  onClick={() => setOpenShareModal((prev) => !prev)}
                >
                  Share
                </InverseButton>
              </span>
              <RenderIf condition={openShareModal}>
                <SocialShare />
              </RenderIf>
              <span className="mobile-share">
                <ShareIcon onClick={() => setOpenShareModal((prev) => !prev)} />
              </span>
            </span>
          </div>
        </NavbarV2>
      )}
    </div>
  );
};

export default NavbarComp;
