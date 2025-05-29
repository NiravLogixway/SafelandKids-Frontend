import React, { useRef, useState } from 'react';
import { LayoutChangeEvent, View, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import {
  ProgressBarOuterWrapper,
  ProgressBarTimeRow,
  ProgressBarTrack,
  ProgressBarFill,
  ProgressBarThumb,
  TimeText
} from './styles';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (e: any) => void;
  onSeekMove: (e: any) => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  onSeekMove,
}) => {
  const containerRef = useRef<View>(null);
  const progressRef = useRef(currentTime / duration || 0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [barLeft, setBarLeft] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
    containerRef.current?.measure((x, y, w, h, pageX, pageY) => {
      setBarLeft(pageX);
    });
  };

  const getPercent = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { pageX } = e.nativeEvent;
    let percent = (pageX - barLeft) / containerWidth;
    percent = Math.max(0, Math.min(1, percent));
    return percent;
  };

  const handleSeekMove = (e: any) => {
    if (containerWidth === 0) return;
    setDragging(true);
    const percent = getPercent(e);
    progressRef.current = percent;
    onSeekMove({ ...e, seekTo: percent * duration });
  };

  const handleSeek = (e: any) => {
    if (containerWidth === 0) return;
    setDragging(false);
    const percent = getPercent(e);
    onSeek({ ...e, seekTo: percent * duration });
  };

  const progress = dragging ? progressRef.current : (duration ? currentTime / duration : 0);

  return (
    <ProgressBarOuterWrapper>
      <ProgressBarTimeRow>
        <TimeText>{formatTime(progress * duration)}</TimeText>
        <TimeText>{formatTime(duration)}</TimeText>
      </ProgressBarTimeRow>
      <View
        ref={containerRef}
        onLayout={handleLayout}
        onStartShouldSetResponder={() => true}
        onResponderMove={handleSeekMove}
        onResponderRelease={handleSeek}
        style={{ width: '100%', height: 8, position: 'relative' }}
      >
        <ProgressBarTrack>
          <ProgressBarFill progress={progress} />
          <ProgressBarThumb progress={progress} />
        </ProgressBarTrack>
      </View>
    </ProgressBarOuterWrapper>
  );
};

export default ProgressBar;
