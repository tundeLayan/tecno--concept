import styled from 'styled-components';

const TemplateContainer = styled.div`
  background-color: ${(props) => props.theme.colors.bg.primary};
  min-height: calc(100vh - 2.8057rem);
  display: flex;
  flex-direction: column;
  padding-block: 3rem;
  gap: 1.5rem;
  /* .canvas-container {
    flex: 7;
    height: 100%;
    border: 1px solid black;
    display: flex; */
  .canvas {
    /* width: 45%;
    min-height: calc(100vh - 2.8057rem - 11.5rem);
    background: ${(props) => props.theme.colors.bg.secondary};
    margin: auto; */
  }
  @media screen and (max-width: 900px) {
    align-items: center;
    .canvas {
      width: 95%;
      margin: 0;
    }
  }
  /* } */
`;

export { TemplateContainer };
