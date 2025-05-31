import React from 'react';
import { useWindowDimensions } from 'react-native';
import EmptyIcon from '@/assets/icons/empty.svg';
import styled from 'styled-components/native';
import Typography from '../shared/Typography';
import Stack from '../shared/Stack';
import Spacer from '../shared/Spacer';
import Box from '../shared/Box';
import { Button } from 'react-native-paper';
import { useThemeContext } from '@/context/ThemeContext';

interface EmptyProps {
  title: string;
  description?: string;
  buttonTitle?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}

const Empty: React.FC<EmptyProps> = ({ title, description, onPress, buttonTitle, icon }) => {
  const { theme } = useThemeContext();
  return (
    <Container width="100%" alignItems="center">
      <EmptyCard>
        <Stack direction="column" gap={1} align="center">
          {icon || <EmptyIcon />}
          <Stack direction="column" gap={1} align="center">
            <Typography variant="h3" weight={600} color={theme.colors.text.primary}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color={theme.colors.text.primary} align="center">
                {description}
              </Typography>
            )}
            {buttonTitle && (
              <>
                <Spacer x={1} y={1} />
                <StyledButton mode="contained" onPress={onPress} theme={theme}>
                  {buttonTitle}
                </StyledButton>
              </>
            )}
          </Stack>
        </Stack>
      </EmptyCard>
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

const EmptyCard = styled(Stack)(({ theme }) => ({
  marginBottom: 16,
  position: 'relative',
  backgroundColor: theme.colors.background.secondary,
  borderRadius: theme.borderRadius.xl,
  padding: 24,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 400,
}));

const StyledButton = styled(Button)`
  width: 100%;
`;
