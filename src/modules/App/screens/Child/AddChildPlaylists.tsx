import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useThemeContext } from '@/context/ThemeContext';
import Typography from '@/component/shared/Typography';
import Stack from '@/component/shared/Stack';
import Menu from '@/component/shared/Menu';
import { Image, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchYoutubeOEmbed, addPlaylist, YoutubeOEmbedResponse, getChildPlaylists } from '@/modules/App/api/appApi';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  StyledGradientButton,
  IconCircle,
  GradientButtonTouchable,
  VideoLinkInputFlex,
  VideoLinkRemoveButton,
  VideoLinkContainer,
  VideoLinkInputWrapper,
  VideoPreviewCardContainer,
  VideoPreviewThumbnail,
  VideoPreviewTitle,
  VideoPreviewTitleText
} from './styles';
import { Kid } from '../../store/appTypes';
import { navigateToNestedScreen } from '@/navigation/NavigationService';
import toast from '@/utils/toast';
import { useDispatch } from 'react-redux';
import * as appActions from '@/modules/App/store/appActions';

interface VideoProps {
  id?: number;
  name: string;
  url: string;
  isShow: boolean;
  isCompleted: boolean;
  watchDuration: number;
  child: number;
  image: string;
  order: number;
}

// --- Types for reusable components ---
interface VideoLinkInputProps {
  value: string;
  onPaste: () => void;
  onRemove?: () => void;
  error?: string;
}

interface VideoPreviewCardProps {
  title: string;
  thumbnail: string;
  onMenuPress: (item: any, idx: number) => void;
  menuItems: any[];
  index: number;
}

const VideoLinkInput: React.FC<VideoLinkInputProps> = ({ value, onPaste, onRemove, error }) => {
  const { theme } = useThemeContext();
  return (
    <VideoLinkContainer>
      <VideoLinkInputWrapper>
        <StyledGradientButton
          colors={theme.colors.background.gradient.primary.colors}
          start={theme.colors.background.gradient.primary.start}
          end={theme.colors.background.gradient.primary.end}
          borderRadius={theme.borderRadius.md}
          height={48}
          width={100}
        >
          <Pressable onPress={onPaste} style={{ height: '100%' }}>
            <Stack direction="row" align="center" gap={1} justify="center" style={{ height: '100%' }}>
              <MaterialCommunityIcons name="file-multiple" size={20} color={theme.colors.text.primary} />
              <Typography variant="body1" weight={500} color={theme.colors.text.primary}>
                Paste
              </Typography>
            </Stack>
          </Pressable>
        </StyledGradientButton>
        <VideoLinkInputFlex>
          <Typography variant="body1" weight={500} color={theme.colors.text.primary}>
            {value}
          </Typography>
        </VideoLinkInputFlex>
      </VideoLinkInputWrapper>
      {onRemove && (
        <VideoLinkRemoveButton onPress={onRemove}>
          <Icon name="close" size={24} color={theme.colors.text.primary} />
        </VideoLinkRemoveButton>
      )}
      {error && (
        <Typography variant="body2" color={theme.colors.error} style={{ marginTop: theme.spacing.sm }}>
          {error}
        </Typography>
      )}
    </VideoLinkContainer>
  );
};

const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({ title, thumbnail, onMenuPress, menuItems, index }) => {
  const { theme } = useThemeContext();
  return (
    <VideoPreviewCardContainer>
      <VideoPreviewThumbnail source={{ uri: thumbnail }} />
      <VideoPreviewTitle>
        <VideoPreviewTitleText numberOfLines={3} ellipsizeMode="tail">
          {title}
        </VideoPreviewTitleText>
      </VideoPreviewTitle>
      <Menu
        menuItems={menuItems}
        onPress={item => onMenuPress(item, index)}
        anchorPosition="bottom"
        icon={
          { color: theme.colors.text.primary }
        }
      />
    </VideoPreviewCardContainer>
  );
};

const GradientButton = ({ onPress, children, disabled, loading, iconName, borderRadius, textColor }: { onPress: () => void, children: React.ReactNode, disabled?: boolean, loading?: boolean, iconName: string, borderRadius?: number, textColor?: string }) => {
  const { theme } = useThemeContext();
  return (
    <GradientButtonTouchable
      onPress={onPress}
      disabled={disabled || loading}
    >
      <StyledGradientButton
        colors={theme.colors.background.gradient.primary.colors}
        start={theme.colors.background.gradient.primary.start}
        end={theme.colors.background.gradient.primary.end}
        borderRadius={borderRadius}
      >
        <IconCircle>
          {loading ? (
            <Icon name="hourglass-empty" size={24} color="#fff" />
          ) : (
            <Icon name={iconName} size={24} color="#fff" />
          )}
        </IconCircle>
      </StyledGradientButton>
      <Typography variant="body1" weight={500} color={textColor || theme.colors.text.primary}>{children}</Typography>
    </GradientButtonTouchable>
  );
};

const defaultVideo = {
  name: '',
  url: '',
  order: 0,
  isShow: true,
  isCompleted: false,
  watchDuration: 0,
  image: '',
};

