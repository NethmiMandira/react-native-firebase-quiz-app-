import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FormInput } from '../common';
import { colors } from '../../theme/colors';
import { shadow } from '../../theme/layout';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
}

const QuizSearchBox: React.FC<Props> = ({ value, onChange, onSearch }) => (
  <View style={styles.container}>
    <FormInput icon="🆔" placeholder="Enter Quiz ID" value={value} onChangeText={onChange} marginBottom={12} />
    <TouchableOpacity style={styles.button} onPress={onSearch}>
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...shadow(colors.primary, 0.3, 4, 8, 5),
  },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});

export default QuizSearchBox;
