import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Dimensions, View, TouchableWithoutFeedback } from 'react-native';
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
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const hideOverlayTimeout = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing) {
      interval = setInterval(async () => {
        if (playerRef.current) {
          const time = await playerRef.current.getCurrentTime();
          setCurrentTime(time);
        }
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [playing]);


  const onReady = useCallback(async () => {
    if (playerRef.current) {
      const dur = await playerRef.current.getDuration();
      setDuration(dur);
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
    if (playerRef.current) {
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
      setPlaying(false);
      onEnd?.();
    }
    if (videoPlayer) {
      onProgress?.(state, videoPlayer);
    }
  }, [playerRef.current]);

  return (
    <PlayerContainer>
      <BackgroundImage
        source={bg2Image}
        resizeMode="cover"
      >
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
            <Overlay pointerEvents="box-none">
              <TouchableWithoutFeedback onPress={showOverlay}>
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
              </TouchableWithoutFeedback>
            </Overlay>
          </Stack>
        </Container>
      </BackgroundImage>
    </PlayerContainer>
  );
};

export default YouTubePlayer; 