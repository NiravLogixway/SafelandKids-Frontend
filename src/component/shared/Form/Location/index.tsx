import {Google_Map_API_Key, Google_Map_API_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import InputComponent from '../Input';
import {useThemeContext} from '../../../../context/ThemeContext';
import {theme} from '../../../../config/theme';

interface Prediction {
  id: string;
  description: string;
}

let timerId: any;

const Location: React.FC = ({
  value,
  onChange,
  onSelectLocation,
  ...props
}: any) => {
  const {theme} = useThemeContext();
  const [searchText, setSearchText] = useState<string>(value);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    setSearchText(value);
  }, [value]);

  const handleSearch = async (text: string) => {
    setSearchText(text);
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      getPlacesFromMap(text);
    });
  };

  const getPlacesFromMap = async (text: string) => {
    if (!text) {
      setPredictions([]);
      return;
    }
    try {
      const response = await fetch(
        `${Google_Map_API_URL}/place/autocomplete/json?input=${text}&key=${Google_Map_API_Key}`,
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setPredictions(data.predictions);
      } else {
        setPredictions([]);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const getGeoLocation = async (locations: any) => {
    try {
      const response = await fetch(
        `${Google_Map_API_URL}/geocode/json?address=${locations.description}&key=${Google_Map_API_Key}`,
      );
      const data = await response.json();
      if (data.status === 'OK') {
        onSelectLocation && onSelectLocation(data.results[0]);
      } else {
        setPredictions([]);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const handlePredictionPress = (prediction: Prediction) => {
    setSearchText(prediction.description);
    onChange && onChange(prediction.description);
    getGeoLocation(prediction);
    setPredictions([]);
  };

  const renderPrediction = ({item}: any) => {
    return (
      <TouchableOpacity
        key={item.reference}
        style={[
          styles.predictionItem,
          {
            borderBottomWidth:
              item.description === predictions[4]?.description ? 0 : 1,
          },
        ]}
        onPress={() => handlePredictionPress(item)}>
        <Text style={{color: theme.colors.primary}}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <InputComponent
        placeholder="Enter Location"
        value={searchText}
        onChange={handleSearch}
        {...props}
      />

      {predictions.length > 0 && (
        <View style={[styles.predictionsContainer, {}]}>
          <FlatList
            data={predictions}
            renderItem={renderPrediction}
            keyExtractor={(item: any) => item.reference}
            style={[
              styles.predictionsList,
              {
                backgroundColor: theme.colors.card,
                shadowColor: "#00000",
                borderColor: theme.colors.inputBorderColor,
              },
            ]}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  predictionsContainer: {
    position: 'relative',
  },
  predictionsList: {
    width: '93%',
    padding: 16,
    position: 'absolute',
    backgroundColor: theme.colors.card,
    bottom: 50,
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: 10,
    shadowOpacity: 1,
    shadowRadius: 20
  },
  predictionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Location;
