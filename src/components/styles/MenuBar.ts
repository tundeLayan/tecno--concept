import styled from "styled-components";

const MenuBarStyle = styled.div`
  background-color: ${(props) => props.theme.colors.bg.dark1};
  border-radius: ${(props) => props.theme.sizes[0]};
  padding: ${(props) => `${props.theme.space[2]}`};
  width: 56%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  display: inherit;
  hr {
    border: 1px dashed #676565;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
const MenuBarStyleMobile = styled.div`
  background-color: ${(props) => props.theme.colors.bg.dark1};
  border-radius: ${(props) => props.theme.sizes[0]};
  padding: ${(props) => `${props.theme.space[2]}`};
  width: 56%;
  margin: auto;
  display: none;
  hr {
    border: 1px dashed #676565;
  }
  @media screen and (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    width: 99%;
    /* overflow-x: auto; */
    gap: 10px;
  }
`;

export { MenuBarStyle, MenuBarStyleMobile };
