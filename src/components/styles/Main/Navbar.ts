import styled from 'styled-components';

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => `${props.theme.space[5]} ${props.theme.space[5]}`};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  @media screen and (max-width: 900px) {
    padding: ${(props) => `${props.theme.space[4]} ${props.theme.space[3]} !important`};
  }
`;
const NavbarV2 = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[5]}`};
  background-color: ${(props) => props.theme.colors.bg.dark1};
  box-shadow: ${(props) => props.theme.colors.box_shadow.primary};

  .canvas-title {
    font-weight: ${(props) => props.theme.fontWeights.medium};
    font-size: ${(props) => props.theme.fontSizes.body};
    color: ${(props) => props.theme.colors.text.inverse};
  }
  .profile-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__profile-image {
      border: 1px solid;
      padding: 0.5rem;
      border-radius: 50%;
      background: #734dde;
      border: 2px solid #88a9ff;
      color: ${(props) => props.theme.colors.text.inverse};
      cursor: pointer;
    }
  }
  .desktop-share {
    display: inline-block;
  }
  .mobile-share {
    display: none;
  }
  @media screen and (max-width: 900px) {
    padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[3]} !important`};
    p.home-button {
      display: none;
    }

    .desktop-share {
      display: none;
    }
    .mobile-share {
      display: inline-block;
    }
  }
`;
const Logo = styled.div`
  p {
    font-family: 'Kaushan Script';
    font-weight: ${(props) => props.theme.fontWeights.small};
    font-size: ${(props) => props.theme.fontSizes.body};
    /* line-height: 1.625rem; */
    text-align: right;
    color: ${(props) => props.theme.colors.text.primary};
    margin-block: 0;
    margin-right: -8px;
    margin-top: -6px;
  }
`;

export { Navbar, Logo, NavbarV2 };
