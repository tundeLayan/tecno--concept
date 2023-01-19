import styled from 'styled-components';

const Card = styled.div`
  border-radius: ${(props) => props.theme.sizes[0]};
  background-color: ${(props) => props.theme.colors.bg.secondary2};
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[4]}`};
  color: ${(props) => props.theme.colors.text.inverse};
  /* font-weight: 500; */
  min-height: 12.5rem;
  position: relative;
  /* TODO: Add the appropriate font */
  font-family: 'AvertaStd-Semibold';
  font-size: ${(props) => props.theme.fontSizes.h5};
  line-height: 32px;
  text-shadow: ${(props) => props.theme.colors.box_shadow.primary};
  margin-bottom: ${(props) => props.theme.space[3]};
  flex: 1;
  :hover {
    cursor: pointer;
  }
  & > div {
    position: absolute;
    min-height: 300px;
    width: 55%;
    left: 50%;
    transform: translateX(-50%);
    bottom: -60%;
    & > img {
      height: 180px !important;
    }
  }
`;

const CardContainer = styled.div`
  width: 100%;
  .card {
    &__label {
      margin-bottom: ${(props) => props.theme.space[1]};
      font-weight: ${(props) => props.theme.fontWeights.medium};
      font-size: ${(props) => props.theme.fontSizes.body2};
      color: ${(props) => props.theme.colors.text.secondary};

      @media screen and (max-width: 900px) {
        font-weight: ${(props) => props.theme.fontWeights.medium};
        font-size: ${(props) => props.theme.fontSizes.button};
      }
    }
    &__sub-title {
      font-weight: ${(props) => props.theme.fontWeights.small};
      font-size: ${(props) => props.theme.fontSizes.button};
      color: ${(props) => props.theme.colors.text.secondary};
    }
  }
`;

export { Card, CardContainer };
