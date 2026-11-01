import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props extends TextInputProps {
  label: string;
  multiline?: boolean;
}

const LabeledInput: React.FC<Props> = ({ label, style, ...rest }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={colors.placeholder}
      {...rest}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.textMuted, marginBottom: 8 },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textDark,
    backgroundColor: colors.surface,
    fontWeight: '500',
  },
});

export default LabeledInput;
