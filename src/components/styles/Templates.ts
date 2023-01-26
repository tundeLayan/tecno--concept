import { space } from "./../../infrastructure/theme/spacing";
import { theme } from "./../../infrastructure/theme/index";
import styled from "styled-components";

const Container = styled.main<any>`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 4.8813rem);
  padding-block: ${(props) => `${props.theme.space[3]}`};
  position: relative;
  .top {
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;
    padding-inline: ${(props) => `${props.theme.space[5]}`};
    &__greetings {
      /* border: 1px solid; */
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      justify-content: center;
      text-align: left;
      & > h1 {
        font-weight: ${(props) => props.theme.fontWeights.medium};
        font-size: ${(props) => props.theme.fontSizes.h4};
        line-height: 2.8125rem;
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors.text.secondary};
      }
      & > p {
        color: ${(props) => props.theme.colors.text.secondary};
        font-weight: ${(props) => props.theme.fontWeights.small};
        font-size: ${(props) => props.theme.fontSizes.title};
        /* line-height: 2.8125rem; */
        margin-block: 0px !important;
      }
    }
    &__templates {
      /* border: 1px solid black; */
      padding-inline: 4rem;
      display: flex;
      justify-content: space-between;
      /* grid-template-columns: repeat(5, minmax(14.5%, 14.5%)); */
      width: 90%;
      gap: 3rem;
      &__label {
        font-weight: ${(props) => props.theme.fontWeights.medium};
        font-size: ${(props) => props.theme.fontSizes.body2};
        /* line-height: 2.8125rem; */
        text-align: center;
        color: ${(props) => props.theme.colors.text.secondary};
      }
      @media screen and (max-width: 900px) {
        padding-inline: 0rem;
      }

      /* border: 1px solid green; */
    }
    @media screen and (max-width: 900px) {
      flex-direction: column;
      gap: ${(props) => props.theme.space[3]};
      margin-bottom: 0.4rem;
      padding-inline: ${(props) => `${props.theme.space[2]}`};
      &__greetings {
        & > h1 {
          font-weight: 600;
          font-size: 1.125rem;
          line-height: 30px;
          color: #222222;
        }
        & > p {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.25rem;
          color: #222222;
        }
      }
      &__templates {
        width: 100%;
        overflow-x: auto;
        gap: 1.5rem;

        &__label {
          line-height: 1.6rem;
          margin-top: ${(props) => props.theme.space[1]};
          font-weight: ${(props) => props.theme.fontWeights.medium};
          font-size: ${(props) => props.theme.fontSizes.caption};
          /* line-height: 2.8125rem; */
          color: ${(props) => props.theme.colors.text.secondary};
        }
      }
    }
  }
  .middle {
    min-height: 300px;
    background: #f5f9ff;
    padding: ${(props) => `${props.theme.space[4]} ${props.theme.space[5]}`};
    display: flex;
    flex-direction: column;
    & > .middle-top {
      display: flex;
      flex-direction: column;
      margin-bottom: ${(props) => props.theme.space[5]};
      .title {
        font-weight: 600;
        font-size: 30px;
        color: #222222;
      }
      .subtitle {
        font-weight: 400;
        font-size: 24px;
        line-height: 45px;
        color: #222222;
      }
    }
    .steps {
      display: flex;
      justify-content: space-between;
      gap: 1.4rem;
      margin-bottom: ${(props) => props.theme.space[4]};
      .step {
        flex: 1;
        &-title {
          font-weight: 700;
          font-size: 22px;
          color: #222222;
          margin-bottom: 0.8rem;
        }
        &-subtitle {
          font-weight: 400;
          font-size: 21px;
          color: #222222;
          .hashtag {
            color: #0163f8;
            font-style: italic;
          }
        }
      }
    }
    @media screen and (max-width: 900px) {
      padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[3]}`};
      & > .middle-top {
        margin-bottom: ${(props) => props.theme.space[3]};
        .title {
          font-weight: 700;
          font-size: 18px;
        }
        .subtitle {
          font-weight: 400;
          font-size: 14px;
          line-height: 30px;
        }
      }
      .steps {
        flex-direction: column;
        .step {
          flex: 1;
          &-title {
            font-weight: 700;
            font-size: 18px;
            margin-bottom: 7px;
          }
          &-subtitle {
            font-weight: 400;
            font-size: 14px;
          }
        }
      }
      .watch-demo-button {
        width: 90%;
        text-align: center;
        justify-content: center;
        /* line-height: 11.2px; */
      }
    }
  }
  .bottom {
    padding: ${(props) => `${props.theme.space[4]} ${props.theme.space[5]}`};
    & > h1 {
      margin-bottom: 2rem;
      font-weight: ${(props) => props.theme.fontWeights.medium};
      font-size: ${(props) => props.theme.fontSizes.h4};
      color: ${(props) => props.theme.colors.text.secondary};
    }
    &__recent-designs {
      display: flex;
      /* justify-content: space-between; */
      /* place-items: center; */
      gap: 4rem;
      flex-wrap: wrap;
      /* grid-template-columns: ${(props) =>
        props.isEmpty
          ? "repeat(4, minmax(100%, 100%))"
          : "repeat(4, minmax(20%, 100%))"}; */
      .card-v2-container {
        flex: 0 0 20%;
      }
    }
    &__emptydesign {
      /* border: 1px solid; */
      width: 100%;
    }
  }
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: ${(props) => props.theme.space[3]};
    padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[2]}`};
    .top {
    }
    .bottom {
      & > h1 {
        font-weight: ${(props) => props.theme.fontWeights.medium};
        font-size: ${(props) => props.theme.fontSizes.body2};
        line-height: 2.1875rem;
      }
      &__recent-designs {
        flex-direction: column;
      }
    }
  }
`;

export { Container };
