/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';

import {useNavigate, NavigateFunction} from 'react-router-dom'

import { Logo, Navbar, NavbarV2 } from '../styles/Main/Navbar';
import { InverseButton, DarkButton } from '../styles/Button';
import {
  BackArrow,
  FacebookShare,
  TwitterShare,
  InstagramShare,
  LinkedinShare,
  ShareIcon,
} from '../svgs';
import PopoverComp from '../Popover';
import logo from '../../assets/images/logo.png';
interface IProps {
  variant: 1 | 2;
}

const NavbarComp = ({ variant }: IProps) => {
  const router: NavigateFunction = useNavigate();
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
          <DarkButton onClick={() => router('/templates')} variant={1} textSize="lg">
            <BackArrow />
            <p className="home-button">Home</p>
          </DarkButton>
          <h3 className="canvas-title">Untitled Design</h3>
          <div className="profile-actions">
            <span className="profile-actions__profile-image">OA</span>

            <PopoverComp
              isPopoverOpen={openShareModal}
              setIsPopoverOpen={setOpenShareModal}
              content={
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(20%, 50%))',
                    gap: '2rem',
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '10px',
                    marginTop: '10px',
                  }}
                >
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: '#222222',
                    }}
                  >
                    <div
                      style={{
                        marginBottom: '.5rem',
                        padding: '.5rem',
                        backgroundColor: '#EBECF0',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <FacebookShare />
                    </div>
                    Facebook
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: '#222222',
                    }}
                  >
                    <div
                      style={{
                        marginBottom: '.5rem',
                        padding: '.5rem',
                        backgroundColor: '#EBECF0',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <TwitterShare />
                    </div>
                    Twitter
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: '#222222',
                    }}
                  >
                    <div
                      style={{
                        marginBottom: '.5rem',
                        padding: '.5rem',
                        backgroundColor: '#EBECF0',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <InstagramShare />
                    </div>
                    LinkedIn
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: '#222222',
                    }}
                  >
                    <div
                      style={{
                        marginBottom: '.5rem',
                        padding: '.5rem',
                        backgroundColor: '#EBECF0',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <LinkedinShare />
                    </div>
                    Instagram
                  </div>
                </div>
              }
            >
              <>
                <span className="desktop-share">
                  <InverseButton onClick={() => setOpenShareModal((prev) => !prev)}>
                    Share
                  </InverseButton>
                </span>
                <span className="mobile-share">
                  <ShareIcon onClick={() => setOpenShareModal((prev) => !prev)} />
                </span>
              </>
            </PopoverComp>
          </div>
        </NavbarV2>
      )}
    </div>
  );
};

export default NavbarComp;
