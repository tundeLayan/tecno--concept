import styled from "styled-components";

const TemplateContainer = styled.div`
  background-color: ${(props) => props.theme.colors.bg.primary};
  min-height: calc(100vh - 2.8057rem);
  display: flex;
  flex-direction: column;
  padding-block: 3rem;
  gap: 1.5rem;
  .canvas-container {
    position: relative;
    margin: auto;
    min-height: 70vh;
    width: 50%;
    background-color: white;
    .canvas {
      width: 100%;
      min-height: calc(100vh - 2.8057rem - 11.5rem);
      background: ${(props) => props.theme.colors.bg.secondary};
      margin: auto;
      background-color: white;
    }
    @media screen and (max-width: 900px) {
      height: 50vh;
      align-items: center;
      width: 90%;
      margin-inline-start: 0.5rem;
      .canvas {
        width: 100%;
        margin: 0;
      }
    }
  }
  @media screen and (max-width: 900px) {
    padding-block: 1rem;
  }
`;

export { TemplateContainer };
