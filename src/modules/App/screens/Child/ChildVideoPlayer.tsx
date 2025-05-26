import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import YouTubePlayer from '@/component/shared/YoutubePlayer';
import CustomHeader from '../../common/CustomHeader';
import * as appActions from '@/modules/App/store/appActions';
import { useDispatch } from 'react-redux';

let timeInterval: NodeJS.Timeout;

const ChildVideoPlayer: React.FC = (props: any) => {
  const { video } = props.route.params
  const dispatch = useDispatch();

  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const videoId = getYoutubeVideoId(video.url);

  const updatePlaylistProgress = async (player: any, isEnded?: boolean) => {
    try {
      const currentTime = await player.getCurrentTime();
      const payload = {
        data: { ...video, watchDuration: Math.floor(parseInt(currentTime) * 1000), isCompleted: isEnded }
      }
      await new Promise((resolve, reject) => {
        return dispatch(appActions.updatePlaylist(payload, resolve, reject));
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppLayout isBack header={<CustomHeader />}>
      {videoId && (
        <YouTubePlayer
          videoId={videoId}
          videoTitle={video.name}
          videoThumbnail={video.image}
          watchDuration={video.watchDuration}
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
      )}
    </AppLayout>
  );
};

export default ChildVideoPlayer;
