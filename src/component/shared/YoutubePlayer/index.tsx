import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Dimensions, View, TouchableWithoutFeedback, ImageBackground, ActivityIndicator } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import bg2Image from '@/assets/images/bg2Image.png';
import {
  Container,
  BackgroundImage,
  PlayerContainer,
  Overlay,
  OverlayHeader,
  Thumbnail,
  TitleText,
  ControlsContainer,
  PlayPauseButton,
  ProgressBarContainer,
  ProgressBar,
  TimeContainer,
  TimeText
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Stack from '../Stack';

interface YouTubeWebViewProps {
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
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const YouTubePlayer: React.FC<YouTubeWebViewProps> = ({ videoId, videoTitle, videoThumbnail, watchDuration, autoPlay = true, onEnd, onPlay, onPause, onSeek, onProgress }) => {
  const [orientation, setOrientation] = useState("portrait");
  const [playing, setPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const hideOverlayTimeout = useRef<NodeJS.Timeout | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);

  const orientationChangeHandler = (orientation: string) => {
    setOrientation(orientation);
    setIsPortrait(orientation.toLowerCase() === 'portrait');
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(orientationChangeHandler);
    return () => {
      Orientation.removeOrientationListener(orientationChangeHandler);
    };
  }, []);

  // Calculate player size to fit screen in both orientations
  const dimensions = Dimensions.get('screen');
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
    let interval: NodeJS.Timeout;
    if (playing) {
      interval = setInterval(async () => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const time = await playerRef.current.getCurrentTime();
          setCurrentTime(time);
        }
      }, 1000);
    }
    return () => interval && clearInterval(interval);
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
    if (playing) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const handleSeek = async (e: any) => {
    const { locationX } = e.nativeEvent;
    const barWidth = playerWidth * 0.8;
    const percent = locationX / barWidth;
    const seekTo = percent * duration;
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      await playerRef.current.seekTo(seekTo, true);
      setCurrentTime(seekTo);
      onSeek?.(e);
    }
  };

  const showOverlay = () => {
    setOverlayVisible(true);
    if (playing) {
      if (hideOverlayTimeout.current) clearTimeout(hideOverlayTimeout.current);
      hideOverlayTimeout.current = setTimeout(() => setOverlayVisible(false), 1000);
    }
  };

  useEffect(() => {
    if (playing) {
      if (hideOverlayTimeout.current) clearTimeout(hideOverlayTimeout.current);
      hideOverlayTimeout.current = setTimeout(() => setOverlayVisible(false), 1000);
    } else {
      setOverlayVisible(true);
      if (hideOverlayTimeout.current) clearTimeout(hideOverlayTimeout.current);
    }
    return () => {
      if (hideOverlayTimeout.current) clearTimeout(hideOverlayTimeout.current);
    };
  }, [playing]);

  useEffect(() => () => {
    if (hideOverlayTimeout.current) clearTimeout(hideOverlayTimeout.current);
  }, []);

  const onChangeState = useCallback((state: string) => {
    const videoPlayer = playerRef.current;
    if (state === 'ended') {
      setOverlayVisible(true);
      setVideoEnded(true);
      setPlaying(false);
      onEnd?.();
    } else if (state === 'playing') {
      setVideoEnded(false);
      setIsLoading(false);
    } else if (state === 'buffering') {
      setIsLoading(true);
    }
    if (videoPlayer && typeof onProgress === 'function') {
      onProgress(state, videoPlayer);
    }
  }, [playerRef.current]);

  return (
    <PlayerContainer>
      <BackgroundImage
        source={bg2Image}
        resizeMode="cover"
      >
        {videoId ? (
          <Container width={playerWidth} height={playerHeight}>
            <Stack>
              <View style={{ width: playerWidth, height: playerHeight }} pointerEvents="none">
                <YoutubePlayer
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
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              )}
              <Overlay pointerEvents="box-none">
                <TouchableWithoutFeedback onPress={showOverlay}>
                  {videoEnded ? (
                    <ImageBackground
                      source={{ uri: videoThumbnail }}
                      style={{ flex: 1, width: '100%', height: '100%' }}
                      resizeMode="cover"
                    >
                      {overlayVisible && (
                        <>
                          <OverlayHeader>
                            <Thumbnail source={{ uri: videoThumbnail }} />
                            <TitleText numberOfLines={1}>{videoTitle}</TitleText>
                          </OverlayHeader>
                          <ControlsContainer>
                            <PlayPauseButton onPress={togglePlaying} activeOpacity={0.8}>
                              <Icon name={playing ? 'pause' : 'play-arrow'} size={36} color="#fff" />
                            </PlayPauseButton>
                          </ControlsContainer>
                          <ProgressBarContainer onStartShouldSetResponder={() => true} onResponderRelease={handleSeek} style={{ position: 'absolute', bottom: 8, left: '10%' }}>
                            <ProgressBar progress={duration ? currentTime / duration : 0} />
                          </ProgressBarContainer>
                          <TimeContainer style={{ position: 'absolute', bottom: 30, left: '10%', width: '80%' }}>
                            <TimeText>{formatTime(currentTime)}</TimeText>
                            <TimeText>{formatTime(duration)}</TimeText>
                          </TimeContainer>
                        </>
                      )}
                    </ImageBackground>
                  ) : (
                    <View style={{ flex: 1, width: '100%', height: '100%' }}>
                      {overlayVisible && (
                        <>
                          <OverlayHeader>
                            <Thumbnail source={{ uri: videoThumbnail }} />
                            <TitleText numberOfLines={1}>{videoTitle}</TitleText>
                          </OverlayHeader>
                          <ControlsContainer>
                            <PlayPauseButton onPress={togglePlaying} activeOpacity={0.8}>
                              <Icon name={playing ? 'pause' : 'play-arrow'} size={36} color="#fff" />
                            </PlayPauseButton>
                          </ControlsContainer>
                          <ProgressBarContainer onStartShouldSetResponder={() => true} onResponderRelease={handleSeek} style={{ position: 'absolute', bottom: 8, left: '10%' }}>
                            <ProgressBar progress={duration ? currentTime / duration : 0} />
                          </ProgressBarContainer>
                          <TimeContainer style={{ position: 'absolute', bottom: 30, left: '10%', width: '80%' }}>
                            <TimeText>{formatTime(currentTime)}</TimeText>
                            <TimeText>{formatTime(duration)}</TimeText>
                          </TimeContainer>
                        </>
                      )}
                    </View>
                  )}
                </TouchableWithoutFeedback>
              </Overlay>
            </Stack>
          </Container>
        ) : null}
      </BackgroundImage>
    </PlayerContainer>
  );
};

export default YouTubePlayer; 