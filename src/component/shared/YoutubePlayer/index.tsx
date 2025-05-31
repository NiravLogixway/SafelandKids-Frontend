import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Dimensions, View, ActivityIndicator } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import bg2Image from '@/assets/images/bg2Image.png';
import {
  Container,
  BackgroundImage,
  PlayerContainer,
  PlayerOverlay,
  LoadingOverlay,
} from './styles';
import Stack from '../Stack';
import IframeOverlay from './IframeOverlay';
import Typography from '../Typography';
import { navigationRef } from '@/navigation/NavigationService';
import { useFocusEffect } from '@react-navigation/native';

interface YouTubeWebViewProps {
  video: any;
  videoId: string;
  videoTitle: string;
  videoThumbnail: string;
  watchDuration?: number;
  autoPlay?: boolean;
  onEnd?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (e: any) => void;
  onProgress?: (state: string, player: YoutubeIframeRef) => void;
  isShowBack?: boolean;
  onOrientationChange?: (orientation: string) => void;
}

interface CustomYoutubeIframeRef extends YoutubeIframeRef {
  video?: any;
  play?: () => void;
}

let timerInterval: NodeJS.Timeout;
let hideOverlayTimeout: NodeJS.Timeout;

const YouTubePlayer: React.FC<YouTubeWebViewProps> = ({ video, videoId, videoTitle, videoThumbnail, watchDuration, autoPlay = true, onEnd, onPlay, onPause, onSeek, onProgress, isShowBack, onOrientationChange }) => {
  const playerRef = useRef<CustomYoutubeIframeRef>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const [dimensions, setDimensions] = useState(Dimensions.get('screen'));

  useEffect(() => {
    // Update playerRef when video changes
    if (playerRef.current && video) {
      const currentRef = playerRef.current;
      playerRef.current = { ...currentRef, video };
    }
    // Reset progress bar state when video changes
    setCurrentTime(0);
    setPlaying(autoPlay);
    setOverlayVisible(!autoPlay);
  }, [videoId]);

  const orientationChangeHandler = (orientation: string) => {
    setIsPortrait(orientation.toLowerCase() === ('portrait'));
    onOrientationChange?.(orientation);
  };

  const onDimensionsChange = ({ screen }: any) => {
    setDimensions(screen);
  };

  const cleanup = (subscription: any) => {
    setPlaying(false);
    Orientation.removeDeviceOrientationListener(orientationChangeHandler);
    subscription?.remove();
    if (timerInterval) clearInterval(timerInterval);
    if (hideOverlayTimeout) clearTimeout(hideOverlayTimeout);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (hideOverlayTimeout) clearTimeout(hideOverlayTimeout);
      setOverlayVisible(true);
      const subscription = Dimensions.addEventListener('change', onDimensionsChange);
      Orientation.addDeviceOrientationListener(orientationChangeHandler);
      Orientation.getOrientation((orientation) => {
        setIsPortrait(orientation.toLowerCase() === 'portrait');
        onOrientationChange?.(orientation);
      });

      return () => {
        cleanup(subscription);
      };
    }, [])
  );

  let playerWidth = dimensions.width;
  let playerHeight = dimensions.height;
  const PORTRAIT_ASPECT = 16 / 9;
  const LANDSCAPE_ASPECT = 16 / 9;

  if (isPortrait) {
    playerWidth = dimensions.width;
    playerHeight = playerWidth / PORTRAIT_ASPECT;
    // If calculated height exceeds screen height, fallback
    if (playerHeight > dimensions.height) {
      playerHeight = dimensions.height;
      playerWidth = playerHeight * PORTRAIT_ASPECT;
    }
  } else {
    playerHeight = dimensions.height;
    playerWidth = playerHeight * LANDSCAPE_ASPECT;
    // If calculated width exceeds screen width, fallback
    if (playerWidth > dimensions.width) {
      playerWidth = dimensions.width;
      playerHeight = playerWidth / LANDSCAPE_ASPECT;
    }
  }

  useEffect(() => {
    if (playing) {
      timerInterval = setInterval(async () => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const time = await playerRef.current.getCurrentTime();
          setCurrentTime(time);
        }
      }, 1000);
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [playing]);


  const onReady = useCallback(async () => {
    setIsLoading(false);
    if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
      const dur = await playerRef.current.getDuration();
      setDuration(dur);
      setOverlayVisible(true);
    }
  }, []);

  const togglePlaying = () => {
    setPlaying(p => !p);
    if (videoEnded) {
      if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
        playerRef.current.seekTo(0, true);
        setCurrentTime(0);
      }
    }
  };

  const handleSeek = async (e: any) => {
    const { seekTo } = e;
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      await playerRef.current.seekTo(seekTo, true);
      setCurrentTime(seekTo);
      onSeek?.(e);
    }
  };

  const handleSeekMove = (e: any) => {
    if (hideOverlayTimeout) clearTimeout(hideOverlayTimeout);
    handleSeek(e)
  }

  const showOverlay = () => {
    setOverlayVisible(true);
    if (playing) {
      if (hideOverlayTimeout) clearTimeout(hideOverlayTimeout);
      hideOverlayTimeout = setTimeout(() => setOverlayVisible(false), 1000);
    }
  };

  const triggerEvents = (state: string) => {
    const videoPlayer = playerRef.current;
    if (videoPlayer && typeof onProgress === 'function') {
      onProgress(state, videoPlayer);
    }
    if (state === 'ended') {
      onEnd?.();
      setPlaying(false);
    } else if (state === 'playing') {
      onPlay?.();
    } else if (state === 'paused') {
      onPause?.();
    }
  }

  const onChangeState = useCallback((state: string) => {
    setVideoEnded(state === "ended");
    setIsLoading(state === 'buffering' || state === 'unstarted');
    showOverlay();
    triggerEvents(state);
  }, []);

  const handleMoveBackVideo = () => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function' && currentTime - 10 > 0) {
      playerRef.current.seekTo(currentTime - 10, true);
    }
  }

  const handleMoveNextVideo = () => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function' && currentTime + 10 < duration) {
      playerRef.current.seekTo(currentTime + 10, true);
    }
  }

  return (
    <PlayerContainer>
      <PlayerOverlay width={dimensions.width} height={dimensions.height} isPortrait={isPortrait} />
      <BackgroundImage
        source={bg2Image}
        resizeMode="cover"
      >
        {videoId ? (
          <Container width={playerWidth} height={playerHeight}>
            <Stack>
              <View style={{ width: playerWidth, height: playerHeight, zIndex: 2 }} pointerEvents="none">
                <YoutubePlayer
                  key={videoId}
                  ref={playerRef}
                  height={playerHeight}
                  width={playerWidth}
                  videoId={videoId}
                  play={playing}
                  onReady={onReady}
                  initialPlayerParams={{
                    controls: false,
                    modestbranding: true,
                    rel: 0,
                    showinfo: 0,
                    start: watchDuration,
                  }}
                  webViewProps={{
                    androidLayerType: 'hardware',
                  }}
                  onChangeState={onChangeState}
                />
              </View>
              {isLoading && (
                <LoadingOverlay>
                  <ActivityIndicator size="large" color="#fff" />
                </LoadingOverlay>
              )}

              <IframeOverlay
                videoThumbnail={videoThumbnail}
                videoTitle={videoTitle}
                playing={playing}
                currentTime={currentTime}
                duration={duration}
                videoEnded={videoEnded}
                overlayVisible={overlayVisible}
                onPlayPause={togglePlaying}
                onSeek={handleSeek}
                onSeekMove={handleSeekMove}
                onOverlayPress={showOverlay}
                onMoveBackVideo={handleMoveBackVideo}
                onMoveNextVideo={handleMoveNextVideo}
                isShowBack={isShowBack}
                onBack={() => {
                  navigationRef.current?.goBack();
                }}
              />
            </Stack>
          </Container>
        ) : <Stack align='center' justify='center' style={{ flex: 1 }}>
          <Typography variant='h4' color='white'>No video selected</Typography>
        </Stack>}
      </BackgroundImage>
    </PlayerContainer>
  );
};

export default YouTubePlayer; 