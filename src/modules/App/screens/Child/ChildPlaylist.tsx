import React, { useEffect, useState } from 'react'
import { VideoPreviewCardContainer, VideoPreviewThumbnail, VideoPreviewTitle, VideoPreviewTitleText } from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useThemeContext } from '@/context/ThemeContext';
import { getChildPlaylists } from '../../api/appApi';
import AppLayout from '@/layouts/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { navigate } from '@/navigation/NavigationService';
import { TouchableOpacity } from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import Typography from '@/component/shared/Typography';

interface VideoProps {
  id: number;
  name: string;
  url: string;
  isShow: boolean;
  isCompleted: boolean;
  watchDuration: number;
  child: number;
  image: string;
  order: number;
}

interface VideoPreviewCardProps {
  title: string;
  thumbnail: string;
  onPress: () => void;
  index: number;
}

const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({ title, thumbnail, onPress, index }) => {
  const { theme } = useThemeContext();
  return (
    <TouchableOpacity onPress={onPress}>
      <VideoPreviewCardContainer >
        <VideoPreviewThumbnail source={{ uri: thumbnail }} />
        <VideoPreviewTitle>
          <VideoPreviewTitleText numberOfLines={3} ellipsizeMode="tail">
            {title}
          </VideoPreviewTitleText>
        </VideoPreviewTitle>
      </VideoPreviewCardContainer>
    </TouchableOpacity>
  );
};

const ChildPlaylist = (props: any) => {
  const { kid } = props.route.params;
  const { theme } = useThemeContext()
  const dispatch = useDispatch()
  const currentKid = useSelector((state: RootState) => state.app.currentKid);
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [loading, setLoading] = useState(false)

  const childName = `${kid.firstName ?? ""} ${kid.lastName ?? ""}`.trim() ?? "";

  useEffect(() => {
    if (kid.id) {
      setLoading(true);
      getChildPlaylists(kid.id).then(res => {
        if (res.length > 0) {
          setVideos(res);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
    return () => {
      setVideos([]);
    }
  }, [kid.id]);

  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const handleVideoPress = (video: VideoProps) => {
    const videoId = getYoutubeVideoId(video.url);
    if (videoId) {
      navigate("ChildVideoPlayer", { kid: currentKid, videoId })
    }
  }

  return (
    <AppLayout header={<CustomHeader />}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}>
        {videos.map((video, idx) => (
          <VideoPreviewCard
            key={idx}
            title={video.name}
            thumbnail={video.image}
            onPress={() => handleVideoPress(video)}
            index={idx}
          />
        ))}
      </ScrollView>
    </AppLayout>
  )
}

export default ChildPlaylist