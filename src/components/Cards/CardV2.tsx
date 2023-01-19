import React from 'react';

import { Card as StyledCard, CardContainer } from '../styles/CardV2';
import { RecentDesign1 } from '../svgs';
import { CardShimmer } from '.';

interface IProps {
  label: string;
  icon: any;
  subTitle: string;
  loading: boolean;
}
const Card = ({
  label = 'Celebration Poster',
  icon = <RecentDesign1/>,
  subTitle = 'Facebook Post',
  loading = false,
}: Partial<IProps>) => {
  if (loading) {
    return <CardShimmer />;
  }
  return (
    <CardContainer>
      <StyledCard>
        <div>
          <img alt="" src={icon} />
        </div>
      </StyledCard>
      <p className="card__label">{label}</p>
      <p className="card__sub-title">{subTitle}</p>
    </CardContainer>
  );
};

export default Card;
