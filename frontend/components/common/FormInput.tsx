import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props extends Omit<TextInputProps, 'style' | 'value' | 'onChangeText'> {
  icon: string;
  value: string;
  onChangeText: (text: string) => void;
  height?: number;
  marginBottom?: number;
}

/** Rounded input with a leading emoji icon and a clear (✕) button. */
const FormInput: React.FC<Props> = ({
  icon,
  value,
  onChangeText,
  height = 52,
  marginBottom = 16,
  ...rest
}) => (
  <View style={[styles.container, { marginBottom }]}>
    <Text style={styles.icon}>{icon}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, { height }]}
      placeholderTextColor={colors.placeholder}
      {...rest}
    />
    {value.length > 0 && (
      <TouchableOpacity style={styles.clear} onPress={() => onChangeText('')} hitSlop={10}>
        <Text style={styles.clearIcon}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { width: '100%', position: 'relative' },
  icon: { position: 'absolute', left: 16, top: 15, fontSize: 18, zIndex: 1 },
  input: {
    borderColor: 'rgba(116, 97, 238, 0.2)',
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 50,
    paddingRight: 80,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.textDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  clear: {
    position: 'absolute',
    right: 16,
    top: 15,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(148, 163, 184, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  clearIcon: { fontSize: 14, color: colors.textMuted, fontWeight: '600' },
});

export default FormInput;