const AddChildPlaylists = (props: any) => {
  const { kid } = props.route.params;
  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [mode, setMode] = useState<'input' | 'preview'>('input');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const childName = `${kid.firstName ?? ""} ${kid.lastName ?? ""}`.trim() ?? "Child";

  useEffect(() => {
    if (kid.id) {
      setLoading(true);
      getChildPlaylists(kid.id).then(res => {
        if (res.length > 0) {
          setVideos(res);
        } else {
          setVideos([{ ...defaultVideo, child: kid.id }]);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
    return () => {
      setVideos([]);

    }
  }, [kid.id]);

  const handleAddMore = () => {
    const lastVideo = videos[videos.length - 1];
    if (lastVideo && !lastVideo.url.trim()) {
      setErrors(prev => ({ ...prev, [videos.length - 1]: 'Paste a youtube URL here' }));
      return;
    }
    setVideos([...videos, {
      name: '',
      url: '',
      isShow: true,
      isCompleted: false,
      watchDuration: 0,
      child: kid.id,
      image: '',
      order: videos.length + 1,
    }]);
    setErrors(prev => ({ ...prev, [videos.length]: '' }));
  };

  const handleRemove = (idx: number) => {
    setVideos(videos => videos.filter((_, i) => i !== idx).map((item, i) => ({ ...item, order: i + 1 })));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[idx];
      return newErrors;
    });
  };

  const handlePaste = async (idx: number): Promise<void> => {
    let error = '';
    try {
      const text = await Clipboard.getString();
      if (!text) {
        error = 'No text found in clipboard';
      }
      const videoId = extractVideoId(text);
      if (!videoId) {
        error = 'Please paste a valid YouTube video URL';
      }
      const isDuplicate = videos.some((video, i) => i !== idx && video.url === text);
      if (isDuplicate) {
        error = 'This video has already been added';
      }
      if (!error) {
        setVideos(videos => videos.map((video, i) => i === idx ? { ...video, url: text } : video));
      }
    } catch {
      error = 'Failed to paste from clipboard';
    }
    setErrors(prev => ({ ...prev, [idx]: error }));
  };

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*&v=)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
      /youtube\.com\/live\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        const videoId = match[1];
        if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
          return videoId;
        }
      }
    }

    return null;
  };

  const handleDone = async () => {
    setLoading(true);
    const filteredVideos = videos.filter(video => video.url.trim());
    const promises = filteredVideos.map(video => fetchYoutubeOEmbed(video.url));
    const details = await Promise.all(promises);
    setVideos(videos => filteredVideos.map((video, i) => details[i] ? {
      ...video,
      name: details[i].title,
      image: details[i].thumbnail_url,
    } : video));
    setMode('preview');
    setLoading(false);
  };

  function getMenuItems(idx: number, total: number) {
    const items = [
      { label: 'Edit', value: 'edit', id: 1 },
      { label: 'Move Up', value: 'moveUp', id: 2 },
      { label: 'Move Down', value: 'moveDown', id: 3 },
      { label: 'Delete', value: 'delete', id: 4 },
    ];
    if (total === 1) return [items[0], items[3]];
    if (idx === 0) return [items[0], items[2], items[3]];
    if (idx === total - 1) return [items[0], items[1], items[3]];
    return items;
  }

  function moveVideo(videos: any[], fromIdx: number, toIdx: number) {
    if (toIdx < 0 || toIdx >= videos.length) return videos;
    const updated = [...videos];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    return updated.map((item, idx) => ({ ...item, order: idx + 1 }));
  }

  const handleDelete = async (idx: number) => {
    try {
      const filteredVideos = videos.filter((_, i) => i !== idx).map((item, i) => ({ ...item, order: i + 1 }));
      setVideos(filteredVideos);
      const playlistId = videos[idx].id;
      if (playlistId) {
        await new Promise((resolve, reject) => {
          dispatch(appActions.deletePlaylist(playlistId, resolve, reject))
        })
      }
      if (filteredVideos.length === 0) {
        setMode('input');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuPress = (item: any, idx: number) => {
    if (item.value === 'delete') {
      handleDelete(idx);
    } else if (item.value === 'moveUp') {
      setVideos(videos => moveVideo(videos, idx, idx - 1));
    } else if (item.value === 'moveDown') {
      setVideos(videos => moveVideo(videos, idx, idx + 1));
    } else if (item.value === 'edit') {
      setMode('input');
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await new Promise((resolve, reject) => {
        dispatch(appActions.addPlaylist(videos, resolve, reject))
      })
      toast.success('Playlists added successfully');
      navigateToNestedScreen('Home', 'ChildList', { kid });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <AppLayout isBack title={childName}>
      {mode === 'input' ? (
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}>
            {videos.map((video, idx) => (
              <VideoLinkInput
                key={idx}
                value={video.url}
                onPaste={() => handlePaste(idx)}
                onRemove={videos.length > 1 ? () => handleRemove(idx) : undefined}
                error={errors[idx]}
              />
            ))}
          </ScrollView>
          <Stack direction="row" gap={2} mb={theme.spacing.xs} style={{ marginTop: 'auto', paddingTop: theme.spacing.md }}>
            <GradientButton onPress={handleAddMore} iconName="add">
              Add more
            </GradientButton>
            <GradientButton onPress={handleDone} iconName="check" disabled={!videos.some(v => v.url.trim())} loading={loading}>
              Done
            </GradientButton>
          </Stack>
        </>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}>
            {videos.map((video, idx) => (
              <VideoPreviewCard
                key={idx}
                title={video.name}
                thumbnail={video.image}
                menuItems={getMenuItems(idx, videos.length)}
                onMenuPress={handleMenuPress}
                index={idx}
              />
            ))}
          </ScrollView>
          <Stack direction="row" gap={2} mb={theme.spacing.xs} style={{ marginTop: 'auto' }}>
            <GradientButton onPress={() => setMode('input')} iconName="add">
              Add Video Link(s)
            </GradientButton>
            <GradientButton onPress={handleFinish} iconName="check" loading={loading}>
              Finish
            </GradientButton>
          </Stack>
        </>
      )}
    </AppLayout>
  );
};

export default AddChildPlaylists;
