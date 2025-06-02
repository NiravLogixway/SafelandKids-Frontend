import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import YouTubePlayer from '@/component/shared/YoutubePlayer';
import CustomHeader from '../../common/CustomHeader';
import * as appActions from '@/modules/App/store/appActions';
import { useDispatch, useSelector } from 'react-redux';
import { useTabContext } from '@/context/TabContext';
import { RootState } from '@/store';
import Stack from '@/component/shared/Stack';
import { ActivityIndicator } from 'react-native-paper';
import { useThemeContext } from '@/context/ThemeContext';
import Empty from '@/component/app/Empty';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '@/navigation/NavigationService';

let timeInterval: NodeJS.Timeout;

const ChildVideoPlayer: React.FC = (props: any) => {
  const { video } = props.route.params;
  const { theme } = useThemeContext();
  const { setTabBarVisible } = useTabContext();
  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.app.playlists);
  const [currentVideo, setCurrentVideo] = useState(video);
  const [isPortrait, setIsPortrait] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (video) {
      setCurrentVideo(video);
      setIsLoading(false);
    }
  }, [video]);

  const orientationChangeHandler = (orientation: string) => {
    setIsPortrait(orientation.toLowerCase() === 'portrait');
    if (orientation.toLowerCase() !== 'portrait') {
      setTabBarVisible(false);
    } else {
      setTabBarVisible(true);
    }
  };

  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleVideoProgression = (currentVideoId: number) => {
    const currentVideoIndex = playlists.findIndex((item: any) => item.id === currentVideoId);
    let nextVideo;

    if (currentVideoIndex === playlists.length - 1) {
      nextVideo = playlists[0];
    } else {
      nextVideo = playlists[currentVideoIndex + 1];
    }

    setCurrentVideo({
      ...nextVideo,
      watchDuration: nextVideo.isCompleted ? 0 : nextVideo.watchDuration,
      isCompleted: false
    });
  };

  const updatePlaylistProgress = async (player: any, isEnded?: boolean) => {
    try {
      const currentTime = await player.getCurrentTime();
      const payload = {
        data: {
          ...player.video,
          watchDuration: Math.floor(parseInt(currentTime)),
          isCompleted: isEnded
        }
      };

      await new Promise((resolve, reject) => {
        return dispatch(appActions.updatePlaylist(payload, resolve, reject));
      });

      if (isEnded) {
        handleVideoProgression(player.video.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const videoId = currentVideo ? getYoutubeVideoId(currentVideo.url) : null;

  return (
    <AppLayout isBack isSafeArea={false} header={<CustomHeader />}>
      <Stack style={{ flex: 1, width: '100%', height: '100%' }}>
        {isLoading ? (
          <Stack style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <ActivityIndicator size="small" color={theme.colors.text.primary} />
          </Stack>
        ) : videoId ? (
          <YouTubePlayer
            video={currentVideo}
            videoId={videoId}
            videoTitle={currentVideo.name}
            videoThumbnail={currentVideo.image}
            watchDuration={currentVideo.watchDuration}
            autoPlay
            onProgress={(state, player) => {
              setHasError(state === "error");
              if (state === "playing" || state === "paused" || state === "ended") {
                clearInterval(timeInterval);
                updatePlaylistProgress(player, state === "ended");
              }
              if (state === 'playing') {
                timeInterval = setInterval(() => {
                  updatePlaylistProgress(player, false);
                }, 5000);
              } else {
                clearInterval(timeInterval);
              }
            }}
            isShowBack={!isPortrait}
            onOrientationChange={orientationChangeHandler}
          />
        ) : (
          <Stack align="center" justify="center" style={{ flex: 1, width: '100%', height: '100%' }}>
            <Empty
              title={hasError ? "Video Playback Error" : "Video Not Available"}
              description={hasError ? "There was an error playing this video. Please try again later or check your internet connection." : "We couldn't find the video you're looking for. Please try again later or check your internet connection."}
              icon={<Icon name={hasError ? "alert-circle-outline" : "videocam-off-outline"} size={48} color={theme.colors.text.primary} />}
              buttonTitle="Back to Playlist"
              onPress={() => navigate('ChildVideoPlaylist', { kid: props.route.params.kid })}
            />
          </Stack>
        )}
      </Stack>
    </AppLayout>
  );
};

export default ChildVideoPlayer;
