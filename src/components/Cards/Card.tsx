import React from "react";

import { DefaultTheme, useTheme } from "styled-components";

import { Card as StyledCard } from "../styles/Card";
import { CardShimmer } from ".";

interface IProps {
  label: string;
  iconText: any;
  loading: boolean;
  onClick: () => void;
  bgImage?: string;
}
const Card = ({
  label,
  iconText,
  loading = false,
  onClick,
  bgImage,
}: Partial<IProps>) => {
  const theme: DefaultTheme = useTheme();
  if (loading) return <CardShimmer />;
  return (
    <>
      <div
        role="none"
        className="top__templates__card-container"
        {...{ onClick }}
      >
        <StyledCard bgImage={bgImage && bgImage}>{iconText}</StyledCard>
        <p className="top__templates__label">{label}</p>
      </div>
      <style>{`
      .top__templates__card-container{
        flex: 1;
        @media screen and (max-width: 900px) {

        }
      }
      .top__templates__label {
          font-weight: ${theme.fontWeights.medium};
          font-size: ${theme.fontSizes.body2};
         
          text-align: left;
          color: ${theme.colors.text.secondary};
          @media screen and (max-width: 900px) {
       
          }
        }
    `}</style>
    </>
  );
};

export default Card;
