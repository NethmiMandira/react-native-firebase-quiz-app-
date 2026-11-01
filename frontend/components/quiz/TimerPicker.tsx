import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../theme/colors';

export const timerOptions = [
  { label: 'No timer', value: 0 },
  { label: '10 minutes', value: 10 },
  { label: '15 minutes', value: 15 },
  { label: '20 minutes', value: 20 },
  { label: '30 minutes', value: 30 },
  { label: '45 minutes', value: 45 },
  { label: '60 minutes', value: 60 },
];

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const TimerPicker: React.FC<Props> = ({ value, onChange }) => (
  <View style={styles.wrapper}>
    <Picker
      selectedValue={value}
      onValueChange={(v) => onChange(Number(v))}
      style={styles.picker}
      accessibilityLabel="Timer picker"
    >
      {timerOptions.map((o) => (
        <Picker.Item key={o.value} label={o.label} value={o.value} />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  picker: { height: 50, width: '100%', color: colors.textDark },
});

export default TimerPicker;
