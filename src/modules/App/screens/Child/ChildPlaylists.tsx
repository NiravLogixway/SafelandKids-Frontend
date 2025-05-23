import React, { useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useThemeContext } from '@/context/ThemeContext';
import Typography from '@/component/shared/Typography';
import Stack from '@/component/shared/Stack';
import Menu from '@/component/shared/Menu';
import { Image, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchYoutubeOEmbed } from '@/modules/App/api/appApi';
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

// --- Types for reusable components ---
interface VideoLinkInputProps {
  value: string;
  onPaste: () => void;
  onRemove?: () => void;
  error?: string;
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

interface VideoPreviewCardProps {
  title: string;
  thumbnail: string;
  onMenuPress: (item: any, idx: number) => void;
  menuItems: any[];
  index: number;
}

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

const ChildPlaylists = (props: any) => {
  const { kid } = props.route.params;
  const { theme } = useThemeContext();
  const [links, setLinks] = useState<string[]>(['']);
  const [previews, setPreviews] = useState<{ title: string; thumbnail: string; url: string }[]>([]);
  const [mode, setMode] = useState<'input' | 'preview'>('input');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const childName = `${kid.firstName ?? ""} ${kid.lastName ?? ""}`.trim() ?? "Child";

  const handlePaste = async (idx: number): Promise<void> => {
    let error = "";
    try {
      const text = await Clipboard.getString();
      if (!text) {
        error = 'No text found in clipboard';
      }

      const videoId = extractVideoId(text);
      if (!videoId) {
        error = 'Please paste a valid YouTube video URL';
      }

      const isDuplicate = links.some((link, i) => i !== idx && link === text);
      if (isDuplicate) {
        error = 'This video has already been added';
      }

      if (!error) {
        setLinks(prevLinks =>
          prevLinks.map((link, i) => (i === idx ? text : link))
        );
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

  const handleAddMore = () => {
    const lastLink = links[links.length - 1];
    if (!lastLink.trim()) {
      setErrors(prev => ({ ...prev, [links.length - 1]: 'Paste a youtube URL here' }));
      return;
    }

    setLinks([...links, '']);
    setErrors(prev => ({ ...prev, [links.length]: '' }));
  };

  const handleRemove = (idx: number) => {
    setLinks(links => links.filter((_, i) => i !== idx));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[idx];
      return newErrors;
    });
  };

  const handleDone = async () => {
    setLoading(true);
    const details = await Promise.all(
      links.map(async (link) => {
        try {
          const data = await fetchYoutubeOEmbed(link);
          console.log(data)
          return { title: data.title, thumbnail: data.thumbnail_url, url: link };
        } catch {
          return { title: 'Invalid Link', thumbnail: '', url: link };
        }
      })
    );
    setPreviews(details);
    setMode('preview');
    setLoading(false);
  };

  const handleMenuPress = (item: any, idx: number) => {
    if (item.value === 'delete') {
      setPreviews(previews => previews.filter((_, i) => i !== idx));
    }
    // Add more menu actions if needed
  };

  const menuItems = [
    { label: 'Delete', value: 'delete', id: 1 },
  ];

  return (
    <AppLayout isBack title={childName}>
      {mode === 'input' ? (
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}>
            {links.map((link, idx) => (
              <VideoLinkInput
                key={idx}
                value={link}
                onPaste={() => handlePaste(idx)}
                onRemove={links.length > 1 ? () => handleRemove(idx) : undefined}
                error={errors[idx]}
              />
            ))}
          </ScrollView>
          <Stack direction="row" gap={2} mb={theme.spacing.xs} style={{ marginTop: 'auto', paddingTop: theme.spacing.md }}>
            <GradientButton onPress={handleAddMore} iconName="add">
              Add more
            </GradientButton>
            <GradientButton onPress={handleDone} iconName="check" disabled={links.some(l => !l)} loading={loading}>
              Done
            </GradientButton>
          </Stack>
        </>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: theme.spacing.lg }}>
            {previews.map((preview, idx) => (
              <VideoPreviewCard
                key={idx}
                title={preview.title}
                thumbnail={preview.thumbnail}
                menuItems={menuItems}
                onMenuPress={handleMenuPress}
                index={idx}
              />
            ))}
          </ScrollView>
          <Stack direction="row" gap={2} mb={theme.spacing.xs} style={{ marginTop: 'auto' }}>
            <GradientButton onPress={() => setMode('input')} iconName="add">
              Add Video Link(s)
            </GradientButton>
            <GradientButton onPress={() => {/* handle finish action */ }} iconName="check">
              Finish
            </GradientButton>
          </Stack>
        </>
      )}
    </AppLayout>
  );
};

export default ChildPlaylists;
