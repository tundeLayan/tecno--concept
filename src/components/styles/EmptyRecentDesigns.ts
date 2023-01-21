import styled from "styled-components";

const EmptyContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block-end: 2rem;
  h5 {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #4a4a4a;
    margin-bottom: 0.4rem;
  }
  & > p {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-align: center;

    color: #4a4a4a;
  }
`;

export { EmptyContainer };
