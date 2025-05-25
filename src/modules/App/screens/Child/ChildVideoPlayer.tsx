import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { ChildStack } from '@/navigation/AppStack';
import AppLayout from '@/layouts/AppLayout';
import YouTubeWebView from '@/component/shared/YouTubeWebView';
import CustomHeader from '../../common/CustomHeader';

const ChildVideoPlayer: React.FC = (props: any) => {
  const {  videoId } = props.route.params

  return (
    <AppLayout isBack header={<CustomHeader />}>
      <YouTubeWebView
        videoId={videoId}
        autoPlay
      />
    </AppLayout>
  );
};

export default ChildVideoPlayer;
