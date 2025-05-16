import Box from '@/component/shared/Box';
import Stack from '@/component/shared/Stack';
import Typography from '@/component/shared/Typography';
import { theme } from '@/config/theme';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onLogoPress?: () => void;
  notifCount?: number;
}

const AppHeader: React.FC<HeaderProps> = ({ title, showBack, onBackPress }) => {
  return (
    <Wrapper>
      <Stack direction="row" mt={0.5} mb={0.5} align="center" justify="space-between">
        {showBack && (
          <Box flex={1} align="center">
            <IconButton onPress={onBackPress}>
              <Icon name="chevron-back" size={20} color={theme.colors.scrim} />
            </IconButton>
          </Box>
        )}

        {title && (
          <Box flex={4} align="center">
            <Typography align="center" variant="h3" weight={500}>
              {title}
            </Typography>
          </Box>
        )}
        <Box flex={1} align="center" />
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled.SafeAreaView`
  margin: 16px;
`;

const IconButton = styled.TouchableOpacity`
  background-color: #f2f3f5;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default AppHeader;
