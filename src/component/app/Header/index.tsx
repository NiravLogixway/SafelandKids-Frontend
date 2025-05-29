import React from 'react';
import Stack from '@/component/shared/Stack';
import Box from '@/component/shared/Box';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Typography from '@/component/shared/Typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate, goBackWithDispatch } from '@/navigation/NavigationService';
import { useThemeContext } from '@/context/ThemeContext';

interface HeaderProps {
  title?: string;
  isBack?: boolean;
  header?: React.ReactNode;
  titleColor?: string;
  navigateLink?: string;
}

const Header = ({
  title,
  header,
  isBack,
  titleColor,
  navigateLink,
}: HeaderProps) => {
  const { theme } = useThemeContext();
  const user = useSelector((state: any) => state.auth.user);
  const handleBackPress = () => {
    if (navigateLink) {
      navigate(navigateLink, {});
    } else {
      goBackWithDispatch();
    }
  };

  return (
    <Box py={3} px={3} style={{ backgroundColor: theme.colors.headerBg }}>
      <Stack direction="row" align="center" justify="space-between" gap={1}>
        {<Stack direction="row" align="center" gap={1}>
          {isBack && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{
                height: 24,
                width: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="chevron-back" size={24} color={theme.colors.text.textPrimary} />
            </TouchableOpacity>
          )}
          {header ? header : <Typography variant="h2" weight={600} color={titleColor} style={{ marginBottom: 2 }}>{title}</Typography>}
        </Stack>}
      </Stack>
    </Box>
  );
};

export default Header;
