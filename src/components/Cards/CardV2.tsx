import React from "react";

import { Card as StyledCard, CardContainer } from "../styles/CardV2";
import { RecentDesign1 } from "../svgs";
import { CardShimmer } from ".";

interface IProps {
  label: string;
  icon: any;
  subTitle: string;
  loading: boolean;
  onClick: () => void;
}
const Card = ({
  label = "Celebration Poster",
  icon = <RecentDesign1 />,
  subTitle = "Facebook Post",
  loading = false,
  onClick = () => {},
}: Partial<IProps>) => {
  if (loading) {
    return <CardShimmer />;
  }
  return (
    <CardContainer className="card-v2-container" onClick={onClick}>
      <StyledCard>
        <div>
          <img alt="" src={icon} />
        </div>
      </StyledCard>
      <p className="card__label">{label}</p>
      {/* <p className="card__sub-title">{subTitle}</p> */}
    </CardContainer>
  );
};

export default Card;
