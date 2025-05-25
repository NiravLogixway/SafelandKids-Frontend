import { useThemeContext } from '@/context/ThemeContext';
import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


interface OtpInputProps {
  value?: string;
  onChange: (code: string, event: any) => void;
  pinCount?: number;
  name?: string;
  bgColor?: string;
  color?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ value = '', onChange, pinCount = 4, bgColor, color }) => {
  const { theme } = useThemeContext();
  const inputs = useRef<(TextInput | null)[]>([]);
  const codeArr = value.split('').concat(Array(pinCount).fill('')).slice(0, pinCount);

  const handleChange = (text: string, idx: number) => {
    let newCodeArr = [...codeArr];
    newCodeArr[idx] = text.replace(/[^0-9]/g, '').slice(-1);
    let newCode = newCodeArr.join('');
    onChange(newCode, null);
    if (text && idx < pinCount - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !codeArr[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {Array(pinCount).fill(0).map((_, idx) => (
        <TextInput
          key={idx}
          ref={ref => { inputs.current[idx] = ref; }}
          style={[
            styles.input,
            {
              backgroundColor: bgColor ? bgColor : theme.colors.input.background,
              color: color ? color : theme.colors.input.color,
              borderRadius: 10,
              fontSize: 22,
              fontWeight: 'bold',
              borderWidth: 0,
              marginHorizontal: 6,
              textAlign: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={codeArr[idx]}
          onChangeText={text => handleChange(text, idx)}
          onKeyPress={e => handleKeyPress(e, idx)}
          returnKeyType="next"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  input: {
    height: 50,
    width: 50,
  },
});

export default OtpInput; 