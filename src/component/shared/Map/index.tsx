import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Map = ({latitude, longitude, name}: any) => {
  const lat = latitude ? parseFloat(latitude) : 0;
  const lan = longitude ? parseFloat(longitude) : 0;
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lan,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={{latitude: lat, longitude: lan}} title={name} />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    borderRadius: 4,
    height: 200,
    marginTop: 8,
  },
});
