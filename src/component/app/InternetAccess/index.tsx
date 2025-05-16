import React from 'react';
import Box from '@/component/shared/Box';
import Stack from '@/component/shared/Stack';
import Typography from '@/component/shared/Typography';
import NoInternetIcon from '@/assets/icons/no-internet.svg';
import styled from 'styled-components/native';
import { theme } from '@/config/theme';
import Button from '@/component/shared/Button';
import { ImageBackground, Linking, Platform } from 'react-native';
import bgImage from '@/assets/images/bgImage.png';

const InternetAccess = () => {
  const openInternetSettings = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:root=WIFI');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <ImageBackground
      source={bgImage}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Container>
        <Card>
          <NoInternetIcon />
          <Typography variant="h3" weight={700}>
            No internet connection
          </Typography>
          <Typography variant="body2" weight={400} style={{ marginTop: 5 }}>
            Please check your internet connection
          </Typography>
          <EnableButton onPress={openInternetSettings}>
            <Typography variant="h4" weight={700} color={theme.colors.onPrimary}>
              Enable WiFi
            </Typography>
          </EnableButton>
        </Card>
      </Container>
    </ImageBackground>
  );
};

export default InternetAccess;

const Container = styled(Box)`
  z-index: 100;
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: rgba(255, 190, 9, 0.8);
  align-items: center;
  justify-content: center;
`;

const Card = styled(Stack)`
  background-color: ${theme.colors.background.default};
  padding: 55px 16px;
  align-items: center;
  border-width: 1px;
  border-color: ;
  border-radius: 24px;
  width: 100%;
  margin-horizontal: auto;
`;

const EnableButton = styled(Button)`
  background-color: ${theme.colors.primary};
  margin-top: 33px;
  width: 100%;
  border-radius: 27.5px;
  height: 55px;
  padding-top: 8px;
`;
