import React from 'react';

import Typography from '../Typography';
import Button from '../Button';
import Stack from '../Stack';
import styled from 'styled-components/native';
import {theme} from '@/config/theme';

const ReadMore = ({
  text,
  maxChars,
  readMoreText = 'Read more',
  readLessText = 'Read less',
  isHtml = false,
  buttonProps = {},
  ...props
}: any) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasReadMore = text.length > maxChars;
  const content = isExpanded || !hasReadMore ? text : text.slice(0, maxChars) + '...';

  return (
    <>
      <Stack style={{width: '100%'}}>
        {isHtml ? (
          <div dangerouslySetInnerHTML={{__html: content}} />
        ) : (
          <Typography {...props}>{content}</Typography>
        )}

        {hasReadMore && (
          <ReadMoreButton {...buttonProps} onPress={() => setIsExpanded(!isExpanded)}>
            <ReadMoreText variant="body2" color={theme.colors.primary}>
              {!isExpanded ? readMoreText : readLessText}
            </ReadMoreText>
          </ReadMoreButton>
        )}
      </Stack>
    </>
  );
};

export default ReadMore;

const ReadMoreButton = styled(Button).attrs({})`
  width: 70px;
  margin-left: auto;
  height: auto;
  display: inline;
  margin-top: 5px;
`;

const ReadMoreText = styled(Typography).attrs({
  style: {
    marginVertical: 0,
  },
})`
  margin: 0 !important;
`;
