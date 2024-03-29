/* eslint-disable react/jsx-wrap-multilines */
import React, {
  useState,
  useRef,
  ReactNode,
  useCallback,
  useContext,
} from "react";

import {
  useNavigate,
  NavigateFunction,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { googleLogout } from "@react-oauth/google";
import debounce from "lodash.debounce";

import { Logo, Navbar, NavbarV2 } from "../styles/Main/Navbar";
import { InverseButton, DarkButton, FilledButton } from "../styles/Button";
import {
  BackArrow,
  FacebookShare,
  TwitterShare,
  InstagramShare,
  LinkedinShare,
  ShareIcon,
  SaveIcon,
  Download,
} from "../svgs";
import logo from "../../assets/images/logo.png";
import { getLocalStorage, clearLocalStorage } from "../../services/helper";
import config from "../../config";
import RenderIf from "../../utils";
import queries from "../../services/queries/templates";
import { CanvasCTX, setBackgroundImage } from "../../Canvas";
import { useDispatch } from "react-redux";
interface IProps {
  variant: 1 | 2;
}

const logout = (successCallback = () => {}) => {
  let isGoogleLogin = getLocalStorage(config.tokenKey)?.iss.includes("google");
  isGoogleLogin && googleLogout();
  clearLocalStorage(config.tokenKey);
  setTimeout(() => {
    successCallback();
  }, 300);
};

const SocialShare = () => {
  return (
    <div className="share-child-container" style={{}}>
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
  // const params = useParams();
  const dispatch = useDispatch();
  const token = getLocalStorage(config.tokenKey);
  const params = useParams();
  const { canvas } = useContext(CanvasCTX);

  const { data } = queries.readOne(params.id);
  const { mutate, isLoading } = queries.update();

  const debouncedSearch = useCallback(debounce(mutate, 1500), []);

  function handleSubmit() {
    // console.log("canvas?.toJSON().objects", canvas?.toJSON().objects);
    // console.log("canvas?.toJSON().objects", canvas?.toJSON());
    let dataObj = {
      title: data?.data?.title || "",
      media_hash: JSON.stringify({ objects: canvas?.toJSON().objects }),
      _method: "PUT",
      template_type: data?.data?.template_type,
    };
    mutate(dataObj, params?.id || "");
  }

  const download = () => {
    // set background image to white before download
    dispatch(setBackgroundImage());
    const url = canvas?.toDataURL({
      format: "jpeg",
      quality: 1,
    });

    if (url) {
      const link = document.createElement("a");
      link.download = `tecno-${new Date().toISOString()}.jpg`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div>
      {variant === 1 ? (
        <Navbar>
          <Logo>
            <img width={80} height={15} alt="" src={logo} />
            <p>Recreate</p>
          </Logo>
          <InverseButton onClick={() => logout(() => router("/"))}>
            Logout
          </InverseButton>
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
            contentEditable
            onInput={(e) => {
              debouncedSearch(
                {
                  title: e.currentTarget.textContent,
                  media_hash: JSON.stringify({
                    objects: canvas?.toJSON().objects,
                  }),
                  _method: "PUT",
                  template_type: data?.data?.template_type,
                },
                params.id || ""
              );
            }}
          >
            {data?.data?.title || "Untitled Design"}
          </h3>
          <div className="profile-actions">
            <span className="profile-actions__profile-image">
              {token.first_name[0]}
              {token.last_name[0]}
            </span>
            <span>
              <span className="desktop-share">
                <FilledButton onClick={handleSubmit}>
                  {isLoading ? (
                    <div className="simple-spinner">
                      <span></span>
                    </div>
                  ) : (
                    "Save"
                  )}
                </FilledButton>
              </span>
              <span className="mobile-share">
                {isLoading ? (
                  <div
                    style={{
                      border: "1px solid #fff",
                      height: "20px",
                      width: "20px",
                      display: "inline-block",
                    }}
                  >
                    <div className="simple-spinner">
                      <span></span>
                    </div>
                  </div>
                ) : (
                  <>
                    <SaveIcon onClick={handleSubmit} />
                  </>
                )}
              </span>
            </span>

            <span className="share-container">
              <span className="desktop-share">
                <InverseButton onClick={() => download()}>
                  Download
                </InverseButton>
              </span>
              <span className="mobile-share">
                <Download onClick={() => download()} />
              </span>
            </span>
          </div>
        </NavbarV2>
      )}
    </div>
  );
};

export default NavbarComp;
