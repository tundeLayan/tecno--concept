import React from "react";

import { Card as StyledCard } from "../styles/Shimmer";

const Card = () => {
  return (
    <>
      <div className="top__templates__card-container">
        <StyledCard />
      </div>
      <style>{`
      .top__templates__card-container{
        flex: 1;
        @media screen and (max-width: 900px) {

        }
      }
    `}</style>
    </>
  );
};

export default Card;
