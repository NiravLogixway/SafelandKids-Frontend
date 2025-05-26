import React, { useEffect, useState } from 'react'
import { VideoPreviewCardContainer, VideoPreviewThumbnail, VideoPreviewTitle, VideoPreviewTitleText } from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useThemeContext } from '@/context/ThemeContext';
import AppLayout from '@/layouts/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { navigate } from '@/navigation/NavigationService';
import { TouchableOpacity } from 'react-native';
import CustomHeader from '../../common/CustomHeader';
import * as appActions from '@/modules/App/store/appActions';

export interface VideoProps {
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
  const playlists = useSelector((state: RootState) => state.app.playlists);
  const [loading, setLoading] = useState(false);

  const getChildPlaylists = async () => {
    try {
      setLoading(true)
      await new Promise((resolve, reject) => {
        return dispatch(appActions.getPlaylists(kid.id, resolve, reject))
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }

  }

  useEffect(() => {
    if (kid.id) {
      getChildPlaylists()
    }
  }, [kid.id]);

  const handleVideoPress = (video: VideoProps) => {
    if (video) {
      navigate("ChildVideoPlayer", { kid: currentKid, video })
    }
  }

  return (
    <AppLayout header={<CustomHeader />}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}>
        {playlists.map((video, idx) => (
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