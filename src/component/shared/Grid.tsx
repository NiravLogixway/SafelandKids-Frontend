// Grid.js
import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  /* margin: ${({spacing}) => -spacing / 2}px; */
`;

const GridItem = styled.View`
  flex: ${({flex}) => flex || '0 1 auto'};
  padding: ${({spacing}) => spacing / 2}px;
  ${({xs, theme}) => xs && `width: ${(xs / 12) * 100}%`};
  ${({sm, theme}) => sm && theme.media.sm && `width: ${(sm / 12) * 100}%`};
  ${({md, theme}) => md && theme.media.md && `width: ${(md / 12) * 100}%`};
  ${({lg, theme}) => lg && theme.media.lg && `width: ${(lg / 12) * 100}%`};
`;

const Grid = ({container, item, children, spacing = 0, ...props}: any) => {
  if (container) {
    return (
      <GridContainer spacing={spacing} {...props}>
        {children}
      </GridContainer>
    );
  }
  if (item) {
    return (
      <GridItem spacing={spacing} {...props}>
        {children}
      </GridItem>
    );
  }
  return null;
};

Grid.propTypes = {
  container: PropTypes.bool,
  item: PropTypes.bool,
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  style: PropTypes.object
};

export default Grid;
