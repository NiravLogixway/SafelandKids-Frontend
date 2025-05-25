import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import Stack from './Stack';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer from 'react-native-youtube-iframe';
import bg2Image from '@/assets/images/bg2Image.png';

interface YouTubeWebViewProps {
  videoId: string;
  autoPlay?: boolean;
}

const YouTubeWebView: React.FC<YouTubeWebViewProps> = ({ videoId, autoPlay = true }) => {
  const [orientation, setOrientation] = useState("portrait");

  const orientationChangeHandler = (orientation: string) => {
    setOrientation(orientation);
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(orientationChangeHandler);
    return () => {
      Orientation.removeOrientationListener(orientationChangeHandler);
    };
  }, []);

  const isPortrait = orientation.toLowerCase() === 'portrait';
  const aspectRatio = isPortrait ? 16 / 9 : 4 / 3;
  const dimensions = Dimensions.get('screen');
  const playerWidth = dimensions.width;
  const playerHeight = playerWidth / aspectRatio;

  return (
    <Stack align="center" justify="center" style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={bg2Image}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={[styles.container, { width: playerWidth, height: playerHeight }]}>
          <YoutubePlayer
            height={playerHeight}
            width={playerWidth}
            videoId={videoId}
            play={autoPlay}
            initialPlayerParams={{
              controls: false,
              modestbranding: true,
              rel: 0,
              showinfo: 0,
            }}
            webViewProps={{
              androidLayerType: 'hardware',
            }}
          />
        </View>
      </ImageBackground>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
});

export default YouTubeWebView; 