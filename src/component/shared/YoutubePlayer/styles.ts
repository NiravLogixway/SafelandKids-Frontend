import styled from 'styled-components/native';
import Stack from '../Stack';
import {forwardRef} from 'react';
import React from 'react';

interface ContainerProps {
  width: number;
  height: number;
}

interface PlayerOverlayProps {
  width: number;
  height: number;
  isPortrait: boolean;
}

export const Container = styled(Stack)<ContainerProps>(({width, height}) => ({
  width,
  height,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const BackgroundImage = styled.ImageBackground(() => ({
  flex: 1,
}));

export const PlayerContainer = styled(Stack)(() => ({
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const PlayerView = styled.View<{width: number; height: number}>(
  ({width, height}) => ({
    width,
    height,
  }),
);

export const LoadingOverlay = styled.View(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 1)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 50,
}));

export const VideoContainer = styled.View(() => ({
  flex: 1,
  width: '100%',
  height: '100%',
}));

export const OverlayHeader = styled.View(() => ({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 8,
  backgroundColor: 'rgba(0,0,0,0.25)',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
}));

export const Thumbnail = styled.Image(() => ({
  width: 40,
  height: 40,
  borderRadius: 4,
  marginRight: 12,
}));

export const TitleText = styled.Text(() => ({
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  flexShrink: 1,
}));

export const Overlay = styled.View(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  zIndex: 50,
}));

export const PlayerOverlay = styled.View<PlayerOverlayProps>(
  ({width, height, isPortrait, theme}) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: isPortrait ? 'transparent' : theme.colors.background.dark,
    zIndex: 1,
  }),
);

export const ControlsContainer = styled(Stack)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  flex: 1,
}));

export const BottomControlsContainer = styled.View(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 8,
  backgroundColor: 'rgba(0,0,0,0.25)',
  zIndex: 2,
}));

export const FullscreenButton = styled.TouchableOpacity(() => ({
  position: 'absolute',
  top: -45,
  right: 20,
  padding: 8,
  borderRadius: 20,
  backgroundColor: 'rgba(0,0,0,0.6)',
}));

export const ControlsButton = styled.TouchableOpacity(() => ({
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const PlayPauseButton = styled.TouchableOpacity(() => ({
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ProgressBarOuterWrapper = styled.View(({theme}) => ({
  width: 'auto',
  alignItems: 'center',
  zIndex: 100,
  marginBottom: 16,
}));

export const ProgressBarTimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 6px;
`;

export const ProgressBarTrack = styled.View`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  justify-content: center;
`;

export const ProgressBarThumb = styled.View<{progress: number}>`
  position: absolute;
  left: ${props => `${props.progress * 100}%`};
  top: -5px;
  margin-left: -7px;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: #fff;
  border-width: 1.5px;
  border-color: #888;
  shadow-color: #000;
  shadow-offset: 0px 1.5px;
  shadow-opacity: 0.18;
  shadow-radius: 2.22px;
  elevation: 3;
`;

export const ProgressBarFill = styled.View<{progress: number}>`
  width: ${props => `${props.progress * 100}%`};
  height: 100%;
  background-color: #fff;
  position: relative;
  border-radius: 2px;
`;

export const TimeText = styled.Text`
  color: #fff;
  font-size: 14px;
`;
