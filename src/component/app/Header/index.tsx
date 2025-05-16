import React from 'react';
import Stack from '@/component/shared/Stack';
import Box from '@/component/shared/Box';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';
import { theme } from '@/config/theme';
import Typography from '@/component/shared/Typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigationRef } from '@/navigation/NavigationService';

interface HeaderProps {
  title?: string;
  isBack?: boolean;
  bottomSheetRef?: any;
  navigateLink?: string;
  onPress?: () => void;
  titleColor?: string;
  isShowIcon?: boolean;
  isLogo?: boolean;
  Logo?: any;
  route?: any;
}

const Header = ({
  title,
  bottomSheetRef,
  onPress,
  isBack,
  navigateLink,
  titleColor
}: HeaderProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const navigation = navigationRef.current;

  const handleBackPress = () => {
    if (navigateLink) {
      navigation?.navigate(navigateLink);
    } else {
      navigation?.goBack();
    }
  };

  return (
    <Box py={3} px={3} style={{ backgroundColor: theme.colors.onPrimary }}>
      <Stack direction="row" align="center" justify="space-between" gap={1}>
        <Stack direction="row" align="center" gap={1}>
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
              <Icon name="chevron-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
          <Typography variant="h2" weight={600} color={titleColor} style={{ marginBottom: 2 }}>{title}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
