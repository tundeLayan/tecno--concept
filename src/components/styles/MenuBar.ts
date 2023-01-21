import styled from "styled-components";

const MenuBarStyle = styled.div`
  background-color: ${(props) => props.theme.colors.bg.dark1};
  border-radius: ${(props) => props.theme.sizes[0]};
  padding: ${(props) => `${props.theme.space[2]}`};
  width: 56%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  hr {
    border: 1px dashed #676565;
  }
`;

export { MenuBarStyle };
