import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Stack from '@/component/shared/Stack';
import {Image} from 'react-native';
import Typography from '@/component/shared/Typography';

interface StyledGradientButtonProps {
  borderRadius?: number;
  padding?: number;
  height?: number;
  width?: number;
}

export const StyledGradientButton = styled(
  LinearGradient,
)<StyledGradientButtonProps>(({theme, borderRadius, height, width}) => ({
  borderRadius: borderRadius || theme.borderRadius.round,
  marginInline: 'auto',
  height,
  width,
}));

export const IconCircle = styled.View(({theme}) => ({
  width: 36,
  height: 36,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const GradientButtonTouchable = styled.TouchableOpacity(({theme}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginInline: 'auto',
  gap: theme.spacing.sm,
  marginTop: 'auto',
}));

export const VideoLinkInputFlex = styled.View({flex: 1});

export const VideoLinkRemoveButton = styled.TouchableOpacity(({theme}) => ({
  position: 'absolute',
  top: 15,
  right: 15,
}));

export const VideoPreviewImage = styled.Image(({theme}) => ({
  width: 80,
  height: 60,
  borderRadius: theme.borderRadius.lg,
  marginRight: theme.spacing.md,
}));

export const VideoLinkContainer = styled(Stack)(({theme}) => ({
  marginBottom: 16,
  backgroundColor: theme.colors.background.secondary,
  borderRadius: 8,
  paddingBlock: 16,
  paddingHorizontal: 16,
  position: 'relative',
}));

export const VideoLinkInputWrapper = styled(Stack)(({theme}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
}));

export const VideoPreviewCardContainer = styled(Stack)(({theme}) => ({
  marginBottom: 16,
  position: 'relative',
  backgroundColor: theme.colors.background.secondary,
  borderRadius: theme.borderRadius.md,
  padding: 12,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
}));

export const VideoPreviewThumbnail = styled(Image)(({theme}) => ({
  width: 120,
  height: 80,
  borderRadius: 12,
  marginRight: 16,
}));

export const VideoPreviewTitle = styled(Stack)(({theme}) => ({
  flex: 1,
  maxHeight: 72,
}));

export const VideoPreviewTitleText = styled(Typography)(({theme}) => ({
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '500',
  color: theme.colors.text.primary,
  numberOfLines: 3,
  ellipsizeMode: 'tail',
}));
