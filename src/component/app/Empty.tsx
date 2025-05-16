import React from 'react';
import { useWindowDimensions } from 'react-native';
import EmptyIcon from '@/assets/icons/empty.svg';
import styled from 'styled-components/native';
import Typography from '../shared/Typography';
import Stack from '../shared/Stack';
import Spacer from '../shared/Spacer';
import Box from '../shared/Box';
import { Button } from 'react-native-paper';

interface EmptyProps {
  title: string;
  description?: string;
  buttonTitle?: string;
  onPress?: () => void;
}

const Empty: React.FC<EmptyProps> = ({ title, description, onPress, buttonTitle }) => {
  const { height } = useWindowDimensions();

  return (
    <Container height={height - 200} alignItems="center" justifyContent="center">
      <Stack direction="column" gap={2} align="center">
        <EmptyIcon />
        <Spacer x={1} y={1} />
        <Stack direction="column" gap={1} align="center">
          <Typography variant="h3" weight={600}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {description}
          </Typography>
          {buttonTitle && (
            <>
              <Spacer x={1} y={1} />
              <StyledButton mode="contained" onPress={onPress}>
                {buttonTitle}
              </StyledButton>
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Empty;

const Container = styled(Box)`
  /* position: absolute;
  left: 0;
  top: 0;
  width: 100%; */
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
