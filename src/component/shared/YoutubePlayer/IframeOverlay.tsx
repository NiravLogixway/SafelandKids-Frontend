import React from 'react';
import { View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Overlay,
  OverlayHeader,
  Thumbnail,
  TitleText,
  ControlsContainer,
  PlayPauseButton,
  ControlsButton,
} from './styles';
import ProgressBar from './ProgressBar';

interface IframeOverlayProps {
  videoThumbnail: string;
  videoTitle: string;
  playing: boolean;
  currentTime: number;
  duration: number;
  videoEnded: boolean;
  overlayVisible: boolean;
  onPlayPause: () => void;
  onSeek: (e: any) => void;
  onSeekMove: (e: any) => void;
  onOverlayPress: () => void;
  onMoveBackVideo: () => void;
  onMoveNextVideo: () => void;
}

const IframeOverlay: React.FC<IframeOverlayProps> = ({
  videoThumbnail,
  videoTitle,
  playing,
  currentTime,
  duration,
  videoEnded,
  overlayVisible,
  onPlayPause,
  onSeek,
  onSeekMove,
  onOverlayPress,
  onMoveBackVideo,
  onMoveNextVideo,
}) => {
  return (
    <Overlay pointerEvents="box-none">
      <TouchableWithoutFeedback onPress={onOverlayPress}>
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
                  <PlayPauseButton onPress={onPlayPause} activeOpacity={0.8}>
                    <Icon name={playing ? 'pause' : 'play-arrow'} size={36} color="#fff" />
                  </PlayPauseButton>
                </ControlsContainer>
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={onSeek}
                  onSeekMove={onSeekMove}
                />
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
                <ControlsContainer direction="row" align="center" justify="space-between" gap={3}>
                    <ControlsButton onPress={onMoveBackVideo}>
                    <Icon name="rotate-left" size={30} color="#fff" />
                  </ControlsButton>
                  <PlayPauseButton onPress={onPlayPause} activeOpacity={0.8}>
                    <Icon name={playing ? 'pause' : 'play-arrow'} size={36} color="#fff" />
                  </PlayPauseButton>
                  <ControlsButton onPress={onMoveNextVideo}>
                    <Icon name="rotate-right" size={30} color="#fff" />
                  </ControlsButton>
                </ControlsContainer>
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={onSeek}
                  onSeekMove={onSeekMove}
                />
              </>
            )}
          </View>
        )}
      </TouchableWithoutFeedback>
    </Overlay>
  );
};

export default IframeOverlay;
