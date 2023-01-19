import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  100% {
    -webkit-mask-position:left;
    mask-position: left;
  }
`;
const Card = styled.div`
  border-radius: ${(props) => props.theme.sizes[0]};
  background-color: ${(props) => props.theme.colors.bg.secondary2};
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[4]}`};
  border: none;
  min-height: 8.5rem;
  -webkit-mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/350% 100%;
  mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/350% 100%;
  background-repeat: no-repeat;
  animation: ${shimmer} 2.5s infinite;
  :hover {
    cursor: pointer;
  }
`;

export { Card };
