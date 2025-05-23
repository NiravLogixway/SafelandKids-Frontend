import React, { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Orientation, { useOrientationChange, PORTRAIT, LANDSCAPE } from 'react-native-orientation-locker';
import Stack from '@/component/shared/Stack';
import Spinner from '@/component/shared/Spinner';
import { useThemeContext } from '@/context/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { ChildStack } from '@/navigation/AppStack';

const getVideoHeight = (width: number, orientation: string) => {
  if (orientation === LANDSCAPE) {
    return Dimensions.get('window').height;
  }
  return width * (9 / 16);
};

const ChildVideoPlayer: React.FC = () => {
  const route = useRoute<RouteProp<ChildStack, 'ChildVideoPlayer'>>();
  const { videoId } = route.params;
  const { theme } = useThemeContext();
  const [orientation, setOrientation] = useState(PORTRAIT);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [loading, setLoading] = useState(true);

  useOrientationChange(o => {
    setOrientation(o);
    setDimensions(Dimensions.get('window'));
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const width = dimensions.width;
  const height = getVideoHeight(width, orientation);

  return (
    <Stack style={{ flex: 1, backgroundColor: theme.colors.surface, alignItems: 'center', justifyContent: 'center' }}>
      {loading && (
        <Spinner size="large" />
      )}
      <WebView
        style={{ width, height, backgroundColor: 'black' }}
        javaScriptEnabled
        domStorageEnabled
        source={{ uri: `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1` }}
        allowsFullscreenVideo
        onLoadEnd={() => setLoading(false)}
      />
    </Stack>
  );
};

export default ChildVideoPlayer;
