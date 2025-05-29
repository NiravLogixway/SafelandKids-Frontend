import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import YouTubePlayer from '@/component/shared/YoutubePlayer';
import CustomHeader from '../../common/CustomHeader';
import * as appActions from '@/modules/App/store/appActions';
import { useDispatch, useSelector } from 'react-redux';
import Orientation from 'react-native-orientation-locker';
import { useTabContext } from '@/context/TabContext';
import { RootState } from '@/store';
import Stack from '@/component/shared/Stack';
import { ActivityIndicator } from 'react-native-paper';
import Typography from '@/component/shared/Typography';

let timeInterval: NodeJS.Timeout;

const ChildVideoPlayer: React.FC = (props: any) => {
  const { video } = props.route.params;
  const { setTabBarVisible } = useTabContext();
  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.app.playlists);
  const [currentVideo, setCurrentVideo] = useState(video);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (video) {
      if (video.isCompleted) {
        handleVideoProgression(video.id);
      }
      setIsLoading(false);
    }
  }, [video]);

  const orientationChangeHandler = (orientation: string) => {
    if (orientation.toLowerCase() !== 'portrait') {
      setTabBarVisible(false);
    } else {
      setTabBarVisible(true);
    }
  };

  useEffect(() => {
    clearInterval(timeInterval);
    Orientation.addDeviceOrientationListener(orientationChangeHandler);
    const initialOrientation = Orientation.getInitialOrientation();
    if (initialOrientation.toLowerCase() !== 'portrait') {
      setTabBarVisible(false);
    }
    return () => {
      Orientation.removeDeviceOrientationListener(orientationChangeHandler);
      clearInterval(timeInterval);
      setCurrentVideo(null);
      setTabBarVisible(true);
    };
  }, []);

  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const handleVideoProgression = (currentVideoId: number) => {
    const currentVideoIndex = playlists.findIndex((item: any) => item.id === currentVideoId);
    let nextVideo;
    if (currentVideoIndex === playlists.length - 1) {
      nextVideo = playlists[0];
    } else {
      nextVideo = playlists[currentVideoIndex + 1];
    }
    setCurrentVideo({ ...nextVideo, watchDuration: nextVideo.isCompleted ? 0 : nextVideo.watchDuration, isCompleted: false });
  };

  const updatePlaylistProgress = async (player: any, isEnded?: boolean) => {
    try {
      const currentTime = await player.getCurrentTime();
      const payload = {
        data: { ...player.video, watchDuration: Math.floor(parseInt(currentTime)), isCompleted: isEnded }
      }
      await new Promise((resolve, reject) => {
        return dispatch(appActions.updatePlaylist(payload, resolve, reject));
      });
      if (isEnded) {
        handleVideoProgression(currentVideo.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const videoId = getYoutubeVideoId(currentVideo.url);

  return (
    <AppLayout isBack header={<CustomHeader />}>
      {isLoading ? <ActivityIndicator size="large" color="#fff" /> :
        videoId ? (
          <YouTubePlayer
            video={currentVideo}
            videoId={videoId}
            videoTitle={currentVideo.name}
            videoThumbnail={currentVideo.image}
            watchDuration={currentVideo.watchDuration}
            autoPlay
            onProgress={async (state, player) => {
              if (state === "playing" || state === "paused" || state === "ended") {
                clearInterval(timeInterval);
                updatePlaylistProgress(player, state === "ended");
              }
              if (state === 'playing') {
                timeInterval = setInterval(async () => {
                  updatePlaylistProgress(player, false);
                }, 5000);
              } else {
                clearInterval(timeInterval);
              }
            }}
          />
        ) : <Stack>
          <Typography>No video found</Typography>
        </Stack>}
    </AppLayout>
  );
};

export default ChildVideoPlayer;
