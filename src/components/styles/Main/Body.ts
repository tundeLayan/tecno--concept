import styled from 'styled-components';

const MainContainer = styled.main`
  min-height: calc(100vh - 4.8813rem);
  background-color: ${(props) => props.theme.colors.bg.secondary};
  /* padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`}; */
`;

export { MainContainer };
