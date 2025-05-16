import React from 'react';
import Spacer from '@/component/shared/Spacer';
import Stack from '@/component/shared/Stack';
import Typography from '@/component/shared/Typography';
import styled from 'styled-components/native';

interface CardProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({title, subtitle, children, footer, action}) => {
  return (
    <CardWrapper>
      <CardHeader>
        <Stack direction="row" justify="space-between" align="center">
          <Stack direction="column">
            <Typography variant="body1" color="textPrimary" weight={500}>
              {title}
            </Typography>
            {subtitle && (
              <>
                <Spacer x={1} y={1} />
                <Typography variant="body2" color="textSecondary">
                  Subtitle
                </Typography>
              </>
            )}
          </Stack>
          {action && action}
        </Stack>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  display: flex;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #f2f3f5;
`;

const CardHeader = styled.View`
  background-color: #f2f3f5;
  padding: 12px;
`;

const CardContent = styled.View`
  padding: 12px;
  background-color: transparent;
`;

const CardFooter = styled.View`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

Card.Footer = ({children}) => <CardFooter>{children}</CardFooter>;

export default Card;
