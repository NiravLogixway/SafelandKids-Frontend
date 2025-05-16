import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';

const ImageSlider = ({ images }: any) => {
  const { width } = Dimensions.get('window');
  const height = width * 0.7;
  const [active, setActive] = useState(0);
  const change = ({ nativeEvent }: any) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );

    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <View>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}>
        {images.map((image: any, index: number) => (
          <Image
            key={index}
            source={{ uri: image.image }}
            style={{ width, height, resizeMode: 'cover' }}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((i: any, k: number) => (
          <Text
            key={k}
            style={k === active ? styles.activeDot : styles.dot} />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -15,

    alignSelf: 'center',
  },

  dot: {
    color: '#888',

    fontSize: 50,
  },
  activeDot: {
    color: '#FFF',

    fontSize: 50,
  },
});

export default ImageSlider;
