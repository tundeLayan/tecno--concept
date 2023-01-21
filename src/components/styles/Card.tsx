import styled from "styled-components";

const Card = styled.div<any>`
  border-radius: ${(props) => props.theme.sizes[0]};
  background-color: ${(props) => props.theme.colors.bg.secondary2};
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[4]}`};
  color: ${(props) => props.theme.colors.text.inverse};
  /* font-weight: 500; */
  border: none;
  min-height: 8.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "AvertaStd-Semibold";
  font-size: ${(props) => props.theme.fontSizes.h5};
  line-height: 32px;
  text-shadow: ${(props) => props.theme.colors.box_shadow.primary};
  font-size: 24px;
  background-image: ${(props) =>
    props.bgImage ? `url(${props.bgImage}) ` : ""};
  background-position: center;
  background-repeat: none;
  background-size: cover;
  flex: 1;

  /* text-shadow: 0px 12px 12px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4); */
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSizes.caption};
  }
`;

export { Card };
