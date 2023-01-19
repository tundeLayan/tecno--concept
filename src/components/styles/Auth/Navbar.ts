import styled from 'styled-components';

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  box-shadow: ${(props) => `${props.theme.colors.box_shadow.primary}`};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  @media screen and (max-width: 900px) {
    padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[4]}`};
    background-color: ${(props) => props.theme.colors.bg.primary};
  }
`;
const Logo = styled.div`
  p {
    font-family: 'Kaushan Script';
    font-style: normal;
    font-weight: ${(props) => props.theme.fontWeights.small};
    font-size: 1rem;
    /* line-height: 1.625rem; */
    text-align: right;
    color: ${(props) => props.theme.colors.text.primary};
    margin-block: 0;
    margin-right: -8px;
    margin-top: -6px;
  }
`;

export { Navbar, Logo };
