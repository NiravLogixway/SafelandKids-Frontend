import styled from 'styled-components/native';
import Stack from '../Stack';

interface ContainerProps {
  width: number;
  height: number;
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
  zIndex: 10000,
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
  zIndex: 20000,
}));

export const ControlsContainer = styled.View(() => ({
  width: '100%',
  alignItems: 'center',
  position: 'absolute',
  bottom: 60,
  left: 0,
  zIndex: 3,
}));

export const PlayPauseButton = styled.TouchableOpacity(() => ({
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
}));

export const ProgressBarContainer = styled.View(() => ({
  width: '80%',
  height: 8,
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  borderRadius: 4,
  overflow: 'hidden',
  marginBottom: 8,
}));

export const ProgressBar = styled.View<{progress: number}>(({progress}) => ({
  width: `${progress * 100}%`,
  height: '100%',
  backgroundColor: '#fff',
}));

export const TimeContainer = styled.View(() => ({
  width: '80%',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const TimeText = styled.Text(() => ({
  color: '#fff',
  fontSize: 14,
}));
